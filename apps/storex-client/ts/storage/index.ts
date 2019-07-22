import StorageManager, { StorageBackend } from "@worldbrain/storex";
import { StandardStorageModules, Storage } from "./types";
import { AppStorage } from "./modules/apps";
import { registerModuleMapCollections } from "@worldbrain/storex-pattern-modules";

export async function createStorage(options : { backend : StorageBackend }) : Promise<Storage> {
    const storageManager = new StorageManager({ backend: options.backend })
    const systemModules : StandardStorageModules = {
        apps: new AppStorage({ storageManager })
    }
    registerModuleMapCollections(storageManager.registry, systemModules as any)
    await storageManager.finishInitialization()

    const storage : Storage = {
        manager: storageManager,
        systemModules,
    }
    return storage
}
