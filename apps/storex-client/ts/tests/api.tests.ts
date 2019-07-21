import { Application } from "../application";

export function makeAPITestFactory() {
    function factory(description : string, test? : (setup : { application : Application }) => void | Promise<void>) {
        it(description, test && (async () => {
            const application = new Application({})
            await test({ application })
        }))
    }
    return factory
}