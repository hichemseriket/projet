class RootController {

    // ---------------Test-----------------

    public TestController() {
        return new Promise(  (resolve, reject) => {
            resolve( "root: test ok ");

        });
    }
    // ------------------------------------
}

export default new RootController();
