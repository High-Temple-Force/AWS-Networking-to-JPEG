const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const AWS = require('aws-sdk')

const app = express()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  const s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION,

  });

  app.get('/download', (req, res) => {
    const { filename } = req.query

    // adding responce header
    res.attachment(filename)

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: filename,
    }

    s3Client.getObject(params)
      .createReadStream()
      .on('error', err => {
        res.status(500).send({error: err})
      })
      .pipe(res)
  })

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
