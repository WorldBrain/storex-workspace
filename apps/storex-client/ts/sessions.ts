import * as api from "./public-api";
import { CollectionDefinitionMap } from "@worldbrain/storex";
import { AccessTokenManager } from "./access-tokens";

export interface SessionOptions {
    accessTokenManager : AccessTokenManager
}
export class Session implements api.StorexClientAPI_v0 {
    constructor(private options : SessionOptions) {

    }

    async registerApp(options : { name : string }) : Promise<api.RegisterAppResult_v0> {
        const accessToken = await this.options.accessTokenManager.createToken(`app:${options.name}`)
        return { success: true, accessToken }
    }

    async identifyApp(options : api.IdentifyAppOptions_v0 ) : Promise<{}> {
        return {}
    }

    async executeOperation(options : { operation: any[] }) : Promise<{ result : any }> {

    }

    async updateSchema(options : { collectionDefinitions : CollectionDefinitionMap }) : Promise<{ success: true }> {

    }
}
