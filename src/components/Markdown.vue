
<template>

<b-row>
<b-col class="col-md-2">
<b-nav vertical class="col-md-12">
<div>
  <label>{{book.name}}</label>
  <el-tree :data="book.children" :props="defaultProps" @node-click="open"></el-tree>
</div>

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
  		book: {},
  		content : '',
  		defaultProps: {
          children: 'children',
          label: 'name'
        }
  	}
  	return d;
 },
 mounted() {
	var d = this;
	this.$http.get(this.dir+'config.json')
	  		.then(function(res){ 
	          d.book =  JSON.parse(res.bodyText);
			},
			function(res){  
	    });
 },
 components: {
 	VueMarkdown
 },methods: {
 	open:function(item) {
 		var src =  item.src;
 		if(src != null && src != "")
 		{
	 		var self = this;
		  	this.$http.get(this.dir+src)
		  		.then(function(res){ 
		          self.content =  res.data;
				},
				function(res){  
		    });
 		}
 	}
 }
}
</script>


