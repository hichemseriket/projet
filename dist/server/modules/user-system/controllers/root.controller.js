"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RootController {
    // ---------------Test-----------------
    TestController() {
        return new Promise((resolve, reject) => {
            resolve("root: test ok ");
        });
    }
}
exports.default = new RootController();
//# sourceMappingURL=root.controller.js.map