<template>
	<div>

    <div class="down input-group">
      <select name="opt">
        <option value="1">添加</option>
        <option value="2">查询</option>
      </select>
      <input id="input" type="text" class="form-control" placeholder="A > B; B < A; A >< B; A <> B; A = B; A,B > C;">
      <a class='btn btn-info input-group-addon' @click="input">Submit</a>
    </div>
	</div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    console.log(this.getQueryString("code"));

  },
  methods : {
      input :function() {
       var v = document.getElementById("input");
       console.log(v.value);
      },
      getQueryString :function(name) {
        var uri = window.location.href;
        var i = uri.lastIndexOf('?');
        uri = uri.substr(i+1);
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = uri.match(reg);
        if (r != null) return unescape(r[2]); 
        return null; 
      }
  }
}
</script>
