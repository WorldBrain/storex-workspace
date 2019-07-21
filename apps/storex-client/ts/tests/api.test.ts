import expect from 'expect';
import { makeAPITestFactory } from "./api.tests";
import { RegisterAppError_v0, IdentifyAppError_v0 } from '../public-api';

describe('API tests', () => {
    const it = makeAPITestFactory()

    describe('Application registration and identification', () => {
        it('should be able to register a new app', async ({ application}) => {
            const api = await application.api()
            const result = await api.registerApp('contacts')
            expect(result).toEqual({ success: true, accessToken: 'access' })
        })

        it('should not regsiter an already existing app', async ({ application}) => {
            (await application.api()).registerApp('contacts')
            
            const result = (await application.api()).registerApp('contacts')
            expect(result).toEqual({ success: false, errorCode: RegisterAppError_v0.APP_ALREADY_EXISTS })
        })

        it('should be able to identify an app with an access key', async ({ application}) => {
            const api = await application.api()
            const registrationResult = await api.registerApp('contacts')
            expect(registrationResult).toEqual({ success: true, accessToken: 'access' })

            const identificationResult = await api.identifyApp('contacts', {
                accessToken: (registrationResult as { accessToken: string }).accessToken
            })
            expect(identificationResult).toEqual({ success: true })
        })

        it('should not allow identifying an app with an incorrect access key', async ({ application }) => {
            const api = await application.api()
            const registrationResult = await api.registerApp('contacts')
            expect(registrationResult).toEqual({ success: true, accessToken: 'access' })

            const identificationResult = await api.identifyApp('contacts', {
                accessToken: 'totally wrong key'
            })
            expect(identificationResult).toEqual({ success: true, error: IdentifyAppError_v0.INVALID_ACCESS_TOKEN })
        })

        it('should not allow two sessions for one app at the same time', async ({ application }) => {
            const api1 = await application.api()
            const registrationResult = await api1.registerApp('contacts')
            expect(registrationResult).toEqual({ success: true, accessToken: 'access' })

            const identificationResult1 = await api1.identifyApp('contacts', {
                accessToken: (registrationResult as { accessToken: string }).accessToken
            })
            expect(identificationResult1).toEqual({ success: true })

            const api2 = await application.api()
            const identificationResult2 = await api2.identifyApp('contacts', {
                accessToken: (registrationResult as { accessToken: string }).accessToken
            })
            expect(identificationResult2).toEqual({ success: false, error: IdentifyAppError_v0.DUPLICATE_IDENTFICATION })
        })

        it('should not leak information about active sessions to identifications with wrong key', async ({ application }) => {
            const api1 = await application.api()
            const registrationResult = await api1.registerApp('contacts')
            expect(registrationResult).toEqual({ success: true, accessToken: 'access' })

            const identificationResult1 = await api1.identifyApp('contacts', {
                accessToken: (registrationResult as { accessToken: string }).accessToken
            })
            expect(identificationResult1).toEqual({ success: true })

            const api2 = await application.api()
            const identificationResult2 = await api2.identifyApp('contacts', {
                accessToken: 'wrong key'
            })
            expect(identificationResult2).toEqual({ success: false, error: IdentifyAppError_v0.INVALID_ACCESS_TOKEN })
        })
    })

    describe('Collection registration and data operations', () => {
        it('should be able to register collections and execute data operations')

        it('should by default not allow fetching data from other apps')

        it(`should be able to register new schema's while running`)
    })
})
