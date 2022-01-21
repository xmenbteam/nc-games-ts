"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApi = void 0;
const getApi = (req, res, next) => {
    try {
        res.status(200).send({ msg: "Api running!" });
    }
    catch (err) {
        console.log({ err });
        next(err);
    }
};
exports.getApi = getApi;
