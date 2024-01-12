import { Request, Response } from "express";
import Log from "../model/logModel"

// function to ingest logs
const createLog = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const log = await Log.create(data);
    res.status(201).json({
      message: "success",
      log,
    });
  } catch (error) {
    res.status(500).json({
      message: "success",
      error,
    });
  }
};

// function for searching logs
const searchLog = async (req: Request, res: Response) => {
  try {
    const {
      level,
      message,
      resourceId,
      timestamp_start,
      timestamp_end,
      traceId,
      spanId,
      commit,
      parentResourceId,
      regex,
    } = req.query;

    const query: any = {};

    if (level) query.level = level;
    if (message) query.message = { $regex: new RegExp(message as string, "i") };
    if (resourceId) query.resourceId = resourceId;
    if (timestamp_start || timestamp_end)
      query.timestamp = {
        $gte: new Date(timestamp_start as string),
        $lte: timestamp_end?new Date(timestamp_end as string):new Date(),
      };
    //console.log("cdscwd",timestamp_start,query);
    if (traceId) query.traceId = traceId;
    if (spanId) query.spanId = spanId;
    if (commit) query.commit = commit;
    if (parentResourceId) query["metadata.parentResourceId"] = parentResourceId;
    if (regex) {
      // Additional filtering using regular expressions
      for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
          query[key] = { $regex: new RegExp(query[key] as string, "i") };
        }
      }
    }

    // Fetch logs from the database
    const logs = await Log.find(query).exec();
    res.status(200).json(logs);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ 
        status: "error", 
        message: "Internal Server Error",
        error
    });
  }
};

module.exports = {
  createLog,
  searchLog,
};
