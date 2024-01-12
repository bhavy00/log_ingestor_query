# Log Ingestor and Query Interface
The git repo contains the code for a log ingester and query interface which is build using nodejs, express, mongoDB for dyte november hiring assignment 

## Getting Started 
Follow all the steps to use the project locally in your system

### Installation 
1. Clone the repo 
```sh
    git clone https://github.com/dyte-submissions/november-2023-hiring-bhavy00.git
```
2. install NPM packages
```sh
    npm install
```

## System Design 
### Architecture 
The system follows a client-server architecture, where the client is responsible for ingesting logs and querying the log data. The server handles log ingestion over HTTP and provides a query interface for searching and filtering logs.

### Components
- Log Ingestor:
1. Responsible for receiving log data over HTTP.
2. Ensures scalability to handle high volumes of logs efficiently.
3. Mitigates potential bottlenecks in I/O operations and database write speeds.
4. Utilizes an HTTP server running on port 3000 for log ingestion.

- Query Interface:
1. Offers a user interface (CLI) for full-text search and specific field filters.
2. Supports filters based on level, message, resourceId, timestamp, traceId, spanId, commit, and metadata.parentResourceId.
3. Implements search within specific date ranges using MongoDB's $gte and $lte operators.
4. Utilizes regular expressions for search.
5. Allows combining multiple filters for a more refined search.
6. Provides real-time log ingestion and searching capabilities.

- Database:
1. Utilizes MongoDB as the database for storing log data.
2. Mongoose is used as an ODM (Object Data Modeling) library for MongoDB interactions.
3. The log data is stored with fields such as level, message, timestamp, traceId, spanId, commit, and metadata.

### Sequence of Operations
- Log Ingestion:
1. Logs are ingested via HTTP requests to the log ingestor endpoint (e.g., /logs).
2. The log ingestor processes incoming logs and stores them in the MongoDB database.

- Querying Logs:
1. Users interact with the query interface to search and filter logs based on specified criteria.
2. The query interface sends queries to the MongoDB database using Mongoose.
3. Results are presented to the user through the user interface.

### Technology Stack:
- Programming Language: TypeScript
- Web Framework: Express.js
- Database: MongoDB with Mongoose
- Other Libraries: Body-parser for parsing JSON requests

## Features
Following are the list of features implemented:
- Log Ingestor:
1. Ingests logs over HTTP.
2. Scalable design for high volumes.
3. Efficient handling of I/O and database write operations.
- Query Interface:
1. Full-text search and field filters.
2. Date range filtering.
3. Regular expression search.
4. Combining multiple filters.
5. Real-time log ingestion and searching.

## How to run the project

1. Run the server
```sh
    npm start
```

2. to ingest logs use the endpoint 
`http://localhost:3000/`

3. The project provides a command line interface to use the "Query Interface"
the following are the list of options are available


| Option          |  Feature                                       |
| -------------   | --------------------------------------------   |
| -l              | write the level of the log                     |
| -m              | write the message of the log                   |
| -r              | write the resourceId of the log                |
| -t              | write the timestamp of the log                 |
| -tr             | write the traceId of the log                   |
| -s              | write the spanId of the log                    |
| -c              | write the commit of the log                    |
| -p              | write the parentResourceId of the log          |
| -ts             | write the start date of the log                |
| -te             | write the end date of the log                  |
| -regex          | enables regex search for all fields            |


> all the values of the options must be written in double inverted semicolon "".

run the following code for query
```sh
    node ./dist/CLI/interface.js query
```
follow the code with one or more than one option
