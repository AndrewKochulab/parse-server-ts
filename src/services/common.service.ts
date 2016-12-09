/// <reference types="parse" />
import * as debug from "debug";

// this class shave common use service with all other service
export abstract class CommonService {
  protected parentNamespace = "app:service"
  protected logger: debug.IDebugger

  protected constructor(public serviceType) {
    this.logger = debug(`${this.parentNamespace}:${this.serviceType}`);
    this.logger(` ====== loaded service '${serviceType}' =====` )
  }
}
