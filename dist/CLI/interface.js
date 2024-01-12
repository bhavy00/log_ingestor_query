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
const commander_1 = require("commander");
const axios_1 = require("axios");
const program = new commander_1.Command();
program
    .version("1.0.0")
    .description("CLI for Log Ingestion and Querying System");
program
    .command("query")
    .description("Query logs")
    .option("-l, --level <level>", "Filter logs by level")
    .option("-m, --message <message>", "Filter logs by message")
    .option("-r, --resourceId <resourceId>", "Filter logs by resource ID")
    .option("-ts, --timestamp-start <timestampStart>", "Start timestamp for date range query")
    .option("-te, --timestamp-end <timestampEnd>", "End timestamp for date range query")
    .option("-tr, --traceId <traceId>", "Filter logs by trace ID")
    .option("-s, --spanId <spanId>", "Filter logs by span ID")
    .option("-c, --commit <commit>", "Filter logs by commit")
    .option("-p, --parentResourceId <parentResourceId>", "Filter logs by parent resource ID")
    .option("--regex", "Enable regex search for all fields")
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryParams = {
            level: options.level,
            message: options.message,
            resourceId: options.resourceId,
            timestamp_start: options.timestampStart,
            timestamp_end: options.timestampEnd,
            traceId: options.traceId,
            spanId: options.spanId,
            commit: options.commit,
            parentResourceId: options.parentResourceId,
            regex: options.regex,
        };
        // Send query parameters to the server
        const response = yield axios_1.default.get("http://localhost:3000/", {
            params: queryParams,
        });
        console.log(response.data);
    }
    catch (error) {
        console.error("Error querying logs:", error.message);
    }
}));
// Parse command-line arguments
program.parse(process.argv);
