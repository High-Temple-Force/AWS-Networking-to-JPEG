
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

    <br>
    <v-flex >
    <v-tooltip right>
      <template v-slot:activator="{ on }">
      <span v-on="on">EC2の数</span>
      </template>
      <span>This contains!ここに書いてね</span>
    </v-tooltip>
    <v-radio-group
        row
        :model="ec2selected"
      >
      <v-radio
        :label= 1
        :value=1
      ></v-radio>
      <v-radio
        :label= 2
        :value=2
      ></v-radio>
    </v-radio-group>
    </v-flex>
    <v-flex>

    <v-tooltip right>
      <template v-slot:activator="{ on }">
      <span v-on="on">データベースの種類</span>
      </template>
      <span>This contains!ここに書いてね</span>
    </v-tooltip>
    <v-radio-group
        row
        v-model="dbselected"
      >
      <v-radio
        label="RDS"
        :value=0
      ></v-radio>
      <v-radio
        label="EC2"
        :value=1
      ></v-radio>
      <v-radio
        label="ローカル"
        :value="2"
      ></v-radio>
    </v-radio-group>
    </v-flex>
    <p>{{ dbselected }}</p>

    <v-flex>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
      <span v-on="on">S3の有無</span>
      </template>
      <span>This contains!ここに書いてね</span>
    </v-tooltip>
    <v-radio-group
        row
        v-model="s3selected"
        v-bind="s3selected"
    >
      <v-radio
        label="有り"
        value=0
      ></v-radio>
      <v-radio
        label="無し"
        value=1
      ></v-radio>
    </v-radio-group>
    </v-flex>

    <p>{{ this.$store.commit('setImageUrl') }}</p>
    <p>{{ this.$store.state.targetImageUrl }}</p>
    <br>

  　<img class="img" :src="$store.state.targetImageUrl" />
    <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue-grey"
      class="white--text"
      @click="loader = 'loading3'"
    >
    <a :href="$store.getters.getTargetImageUrl" download="test.png">
      <font color="white">Download</font></a>
      <v-icon right dark>cloud_download</v-icon>
    </v-btn>
    <br>
    <br>
    <br>
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
      title: 'AWS Networking to JPEG',
      switch1: true,
      switch2: true,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      dbselected: '',
      s3selected: '',
      ec2: [1,2],
      db:['RDS', 'EC2', 'ローカル'],
      row: null,
      ec2selected: '',
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    },
    selectdb () {
      if (this.dbselected) this.$store.dispatch('writeDB', this.dbselected)
    },
    selects3 () {
      if (this.s3selected) this.$store.dispatch('writeS3', this.s3selected)
    },
    ec2selected () {
      this.$store.dispatch('writeEC2', this.ec2selected)
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
