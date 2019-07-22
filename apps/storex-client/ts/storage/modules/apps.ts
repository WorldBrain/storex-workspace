import { StorageModule, StorageModuleConfig } from '@worldbrain/storex-pattern-modules'

export class AppStorage extends StorageModule {
    getConfig() : StorageModuleConfig {
        return {
            collections: {
                app: {
                    version: new Date(),
                    fields: {
                        identifier: { type: 'string' },
                        accessKeyHash: { type: 'string' },
                    }
                }
            },
            operations: {
                createApp: {
                    operation: 'createObject',
                    collection: 'app'
                },
                findAppByIdentifier: {
                    operation: 'findObject',
                    collection: 'app',
                    args: { identifier: '$identifier:string' }
                }
            }
        }
    }

    async createApp(options : { identifier : string, accessKeyHash : string }) {
        await this.operation('createApp', options)
    }

    async getApp(identifier : string) {
        return this.operation('findAppByIdentifier', { identifier })
    }
}
