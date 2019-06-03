
<template>
  <v-app light>

    <v-container mt-10 pt-40>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
      dark
      color="orange lighten-1"    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-toolbar>
    <br>
    <br>
    <v-tooltip bottom>
    <template v-slot:activator="{ on }">
    <v-switch
      v-on="on"
      v-model="switch1"
      :label="`Load Balanceの有無 : ${StringtrueOrfalse}`"
      :value="trueOrfalse"
    ></v-switch>
    </template>
    <span>ここにpopupさせたい説明を入れる！</span>

    </v-tooltip>
    <br>
    <v-flex xs12 sm6 d-flex>
        <v-select
          :items="ec2"
          :label="`EC2の数: ${ec2selected}`"
          v-model="ec2selected"
          return-object
          @input="countec2"
        ></v-select>
    </v-flex>

    <v-flex xs12 sm6 d-flex>
        <v-select
          :items="db"
          :label="`データベースの種類: ${dbselected}`"
          v-model="dbselected"
          return-object
          @input="selectdb"
        ></v-select>
    </v-flex>
    <v-tooltip bottom>
    <template v-slot:activator="{ on }">
    <v-switch
      v-on="on"
      v-model="switch2"
      :label="`S3の有無 : ${StringtrueOrfalse2}`"
      :value="trueOrfalse2"
    ></v-switch>
    </template>
    <span>This contains pop up mes!ここに書いてね</span>

    </v-tooltip>
    <br>
    <dir>
    <p>{{ this.$store.commit('setImageUrl') }}</p>
    <p>{{ this.$store.state.targetImageUrl }}</p>
    <br>

  　<img class="img" :src="$store.state.targetImageUrl" />

    <br>
    <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue-grey"
      class="white--text"
      @click="loader = 'loading3'; downloadtest()"
    >
      <a
      v-bind:href="this.$store.state.tagetImageUrl"
      download="aws-test.jpeg">
      <font color="white">Download</font>
      </a>
      <v-icon right dark>cloud_download</v-icon>
    </v-btn>
    </dir>
    <v-footer
    :fixed="fixed"
    app
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
    countec2: function() {
      if (this.ec2selected) this.$store.dispatch('writeEC2', this.ec2selected)
    },
    // here have to get index of db array!
    selectdb: function() {
      if (this.dbselected) this.$store.dispatch('writeDB', this.db.findIndex(item => item === this.dbselected))
    },

  },
  methods:{
    downloadImage: function() {
      axios({
        url: this.$store.getters.getTargetImageUrl,
        method: 'GET',
        responceType: 'blob',
      }).then((responce) => {

      }).catch((err) => {

      });
    },
    downloadtest: function() {
      this.$store.commit('downloadImage')
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'AWS Networking to JPEG',
      switch1: true,
      switch2: true,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      ec2selected: '',
      ec2: [1,2],
      db:['RDS', 'EC2', 'ローカル'],
      dbselected: ''
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
  img {
    width: 90%;
  }
</style>
