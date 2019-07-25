import { StorageBackend } from "@worldbrain/storex";
import { StorexClientAPI_v0 } from "./public-api";
import { Session } from "./sessions";
import { AccessTokenManager } from "./access-tokens";
import { Storage } from "./storage/types";
import { createStorage } from "./storage";

export class Application {
    private storage : Promise<Storage>

    constructor(private options : { accessTokenManager : AccessTokenManager, createStorageBackend : () => StorageBackend }) {
        this.storage = createStorage({ createBackend: options.createStorageBackend })
    }

    async setup() {
        
    }

    async api() : Promise<StorexClientAPI_v0> {
        return new Session({
            accessTokenManager: this.options.accessTokenManager,
            getStorage: () => this.storage,
            updateStorage: async () => {
                const appSchemas = await (await this.storage).systemModules.apps.getAppSchemas()
                this.storage = createStorage({
                    createBackend: this.options.createStorageBackend,
                    appSchemas: appSchemas.map(appSchema => appSchema.schema)
                })
                await this.storage
            }
        })
    }
}
