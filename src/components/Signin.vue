<template>
	<div>
        <input class="down" type="text" name="cmd"/>
        <button @click="input">确认</button>
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

  },
  methods : {
      input :function() {
      }
  }
}
</script>
