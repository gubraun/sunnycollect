#!/usr/bin/env node

const Influx = require("influx");
const path = require("path");

const Jobs = require("./src/jobs");
const DataCollector = require("./src/datacollector");

const debug = !!process.env.DEBUG

global.Config = require(path.join(__dirname, "/config/config.example.json"));

function log(level, msg) {
    console.log(Date() + " [" + level + "] " + msg)
}

global.Log = {
    error: (msg) => log("error", msg),
    debug: (msg) => {
        if (debug) log("debug", msg)
    }
}

async function main() {
    const jobs = new Jobs(path.join(__dirname, "./jobs.example.json"));
    const schema = jobs.getInfluxSchema();

    let influxConfig = Config.influx;
    influxConfig.schema = schema;
    let influxClient = new Influx.InfluxDB(influxConfig);

    jobs.jobs.forEach((job) => {
        setInterval(async () => {
            try {
                let dataCollector = new DataCollector(Config.webbox.url);
                let fields = await dataCollector.fetchData(job.fields);

                if (fields) {
                    await influxClient.writePoints([{
                        measurement: job.measurement,
                        tags: {},
                        fields: fields
                    }]);
                }
            }
            catch (e) {
                Log.error(e);
            }

        }, job.interval);
        Log.debug("Installed job " + job.measurement);
    })
}

main();
