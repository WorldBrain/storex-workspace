import { DexieStorageBackend } from '@worldbrain/storex-backend-dexie'
import inMemory from '@worldbrain/storex-backend-dexie/lib/in-memory'
import { Application } from "../application";
import { DevelopmentAccessTokenManager } from "../access-tokens";
import { sequentialTokenGenerator } from "../access-tokens.tests";

export function makeAPITestFactory() {
    function factory(description : string, test? : (setup : { application : Application }) => void | Promise<void>) {
        it(description, test && (async () => {
            const idbImplementation = inMemory()
            const createStorageBackend = () => new DexieStorageBackend({ dbName: 'test', idbImplementation })
            const application = new Application({
                accessTokenManager: new DevelopmentAccessTokenManager({ tokenGenerator: sequentialTokenGenerator() }),
                createStorageBackend,
            })
            await test({ application })
        }))
    }
    return factory
}