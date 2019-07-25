import * as api from "./public-api";
import { CollectionDefinitionMap } from "@worldbrain/storex";
import { AccessTokenManager } from "./access-tokens";
import { Storage } from "./storage/types";
import { AppSchema } from "./types/apps";

export interface SessionOptions {
    accessTokenManager : AccessTokenManager
    getStorage : () => Promise<Storage>
    updateStorage : () => Promise<void>
}
export class Session implements api.StorexClientAPI_v0 {
    private identifiedApp? : { identifier : string, id : number | string }

    constructor(private options : SessionOptions) {
    }

    async registerApp(options : { name : string }) : Promise<api.RegisterAppResult_v0> {
        const storage = await this.options.getStorage()
        const existingApp = await storage.systemModules.apps.getApp(options.name)
        if (existingApp) {
            return { success: false, errorCode: api.RegisterAppError_v0.APP_ALREADY_EXISTS, errorText: 'App already exists' }
        }

        const accessToken = await this.options.accessTokenManager.createToken()
        await storage.systemModules.apps.createApp({ identifier: options.name, accessKeyHash: accessToken.hashedToken })
        return { success: true, accessToken: accessToken.plainTextToken }
    }

    async identifyApp(options : api.IdentifyAppOptions_v0 ) : Promise<api.IdentifyAppResult_v0> {
        const storage = await this.options.getStorage()
        const existingApp = await storage.systemModules.apps.getApp(options.name)
        if (!existingApp) {
            return { success: false, errorCode: api.IdentifyAppError_v0.INVALID_ACCESS_TOKEN }
        }
        const valid = await this.options.accessTokenManager.validateToken({ actualHash: existingApp.accessKeyHash, providedToken: options.accessToken })
        if (valid) {
            this.identifiedApp = { identifier: options.name, id: existingApp.id }
            return { success: true }
        } else {
            return { success: false, errorCode: api.IdentifyAppError_v0.INVALID_ACCESS_TOKEN }
        }
    }

    async executeOperation(options : { operation: any[] }) : Promise<{ result : any }> {
        return { result: await (await this.options.getStorage()).manager.operation(options.operation[0], ...options.operation.slice(1)) }
    }

    async updateSchema(options : { schema : AppSchema }) : Promise<api.UpdateSchemaResult_v0> {
        if (!this.identifiedApp) {
            return { success: false, errorCode: api.UpdateSchemaError_v0.NOT_ALLOWED }
        }

        await (await this.options.getStorage()).systemModules.apps.updateSchema(
            this.identifiedApp.id, options.schema,
        )
        await this.options.updateStorage()
        return { success: true }
    }
}
