<template>
<div>
    <div style="text-align: center;">
      {{msg}}
      {{$G.user}}
    </div>
 </div>
</template>

<script>
export default {
  name: 'SignupCallback',
  data () {
    var msg = '登录中';
    var platform = this.$route.params.platform;
    var code = this.$route.query.code;
    var auth_code = this.$route.query.auth_code;
    var app_id = this.$route.query.app_id;
    return {
      msg: msg,
      platform:platform,
      code:code,
      auth_code:auth_code,
      app_id:app_id
    }
  },
  mounted(){
    var self = this;
    var url = null;
    if(self.platform == 'alipay') {
      url = self.platform+ "/callback?code=" + self.auth_code + "&app_id=" + self.app_id;
    }else if(self.platform == 'weibo'){
      url = self.platform+ "/callback?code=" + self.code;
    }
    url = "/" + url;
    if(url) {
      self.$http.get(url)
        .then(function(res){ 
            var resp =  JSON.parse(res.bodyText);
            self.msg = JSON.stringify(res);
            if(resp.a != null && resp.b != null) {
                var user = Object.assign(resp.a,resp.b);
                self.$G.user = user;
                self.msg = JSON.stringify(user);
                self.$router.push({name: 'Signin',params:user});
            }else {
              self.msg = "登录失败";
            }
			},
			function(res){
       // var resp =  JSON.parse(res);
        self.msg = "error: " + (JSON.stringify(res));
      });
    }
  }
}
</script>

