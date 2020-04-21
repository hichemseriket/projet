import express from "express";
import Mid from "../controllers/test";

class TestController {

    private readonly router;

    constructor() {
        this.router = express();
        this.route();
    }

    public getRouter() {
        return this.router;
    }

    private route() {

        this.router.post("/", (req, res) => {

                function tryCatch(e: any) {
                    res.json(e);
                }

                const token = req.body.token;
                const action = req.body.action;
                const setError = req.body.setError;

                if (action === "test") {

                    Mid.testCase(setError)
                        .catch((error) => { tryCatch(error); })
                        .then((result) => {
                            res.json(result);
                        });
                }

        });
    }
}

export default new TestController().getRouter();
