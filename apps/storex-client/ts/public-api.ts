import { CollectionDefinitionMap } from '@worldbrain/storex/lib/types'
import { AppSchema } from './types/apps';

export interface StorexClientAPI_v0 {
    registerApp(options : { name : string }) : Promise<RegisterAppResult_v0>
    identifyApp(options : IdentifyAppOptions_v0) : Promise<IdentifyAppResult_v0>
    // unidentifyApp() : Promise<void>
    
    executeOperation(options : { operation: any[] }) : Promise<{ result : any }>
    
    // requestPriviliges(options : {  }) : Promise<{}>
    // listPrivileges() : Promise<{}>
    
    updateSchema(options : UpdateSchemaOptions_v0) : Promise<UpdateSchemaResult_v0>
    // describeSchema() : Promise<{}> // In terms of RDF
    // updateAccessRules() : Promise<{}>

    // startMigration() : Promise<{}>
    // getMigrationStatus() : Promise<{}>

    // exportData() : Promise<{}>
    // importData(source : string, options : { mode : 'merge' | 'overwrite' }) : Promise<{}>

    // storeSecret() : Promise<{}>
    // getSecret() : Promise<{}>
    // deleteSecret() : Promise<{}>

    // storeApplicationConfig() : Promise<{}>
    // getApplicationConfig() : Promise<{}>
}

export type RegisterAppResult_v0 = { success : false, errorCode : RegisterAppError_v0, errorText : string } | { success : true, accessToken : string }

export enum RegisterAppError_v0 {
    APP_ALREADY_EXISTS = 0
}

export interface IdentifyAppOptions_v0 {
    name : string
    accessToken : string
}

export type IdentifyAppResult_v0 = { success : true } | { success : false, errorCode: IdentifyAppError_v0 }

export enum IdentifyAppError_v0 {
    INVALID_ACCESS_TOKEN = 0,
    DUPLICATE_IDENTFICATION = 1
}

export interface UpdateSchemaOptions_v0 {
    schema : AppSchema
}

export type UpdateSchemaResult_v0 = { success: true } | { success: false, errorCode: UpdateSchemaError_v0 }

export enum UpdateSchemaError_v0 {
    NOT_ALLOWED = 0
}
