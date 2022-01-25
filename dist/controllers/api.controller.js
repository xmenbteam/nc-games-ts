"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApi = void 0;
const endpoints_1 = require("../endpoints");
const getApi = (req, res, next) => {
    try {
        res.status(200).send({ endPoints: endpoints_1.endPoints });
    }
    catch (err) {
        console.log({ err });
        next(err);
    }
};
exports.getApi = getApi;
