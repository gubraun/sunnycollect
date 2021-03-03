# SunnyCollect
Collect data from an SMA Sunny WebBox periodically and store the collected data in an Influx database.  
This work is inspired by [sunnyboy-influxdb](https://github.com/martijndierckx/sunnyboy-influxdb). It is based on [vitocollect](https://github.com/nexx512/vitocollect).

## Installation
Install globally:
```
npm install -g sunnycollect
```

In the installation directory, e.g. `/usr/local/lib/node_modules/sunnycollect`:
1. Create `node_modules/config/config.json`. You can take `config.example.json` as a starting point.
2. Create `jobs.json`. Likewise, use `jobs.example.json` as a starting point.

Then start SunnyCollect in your terminal window by running:
```
sunnycollect
```
While running, SunnyCollect will periodially pull your configured data sources according to the jobs configuration in `jobs.json` and push the data into an InfluxDB according to the configuration in `config.json`.

Note that when updating the module the configuration files will be deleted. So make a backup of your config files beforehand.

## Credit
SunnyCollect is almost entirely based on [VitoCollect](https://github.com/nexx512/vitocollect) from [nexx512](https://github.com/nexx512).


## Example output fron WebBox RPC API
```
curl -H "Content-Type: application/json" -X POST -d RPC='{"version": "1.0", "proc": "GetPlantOverview", "id": "1", "format": "JSON"}' http://192.168.178.36/rpc | jq "."
```

```
{
  "result": {
    "overview": [
      {
        "meta": "GriPwr",
        "name": "Leistung",
        "unit": "W",
        "value": "0"
      },
      {
        "meta": "GriEgyTdy",
        "name": "Tagesertrag",
        "unit": "kWh",
        "value": "13.729"
      },
      {
        "meta": "GriEgyTot",
        "name": "Gesamtertrag",
        "unit": "kWh",
        "value": "55053.185"
      },
      {
        "meta": "OpStt",
        "name": "Zustand",
        "value": "Ok, Ok"
      },
      {
        "meta": "Msg",
        "name": "Meldung",
        "value": ""
      }
    ]
  },
  "format": "JSON",
  "proc": "GetPlantOverview",
  "version": "1.0",
  "id": "1"
}

