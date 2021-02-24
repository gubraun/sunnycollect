# sunnycollect

Collect data from an SMA Sunny WebBox periodically and store the collected data in an Influx database.

Inspired by [vitocollect](https://github.com/nexx512/vitocollect).

## Example
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

