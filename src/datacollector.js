const fetch = require('node-fetch');

module.exports = class DataCollector {
    constructor(url) {
        this.url = url;
    }

    async fetchData(fields) {

        const rpcBody = {
            version: "1.0",
            proc: "GetPlantOverview",
            id: "1",
            format: "JSON"
        };

        let data = {};

        try {
            let res = await fetch(this.url, {
                method: 'POST',
                body: "RPC=" + JSON.stringify(rpcBody),
                headers: { 'Content-Type': 'application/json' }
            });
            let json = await res.json();
            if (json.error) {
                throw new Error('[rpc] ' + json.error);
            }

            for (let fieldName in fields) {
                let field = fields[fieldName];

                for (let channel of json.result.overview) {
                    if (channel.meta == field.command) {
                        switch (field.type) {
                            case "FLOAT": data[fieldName] = Number.parseFloat(channel.value);
                                break;
                            default: data[fieldName] = channel.value.split("\n")[0];
                        }
                    }
                }
                // TODO: error handling if field not found
            }
        }
        catch (e) {
            Log.error(e);
            data = null;
        }

        return data;
    }
}



