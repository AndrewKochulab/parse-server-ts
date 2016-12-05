/// <reference types="parse" />
import * as debug from 'debug'

// this class shave common use service with all other service
export abstract class CommonService{

    protected logger: debug.IDebugger
    protected constructor(private loggerName = 'app:service'){
        this.logger = debug('app:service')
    }
}
