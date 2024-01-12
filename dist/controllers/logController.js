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
Object.defineProperty(exports, "__esModule", { value: true });
const logModel_1 = require("../model/logModel");
// function to ingest logs
const createLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const log = yield logModel_1.default.create(data);
        res.status(201).json({
            message: "success",
            log,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "success",
            error,
        });
    }
});
// function for searching logs
const searchLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { level, message, resourceId, timestamp_start, timestamp_end, traceId, spanId, commit, parentResourceId, regex, } = req.query;
        const query = {};
        if (level)
            query.level = level;
        if (message)
            query.message = { $regex: new RegExp(message, "i") };
        if (resourceId)
            query.resourceId = resourceId;
        if (timestamp_start || timestamp_end)
            query.timestamp = {
                $gte: new Date(timestamp_start),
                $lte: timestamp_end ? new Date(timestamp_end) : new Date(),
            };
        //console.log("cdscwd",timestamp_start,query);
        if (traceId)
            query.traceId = traceId;
        if (spanId)
            query.spanId = spanId;
        if (commit)
            query.commit = commit;
        if (parentResourceId)
            query["metadata.parentResourceId"] = parentResourceId;
        if (regex) {
            // Additional filtering using regular expressions
            for (const key in query) {
                if (Object.prototype.hasOwnProperty.call(query, key)) {
                    query[key] = { $regex: new RegExp(query[key], "i") };
                }
            }
        }
        // Fetch logs from the database
        const logs = yield logModel_1.default.find(query).exec();
        res.status(200).json(logs);
    }
    catch (error) {
        //console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error
        });
    }
});
module.exports = {
    createLog,
    searchLog,
};
