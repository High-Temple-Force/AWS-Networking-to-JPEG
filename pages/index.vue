<template>
  <v-app light>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
      dense
      flat
      color="rgb(240, 240, 240)"
    >
    <v-toolbar-title v-text="title" />
    </v-toolbar>

    <v-container fluid grid-list-md mt-5  >
      <v-layout row wrap  >
        <v-flex  offset-xs1 md7>
          <div>
            <h3 v-text="titleDiscription"></h3>
          </div>

          <div>
            <h4 v-text="siteDiscription"></h4>
          </div>
        </v-flex>

        <v-flex xs10　sm6 md5 offset-xs1>
          <v-layout row wrap　>
            <div class="content">
              <v-tooltip right max-width=50%>
                <template v-slot:activator="{ on }" >
                  <span v-on="on">EC2の数<v-icon v-on="on">info</v-icon></span>
                </template>
                <!--ここにEC2の説明文章がポップアップで表示、内容は下記script内変数へ記述-->
                <div class="description">{{ec2Description}}</div>
              </v-tooltip>
              <v-radio-group
                row
                v-model="ec2selected"
                @change="countec2"
              >
                <v-radio
                  label=1
                  value=0
                ></v-radio>
                <v-radio
                  label=2
                  value=1
                ></v-radio>
              </v-radio-group>
            </div>

            <div class="content">
              <v-tooltip right max-width=50%>
                <template v-slot:activator="{ on }">
                <span >データベースの種類 <v-icon v-on="on">info</v-icon> </span>
                </template>
                <!--ここにDBの説明文章がポップアップで表示、内容は下記script内変数へ記述-->
                <span class="description">{{dbDescription}}</span>
              </v-tooltip>
              <v-radio-group
                  row
                  v-model="dbselected"
                  @change="selectdb"
                >
                <v-radio
                  label="RDS"
                  value=0
                ></v-radio>
                <v-radio
                  label="EC2"
                  value=1
                ></v-radio>
                <v-radio
                  label="ローカル"
                  value=2
                ></v-radio>
              </v-radio-group>
            </div>

            <div class="content">
              <v-tooltip right max-width=50%>
                <template v-slot:activator="{ on }">
                <span >S3の有無  <v-icon v-on="on">info</v-icon> </span>
                </template>
                <!--ここにS3の説明文章がポップアップで表示、内容は下記script内変数へ記述-->
                <span class="description">{{s3Description}}</span>
              </v-tooltip>
              <v-radio-group
                  row
                  v-model="s3selected"
                  @change="selects3"
              >
                <v-radio
                  label="有り"
                  value=1
                ></v-radio>
                <v-radio
                  label="無し"
                  value=0
                ></v-radio>
              </v-radio-group>
            </div>

            <v-flex my-4 >
              <a
              :href="$store.getters.getTargetImageName"
              download="awsnetwork.jpg"
              style="text-decoration:none"
              >
                <v-btn
                  :loading="loading3"
                  :disabled="loading3"
                  color="blue-grey"
                  class="white--text"
                  @click="loader = 'loading3'"
                >
                  <font color="white">Download</font>
                  <v-icon right dark>cloud_download</v-icon>
                </v-btn>
              </a>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex sm6 md4 xs12 offset-xs1 mb-4>
          <v-layout row wrap>
          <v-flex >
            <div class="img">
          　  <img class="img" :src="$store.state.targetImageName" />
            </div>
          </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>


      <p hidden>{{ this.$store.commit('setImageUrl') }}</p>

      <v-footer
        :fixed="fixed"
        app
        color="rgb(240, 240, 240)"
      >
        <v-flex
          py-3
          text-xs-center
          xs12
        >
          <strong>&copy;2019 — PjKoenji</strong>
        </v-flex>
      </v-footer>
    </v-container >
  </v-app>
</template>

<script>
export default {
  computed:{
    /*
    StringtrueOrfalse: function () {
      return this.switch1 ? 'あり' : 'なし';
    },
    StringtrueOrfalse2: function () {
      return this.switch2 ? 'あり' : 'なし';
    },
    trueOrfalse: function() {
      this.switch1 ? this.$store.dispatch('writeLB',1) : this.$store.dispatch('writeLB',0)
    },
    trueOrfalse2: function() {
      this.switch2 ? this.$store.dispatch('writeS3',1) : this.$store.dispatch('writeS3',0)
    },
    */
    countec2 () {
      if (this.ec2selected) this.$store.dispatch('writeEC2', this.ec2selected)
    },
    selectdb () {
      if (this.dbselected) this.$store.dispatch('writeDB', this.dbselected)
    },
    selects3 () {
      if (this.s3selected) this.$store.dispatch('writeS3', this.s3selected)
    },

  },
  methods:{
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: `Clage Cloud`,
      titleDiscription: `- クラウドをもっと身近にするツール -`,
      siteDiscription: `選択肢をすべて選んで、ネットワーク図をダウンロードしてください。`,
      // switch1: true,
      // switch2: true,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      dbselected: '',
      s3selected: '',
      ec2selected: '',
      db:['RDS', 'EC2', 'ローカル'],
      row: null,
      ec2Description:'EC2はサーバです。サーバが故障した場合サービスは停止してしまいます。サーバの数を複数にすることでサービス停止の可能性を下げることができます。サーバを複数にした場合はロードバランサを設置し、処理を分散させます。', //ec2の説明、ポップアップの内容
      dbDescription:'データベースはWebアプリケーションを提供する際にユーザデータなどを保存しておく機能を持ちます。データベースの管理をAWSにやってもらう場合はRDS、自身で管理する場合はEC2かローカルを選択してください。ローカルとはWebサーバ内でデータベースを使用することです。', //dbの説明、ポップアップの内容
      s3Description:'S3はAWSのストレージサービスであり、様々なファイルを保管することができます。ここではHTMLファイルのバックアップを保管しています。', //s3の説明、ポップアップの内容
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    },
  },
}
</script>



<style>
  .container {
    text-align: left;
    margin: 0 auto;
    background-color: rgb(240, 240, 240);
  }
  .flex {
    width: 80%;
    margin: 0 auto;
  }
  .v-tooltip__content {
    width: 50%;
  }
  .v-tooltip--right{
    width: 50%;
  }
  .v-toolbar__title{
    font-size: 25px;
    font-weight: 1000;
    letter-spacing: .02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 8%;
  }
  .content{
    width: 100%;
    padding: 1rem 0 0 1rem;
    margin: 1rem auto;
    box-shadow: 1px 1px 4px gray;
    border-radius: 10px;
    background-color: rgba(255, 251, 251, 0.87)
  }
  a {
    color: whitesmoke;
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .img {
    width: 90%;
    height: auto;
  }
</style>
