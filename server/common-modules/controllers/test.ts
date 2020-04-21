import {LoggerManager} from "../../services/logger-manager/logger-manager";

class TestMidware {

    public testCase(setError?: boolean) {
        if (setError === undefined) { setError = false; }
        return new Promise((resolve) => {
            const result = {
                success: true,
                message: "Ce message vient de l'API !"
            };
            if (!setError) {
                resolve(result);
            } else {
                const err = new LoggerManager();
                err.warnLogger("user not found", "L'utilisateur n'éxiste pas chez nous");
            }
        });
    }

}

export default new TestMidware();
