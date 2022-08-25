/*
// ecrit node sur le terminel
// puis installe  < token > tu vas le trouver sur le site sur nodeJS document 

*/

const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = process.env.INFLUXDB_TOKEN
const url = 'https://europe-west1-1.gcp.cloud2.influxdata.com'

const client1 = new InfluxDB({url, token});

let org = `rawen.grn@gmail.com`
let bucket = `first`

let writeClient = client1.getWriteApi(org, bucket, 'ns')

for (let i = 0; i < 5; i++){
  let point = new Point('measurement1')
    .tag('tagname1', 'tagvalue1')
    .intField('field1', i)

  void setTimeout(() => {
    writeClient.writePoint(point)
  }, i * 1000) // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush()
  }, 5000)
}

let queryClient4 =client1.getQueryApi(org)
let fluxQuery4 = `from(bucket: "first")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")`

queryClient4.queryRows(fluxQuery4, {
  next: (row, tableMeta) => {
    const tableObject = tableMeta.toObject(row)
    console.log(tableObject)
  },
  error: (error) => {
    console.error('\nError', error)
  },
  complete: () => {
    console.log('\nSuccess')
  },
})

queryClient = client1.getQueryApi(org)
fluxQuery = `from(bucket: "first")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")
 |> mean()`

queryClient.queryRows(fluxQuery, {
  next: (row, tableMeta) => {
    const tableObject = tableMeta.toObject(row)
    console.log(tableObject)
  },
  error: (error) => {
    console.error('\nError', error)
  },
  complete: () => {
    console.log('\nSuccess2')
  },
})
