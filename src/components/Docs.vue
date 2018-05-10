<template>
	<div>
		<Markdown dir="/static/docs/" src="01-快速开始.md" files='01-快速开始.md;02-数据库操作.md'></Markdown>
	</div>
</template>

<script>
export default {
  name: 'Docs',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

