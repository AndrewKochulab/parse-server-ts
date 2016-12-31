import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import * as debug from 'debug'
import * as fs from "fs-extra"
import {ProjectSummary} from "../models/project-summary";

/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {

  static logger = debug("app:router:incomeMessage")
  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    this.logger("[IndexRouter::create] Creating incomeMessage route.");

    //add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });

    //add home page route
    router.get("/read", (req: Request, res: Response, next: NextFunction) => {

      fs.readFile("/tmp/file.txt", (err, data) => {
        this.logger("ERR = " + JSON.stringify(err))
        this.logger("data = " + data.toString())

        res.status(200).send().end()
      })
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method incomeMessage
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Home | Tour of Heros";

    //set message
    let options: Object = {
      "message": "Welcome to the Tour of Heros"
    };

    //render template
    this.render(req, res, "index", options);
  }
}