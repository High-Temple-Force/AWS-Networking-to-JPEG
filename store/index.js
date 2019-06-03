const AWS = require('aws-sdk')
const axios = require('axios')

export const state = () => ({
  testImage: '/Elastic-Load-Balancing-ELB.png',
  testImage2: '/Amazon-Simple-Storage-Service-S3.png',
  baseImageUrl: 'https://s3-ap-northeast-1.amazonaws.com/aws-networking-to-jpeg',
  LB: 0,
  EC2: 1,
  DB: 0,
  S3: 0,
  targetImageUrl: ``,
})

export const mutations = {
  setTestImage(state, value) {
    state.testImage = value
  },
  setTestImage2(state, value) {
    state.testImage2 = value
  },
  setImageUrl(state) {
    state.targetImageUrl = `${state.baseImageUrl}/${state.LB}/${state.EC2}/${state.DB}/${state.S3}/image.png`
  },
  setLB(state, value) {
    state.LB = value
  },
  setEC2(state, value) {
    state.EC2 = value
  },
  setDB(state, value) {
    state.DB = value
  },
  setS3(state, value) {
    state.S3 = value
  },
  downloadImage(state) {
    const s3Client = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_S3_REGION,
    });
    axios.get(state.targetImageUrl, (req, res) => {
      console.log(req)
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

  }
}
// ${state.baseImageUrl}/${state.LB[0]}/${state.EC2[0]}/${state.DB[0]}/${state.S3[0]
export const actions = {
  writeTestImage(context, value) {
    context.commit('setTestImage', value)
  },
  writeTestImage2(context, value) {
    context.commit('setTestImage2', value)
  },
  showgetImage(context, value) {
    context.commit('getImage')
  },
  writeLB(context, num) {
    context.commit('setLB', num)
  },
  writeEC2(context, num) {
    context.commit('setEC2', num)
  },
  writeDB(context, num) {
    context.commit('setDB', num)
  },
  writeS3(context, num) {
    context.commit('setS3', num)
  },
}

export const getters = {
  getTargetImageUrl: state => {
    return state.targetImageUrl
  }
}


