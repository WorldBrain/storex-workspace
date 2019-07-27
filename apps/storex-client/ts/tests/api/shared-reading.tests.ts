import expect from 'expect';
import { makeAPITestFactory } from "./utils";

describe('Read access to virtual tables', () => {
    const it = makeAPITestFactory()

    it('should allow different applications to register collections for read acces', async ({ application }) => {
        const apiOne = await application.api()
        await apiOne.registerApp({ name: 'superContacts', identify: true })

        const apiTwo = await application.api()
        await apiTwo.registerApp({ name: 'awesomeContacts', identify: true })
    })
})