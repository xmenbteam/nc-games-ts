"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../data/development-data/index.js");
const seed_1 = require("./seed");
const connection_js_1 = __importDefault(require("../connection.js"));
const runSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, seed_1.seed)(index_js_1.categoryData, index_js_1.commentData, index_js_1.reviewData, index_js_1.userData);
    yield connection_js_1.default.end();
});
runSeed();
