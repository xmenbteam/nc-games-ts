"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UtilFunctions {
}
exports.default = UtilFunctions;
UtilFunctions.pageOffsetCalc = (page, limit) => {
    return (page - 1) * limit;
};
UtilFunctions.checkIfValid = (string, array) => array.includes(string);
