"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWelcome = void 0;
const getWelcome = (req, res, next) => {
    try {
        res
            .status(200)
            .send({
            msg: "Hello! Welcome to Sam's TypeScript NC Games API! Go to /api to see possible endpoints!",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getWelcome = getWelcome;
