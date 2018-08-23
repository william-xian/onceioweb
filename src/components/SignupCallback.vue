<template>
<div>
    <div style="text-align: center;">
      {{msg}}
      {{$store.user}}
    </div>
 </div>
</template>

<script>
export default {
  name: 'SignupCallback',
  data () {
    var url = this.$route.params.platform + "/callback?code=" +this.$route.query.code;
    var msg = "Hi, guys!";
    this.$http.get(url)
        .then(function(res){ 
            var resp =  JSON.parse(res.bodyText);
            if(resp.a != null && resp.b != null) {
                var user = Object.align(resp.a,resp.b);
                this.$store.user = user;
                this.$router.push({name: '/',params:{ id:this.$store.user.id}});
            }else {
              msg = '登陆失败';
            }
			},
			function(res){
        alert(res);
      });
      
    return {
      msg: msg
    }
  }
}
</script>

