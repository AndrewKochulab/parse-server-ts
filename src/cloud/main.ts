import * as debug from "debug";
import {projectService} from "../services/project.service";
import * as wechat from "../wechat/wechat.module";
import {OAuthReply} from "../models/wechat/oauth-reply";
import {isError} from "../models/wechat/error-reply";
import {WeChatToken} from "../models/wechat/wechat-token";
import {ProjectSummary} from "../models/project-summary";
import * as fs from "fs-extra";
import {Article} from "../models/young/Article";
import {Catalog} from "../models/young/Catalog";
import {Observable} from "rxjs";
const logger = debug("app:cloud")

Parse.Cloud.define('hello', (req, res) => {
  //Parse.User.signUp("user","password",{"test_attr":"attr_value"})
  logger("start Cloud function ----- ")
  //ps.createProduction()
  let prom = projectService.queryProduct()
  prom.then((r) => {
      logger(JSON.stringify(r))
      res.success(r);
    }
  )
})

Parse.Cloud.define('wechat-login', (req, res) => {
  let code = req.params.code
  wechat.oauth.oauthLogin(code).subscribe((weRes: OAuthReply) => {
    if (isError(weRes)) {
      logger(`oauthLogin failed with error ${JSON.stringify(weRes)}`)
      res.error("wechat-loggin failed" + JSON.stringify(weRes))
    } else {
      Parse.User.logIn<Parse.User>("user", "password").then((user) => {
        res.success({"sessionToken": user.getSessionToken()})
      })
    }
  }, (err) => {
    res.error(err.status)
  })
})

var restrictedAcl = new Parse.ACL();
restrictedAcl.setPublicReadAccess(true);
restrictedAcl.setPublicWriteAccess(false);
Parse.Cloud.define("test", (req, res) => {
  let wechatToken: WeChatToken = new WeChatToken();
  wechatToken.set("openid", "readonly")
  wechatToken.set("name", "readonlyname")
  wechatToken.setACL(restrictedAcl)
  wechatToken.save().then((s) => {
    res.success(JSON.stringify("success save " + JSON.stringify(s)))
  })
})
Parse.Cloud.define("test1", (req, res) => {
  new Parse.Query("WeChatToken")
    .get("jXWR8YV5k7")
    // .get("pqSAGwSaHc")
    .then((s) => {
        res.success(JSON.stringify("success get " + JSON.stringify(s)))
      }, (err) => {
        res.error(JSON.stringify(err))
      }
    )
})
Parse.Cloud.define("test2", (req, res) => {
  new Parse.Query("WeChatToken")
  //.get("jXWR8YV5k7")
    .get("pqSAGwSaHc")
    .then((s) => {
        res.success(JSON.stringify("success get " + JSON.stringify(s)))
      }, (err) => {
        res.error(JSON.stringify(err))
      }
    )
})

Parse.Cloud.define("image", (req, res) => {

  let project = new ProjectSummary();
  project.name = "projectX2";
  project.description = "desc"
  fs.readFile("/tmp/file.png", (err, data) => {
    logger("ERR = " + JSON.stringify(err))

    // convert the Buffer data to Array Format for Parse.File
    // Parse.File accept three type of format. this method also work.
    // let fileData = Array.prototype.slice.call(new Buffer(data), 0)
    // let file = new Parse.File("testfilename.png", fileData);

    // Parse.File also accept an object with base64 string
    let file = new Parse.File("testfilename2.png", {"base64": data.toString("base64")});

    project.set("file", file);
    project.save().then(
      (v) => {
        logger("save success " + JSON.stringify(v));
        res.success(JSON.stringify("save again " + JSON.stringify(v)))
      },
      (e) => logger("save failed " + JSON.stringify(e)))
  })

})



// use to import data from json file into mongodb
Parse.Cloud.define("catalog", (req, res) => {
  fs.readJSON("/Users/eclair/Documents/catalog.json", (err, json) => {
    for (let row of json) {
      let newCat = new Catalog()
      newCat.name = row.name
      newCat.description = row.description
      newCat.save().then(
        (v) => {
          logger( " - save success " + JSON.stringify(v));
        },
        (e) => logger( " - save failed " + JSON.stringify(e))
      )
    }
  });
  res.success("success")
})


Parse.Cloud.define("catalog2", (req, res) => {
  fs.readJSON("/Users/eclair/Documents/catalog.json", (err, json) => {
    for (let row of json) {
      let qCat = new Parse.Query(Catalog)
      if(row.parentCatalog){
        qCat.equalTo("name", row.parentCatalog);
        qCat.find<Catalog>().then(
          (cat) => {
            logger( " - save success " + JSON.stringify(cat));
            qCat.equalTo("name", row.name)
            qCat.find<Catalog>().then(
              (v) => {
                v[0].parentCatalog = cat[0]
                v[0].save().then(
                  (sv) => {

                  })
              })
          },
          (e) => logger( " - save failed " + JSON.stringify(e))
        )
      }

    }
  });
  res.success("success")
})

Parse.Cloud.define("article", (req, res) => {

  fs.readJSON("/Users/eclair/Documents/article.json", (err, json) => {

    let i = 1;
    for (let row of json) {
      let qCat = new Parse.Query(Catalog)
      qCat.equalTo("name", row.typename);
      let obs = Observable.create((o) => {
        qCat.find<Catalog>().then((result) => {
          o.next((result))
        }, (err) => {
          o.error(err)
        })
      })

      obs.filter(arr => {
        logger((arr.length > 0) + " filter ==" + JSON.stringify(arr))
        return arr.length > 0
      }).map(arr => arr[0]).switchMap(cat => {
        fs.readFile(row.url, (err, data) => {
          let file = new Parse.File(row.url.substring(row.url.lastIndexOf("/") + 1),
            {"base64": data.toString("base64")},
            row.url.substring(row.url.length - 3));
          let art = new Article()
          art.title = row.title
          art.description = row.description
          art.catalog = cat
          art.clickCount = row.clickCount
          art.weight = row.weight
          art.image = file
          art.save().then(
            (v) => {
              logger((i++) + " - save success " + JSON.stringify(v));
            },
            (e) => logger((i++) + " - save failed " + JSON.stringify(e))
          )
        })

      }).subscribe((data) => {
        // res.success(data)
      }, (err) => {
        logger("error of ")
        // res.error(err)
      })
    }

    res.success("succes")
  })

  //
  // let rl =readline.createInterface({
  //   input: fs.createReadStream("/tmp/query_result.csv",{encoding:"utf8"})
  // })
  //
  // let linecount = 1
  // let linecountStr = ""
  // rl.on("line", (line) => {
  //   //logger(line.split(",").length)
  //
  //   if(line.split(",").length != 7){
  //     console.log(line)
  //     linecountStr += ", " + linecount
  //   }
  //   linecount++
  //   logger(linecountStr)
  //   res.success("success")
  // })
  /*
   fs.readJSON("/Users/eclair/Documents/query.json", (err, json) =>{

   let i = 1;
   for(let row of json){
   fs.readFile(row.url, (err, data) => {
   let file = new Parse.File(row.url.substring(row.url.lastIndexOf("/")+1),
   {"base64": data.toString("base64")},
   row.url.substring(row.url.length - 3));

   let art = new Article();
   let qCat = new Parse.Query(Catalog)
   qCat.equalTo("name", row.typename);
   let obs = Observable.create((o)=>{
   qCat.find<Catalog>().then((result) => {
   o.next((result))
   }, (err) => {
   o.error(err)
   })
   })

   obs.switchMap((cat) => {
   if(!cat){

   }
   })

   // let project = new ProjectSummary();
   // project.set("title",row.title)
   // project.set("click",row.click)
   // project.set("shorttitle",row.shorttitle)
   // project.set("weight",row.weight)
   // project.set("redirecturl",row.redirecturl)
   // project.set("image", file);
   // project.save().then(
   //   (v) => {
   //     logger((i++) + " - save success " + JSON.stringify(v));
   //   },
   //   (e) => logger((i++) + " - save failed " + JSON.stringify(e)))
   })
   }
   res.success(json)
   })
   */
})

