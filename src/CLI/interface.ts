import { Command } from "commander";
import axios from "axios";

const program = new Command();

program
  .version("1.0.0")
  .description("CLI for Log Ingestion and Querying System");

program
  .command("query")
  .description("Query logs")
  .option("-l, --level <level>", "Filter logs by level")
  .option("-m, --message <message>", "Filter logs by message")
  .option("-r, --resourceId <resourceId>", "Filter logs by resource ID")
  .option(
    "-ts, --timestamp-start <timestampStart>",
    "Start timestamp for date range query"
  )
  .option(
    "-te, --timestamp-end <timestampEnd>",
    "End timestamp for date range query"
  )
  .option("-tr, --traceId <traceId>", "Filter logs by trace ID")
  .option("-s, --spanId <spanId>", "Filter logs by span ID")
  .option("-c, --commit <commit>", "Filter logs by commit")
  .option(
    "-p, --parentResourceId <parentResourceId>",
    "Filter logs by parent resource ID"
  )
  .option("--regex", "Enable regex search for all fields")
  .action(async (options) => {
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
      const response = await axios.get("http://localhost:3000/", {
        params: queryParams,
      });
      console.log(response.data);
    } catch (error:any) {
      console.error("Error querying logs:", error.message);
    }
  });

// Parse command-line arguments
program.parse(process.argv);
