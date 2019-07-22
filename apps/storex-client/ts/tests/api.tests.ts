import { DexieStorageBackend } from '@worldbrain/storex-backend-dexie'
import inMemory from '@worldbrain/storex-backend-dexie/lib/in-memory'
import { Application } from "../application";
import { DevelopmentAccessTokenManager } from "../access-tokens";
import { sequentialTokenGenerator } from "../access-tokens.tests";
import { createStorage } from '../storage';

export function makeAPITestFactory() {
    function factory(description : string, test? : (setup : { application : Application }) => void | Promise<void>) {
        it(description, test && (async () => {
            const storageBackend = new DexieStorageBackend({ dbName: 'test', idbImplementation: inMemory() })
            const storage = await createStorage({ backend: storageBackend })
            const application = new Application({
                accessTokenManager: new DevelopmentAccessTokenManager({ tokenGenerator: sequentialTokenGenerator() }),
                storage,
            })
            await test({ application })
        }))
    }
    return factory
}