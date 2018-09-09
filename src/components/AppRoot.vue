<template>
  <div class='oio-container'>
    <div class="oio-body">

      <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        
        <b-navbar-brand href="#">
          <img src="/rs/img/logo.svg" height="30" class="d-inline-block align-top" alt="OnceIO">
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item href="#/">主页</b-nav-item>
            <b-nav-item href="#/docs">文档</b-nav-item>
            <b-nav-item href="#/apidoc">接口样例</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
          <!--
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        -->
          <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            {{nickname}}
            <em>...</em>
          </template>
          <b-dropdown-item @click="showModal">登录</b-dropdown-item>
          <b-dropdown-item href="#/user/signout">退出</b-dropdown-item>
          <b-dropdown-item href="#/user/profile">个人信息</b-dropdown-item>
          </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
      <router-view/>
    </div>
    <footer style="padding-top:1em;">
      &copy;Copyright 2018 OnceIO, Inc. All Rights Reserved.
      <a href="#/terms">Terms of Use</a>
    </footer>

<div>

    <b-modal ref="myModalRef" hide-footer title="登录注册">
      <div class="d-block text-center">
        <b-form>
        <b-row>
          <b-col sm="2"><label for="input-default">账户:</label></b-col>
          <b-col sm="10">
            <b-form-input id="input-default" type="text" v-model="account" placeholder="输入账户"></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="2"><label for="input-default">密码:</label></b-col>
          <b-col sm="10">
            <b-form-input id="input-default" v-model="passwd" type="password" placeholder="输入密码"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="d-block text-center">
          <a class="btn btn-info" @click="signin()">登录</a>
          <a class="btn btn-info" @click="signup()">注册</a>
        </b-row>
        <b-row class="d-block text-center">
          <span>其他账号登录</span>
          <a class="btn btn-default" :href="weiboAuthUri"><img width="32px" src="https://tva2.sinaimg.cn/crop.0.0.179.179.50/61ecce97tw1ednir6uqxxj2050052mx7.jpg" class="img-circle"></a>
          <a class="btn btn-default" :href="alipayAuthUri"><img width="32px" src="https://t.alipayobjects.com/images/rmsweb/T1Fb0iXnJiXXXXXXXX.png" class="img-circle"></a>
        </b-row>
        </b-form>
      </div>
    </b-modal>
</div>


  </div>
</template>

<script>
export default {
  name: 'AppRoot',
  data () {
    return {
      account:"",
      nickname:"",
      passwd:"",
      alipayAuthUri:"",
      weiboAuthUri:""
    }
  },
  mounted() {
    var self = this;
    this.$http.get('/alipay/authurl').then(function(resp){
      self.alipayAuthUri = resp.body;
    });
    this.$http.get('/weibo/authurl').then(function(resp) {
      self.weiboAuthUri = resp.body;
    });
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show();
    },
    hideModal () {
      this.$refs.myModalRef.hide();
    },
    signin() {
        var self = this;
        this.$http.post('/user/signin',
            {account:self.account,passwd:self.passwd}
        ).then(function(resp){
          var data = resp.data;
          if(data.a != null && data.b != null) {
              var user = Object.assign(data.a,data.b);
              self.$G.user = user;
              self.nickname = user.nickname;
              self.setCookie('userId',user.userId,1);
              self.setCookie('accessToken',user.accessToken,1);
              self.$router.push({path: '/signin',params: user});
              self.hideModal();
          }
        });
    },
    signup() {
        var self = this;
        this.$http.post('/user/signup',
            {account:self.account, passwd:self.passwd}
        ).then(function(resp){
            alert("注册成功，请登录！");
        });
    }
  }
}
</script>

<style scoped>

.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  content: "";
  background: no-repeat center center;
  background-color: #ff00ff;
  background-size: 100% 100%;
}

.oio-container{width:100%;min-height:100%;position:relative;}
.oio-body{padding-bottom:50px;}

footer{
  width: 100%;
  height: 3em;
  position: fixed;
  bottom:0px;left:0px;
  background: #333;
  color: #000000;
  text-align: center;
}
</style>


