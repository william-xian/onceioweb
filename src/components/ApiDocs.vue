<template>
	<div>
		<ApiDoc :url="url" target=""></ApiDoc>
	</div>
</template>

<script>
export default {
  name: 'ApiDocs',
  data () {
    return {
      url: '/rs/docs.json'
    }
  }
}
</script>

