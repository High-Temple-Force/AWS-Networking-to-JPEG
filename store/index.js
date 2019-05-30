export const state = () => ({
  testImage: '/Elastic-Load-Balancing-ELB.png',
  testImage2: '/Amazon-Simple-Storage-Service-S3.png',
  baseImageUrl: 'https://s3-ap-northeast-1.amazonaws.com/aws-networking-to-jpeg',
  baseDir:'/0/0/0/0',
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
    state.targetImageUrl = `${state.baseImageUrl}/${state.LB}/${state.EC2}/${state.DB}/${state.S3}`
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
  }


}


