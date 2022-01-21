"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfValid = exports.pageOffsetCalc = void 0;
const pageOffsetCalc = (page, limit) => {
    return (page - 1) * limit;
};
exports.pageOffsetCalc = pageOffsetCalc;
const checkIfValid = (string, array) => array.includes(string);
exports.checkIfValid = checkIfValid;
