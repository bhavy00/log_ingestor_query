import mongoose, { Schema, Document } from "mongoose";

interface ILog extends Document {
  level: string;
  message: string;
  resourceId: string;
  timestamp: Date;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: {
    parentResourceId: string;
  };
}

const LogSchema: Schema = new Schema({
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

const Log = mongoose.model<ILog>("Log", LogSchema);

export default Log;
