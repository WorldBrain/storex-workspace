import * as api from "./public-api";
import { CollectionDefinitionMap } from "@worldbrain/storex";
import { AccessTokenManager } from "./access-tokens";
import { Storage } from "./storage/types";

export interface SessionOptions {
    accessTokenManager : AccessTokenManager
    storage : Storage
}
export class Session implements api.StorexClientAPI_v0 {
    private identifiedApp? : string

    constructor(private options : SessionOptions) {
    }

    async registerApp(options : { name : string }) : Promise<api.RegisterAppResult_v0> {
        const existingApp = await this.options.storage.systemModules.apps.getApp(options.name)
        if (existingApp) {
            return { success: false, errorCode: api.RegisterAppError_v0.APP_ALREADY_EXISTS, errorText: 'App already exists' }
        }

        const accessToken = await this.options.accessTokenManager.createToken()
        await this.options.storage.systemModules.apps.createApp({ identifier: options.name, accessKeyHash: accessToken.hashedToken })
        return { success: true, accessToken: accessToken.plainTextToken }
    }

    async identifyApp(options : api.IdentifyAppOptions_v0 ) : Promise<api.IdentifyAppResult_v0> {
        const existingApp = await this.options.storage.systemModules.apps.getApp(options.name)
        if (!existingApp) {
            return { success: false, errorCode: api.IdentifyAppError_v0.INVALID_ACCESS_TOKEN }
        }
        const valid = await this.options.accessTokenManager.validateToken({ actualHash: existingApp.accessKeyHash, providedToken: options.accessToken })
        if (valid) {
            this.identifiedApp = options.name
            return { success: true }
        } else {
            return { success: false, errorCode: api.IdentifyAppError_v0.INVALID_ACCESS_TOKEN }
        }
    }

    async executeOperation(options : { operation: any[] }) : Promise<{ result : any }> {
        return { result: 'blahaha!' }
    }

    async updateSchema(options : { collectionDefinitions : CollectionDefinitionMap }) : Promise<{ success: true }> {
        return { success: true }
    }
}
