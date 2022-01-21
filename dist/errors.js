"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle500Errors = exports.handleCustomErrors = exports.handlePSQLErrors = void 0;
const handlePSQLErrors = (err, req, res, next) => {
    switch (err.code) {
        case "23502":
            res.status(400).send({ msg: "Field cannot be null!", err });
        case "22P02":
            res.status(400).send({ msg: "Bad request!", err });
        case "23503":
            res.status(404).send({ msg: "Not found!", err });
        case "22003":
            res.status(404).send({ msg: "Comment not found!", err });
        default:
            next(err);
    }
};
exports.handlePSQLErrors = handlePSQLErrors;
const handleCustomErrors = (err, req, res, next) => {
    if (err.status)
        res.status(err.status).send({ msg: err.msg });
    else
        next(err);
};
exports.handleCustomErrors = handleCustomErrors;
const handle500Errors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal server error!" });
};
exports.handle500Errors = handle500Errors;
