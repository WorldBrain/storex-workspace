import { CollectionDefinitionMap } from '@worldbrain/storex/lib/types'

export interface StorexClientAPI_v0 {
    registerApp : (name : string) => Promise<{ success : false, errorCode : number, errorText : string } | { success : true, accessToken : string }>
    identifyApp : (name : string, options : { accessToken : string }) => Promise<{}>
    // unidentifyApp : () => Promise<void>
    
    executeOperation : (options : { operation: any[] }) => Promise<{ result : any }>
    
    // requestPriviliges : (options : {  }) => Promise<{}>
    // listPrivileges : () => Promise<{}>
    
    updateCollectionRegistry : (options : { collectionDefinitions : CollectionDefinitionMap }) => Promise<{ success: true }>
    // describeCollectionRegistry : () => Promise<{}> // In terms of RDF
    // updateAccessRules : () => Promise<{}>

    // startMigration : () => Promise<{}>
    // getMigrationStatus : () => Promise<{}>

    // exportData : () => Promise<{}>
    // importData : (source : string, options : { mode : 'merge' | 'overwrite' }) => Promise<{}>

    // storeSecret : () => Promise<{}>
    // getSecret : () => Promise<{}>
    // deleteSecret : () => Promise<{}>

    // storeApplicationConfig : () => Promise<{}>
    // getApplicationConfig : () => Promise<{}>
}

export enum RegisterAppError_v0 {
    APP_ALREADY_EXISTS = 0
}

export enum IdentifyAppError_v0 {
    INVALID_ACCESS_TOKEN = 0,
    DUPLICATE_IDENTFICATION = 1
}
