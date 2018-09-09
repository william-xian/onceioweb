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
      url: "/onceio/apis"
    }
  }
}
</script>

