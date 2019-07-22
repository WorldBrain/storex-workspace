import { StorexClientAPI_v0 } from "./public-api";
import { Session } from "./sessions";
import { AccessTokenManager } from "./access-tokens";
import { Storage } from "./storage/types";

export class Application {
    constructor(private options : { accessTokenManager : AccessTokenManager, storage : Storage }) {
        
    }

    async setup() {
        
    }

    async api() : Promise<StorexClientAPI_v0> {
        return new Session({
            accessTokenManager: this.options.accessTokenManager,
            storage: this.options.storage,
        })
    }
}
