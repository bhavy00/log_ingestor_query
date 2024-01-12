"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LogSchema = new mongoose_1.Schema({
    level: { type: String, required: [true, "level must have a value"] },
    message: { type: String, required: [true, "message must have a value"] },
    resourceId: {
        type: String,
        required: [true, "resourceId must have a value"],
    },
    timestamp: { type: Date, required: [true, "timestamp must have a value"] },
    traceId: { type: String, required: [true, "traceId must have a value"] },
    spanId: { type: String, required: [true, "spanId must have a value"] },
    commit: { type: String, required: [true, "commit must have a value"] },
    metadata: {
        parentResourceId: { type: String },
    },
});
const Log = mongoose_1.default.model("Log", LogSchema);
exports.default = Log;
