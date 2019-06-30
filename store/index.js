export const state = () => ({
  /*testImage: '/Elastic-Load-Balancing-ELB.png',
  testImage2: '/Amazon-Simple-Storage-Service-S3.png',
  */
  baseImageUrl: 'https://aws-networking-to-jpeg.s3-ap-northeast-1.amazonaws.com/',
  LB: 0,
  EC2: 0,
  DB: 0,
  S3: 0,
  targetImageUrl: ``,
  s3ImageUrl: '',
  targetImageName: '',
})

export const mutations = {
  /*setTestImage(state, value) {
    state.testImage = value
  },
  setTestImage2(state, value) {
    state.testImage2 = value
  },
  */
  setImageUrl(state) { 
    state.targetImageUrl = `${state.LB}/${state.EC2}/${state.DB}/${state.S3}/image.png`
    state.targetImageName = `${state.LB}${state.EC2}${state.DB}${state.S3}.jpg`
    state.s3ImageUrl = state.baseImageUrl + state.targetImageUrl
  },
  setLB(state, value) {
    state.LB = value
  },
  setEC2(state, value) {
    state.EC2 = value
    state.LB = state.EC2
  },
  setDB(state, value) {
    state.DB = value
  },
  setS3(state, value) {
    state.S3 = value
  },
}

export const actions = {
  /*writeTestImage(context, value) {
    context.commit('setTestImage', value)
  },
  writeTestImage2(context, value) {
    context.commit('setTestImage2', value)
  },
  writeLB(context, num) {
    context.commit('setLB', num)
  },
  */
  showgetImage(context, value) {
    context.commit('getImage')
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
  },
  getTargetImageName: state => {
    return state.targetImageName
  }
}


