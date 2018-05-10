
<template>

<b-row>
<b-col class="col-md-2">
<b-nav vertical class="col-md-12">
	<ol v-for="item in items">
		<li v-on:click="open((dir+item))"> {{item}} </li>
	</ol>
</b-nav>
</b-col>
<b-col class="col-md-10">
<p>
  <vue-markdown :source="content"></vue-markdown>
 </p>
</b-col>
</b-row>

</template>

<script>
import VueMarkdown from 'vue-markdown';
export default {
  name: 'Markdown',
  props: ['dir','files','src'],
  data () {
  	var d = {
  		content : '',
  		items : this.files.split(';')
  	};
  	return d;
 },
 components: {
 	VueMarkdown
 },methods: {
 	open:function(src) {
 		var self = this;
	  	this.$http.get(src)
	  		.then(function(res){ 
	          self.content =  res.data;
			},
			function(res){  
	    });
 	}
 }
}
</script>
