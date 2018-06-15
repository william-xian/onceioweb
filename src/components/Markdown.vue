
<template>

<b-row>
<b-col class="col-md-2">
<b-nav vertical class="col-md-12">
<div>
  <TreeNode :model="treeData" :callback="open"></TreeNode>
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
import TreeNode from '@/components/TreeNode'
export default {
  name: 'Markdown',
  props: ['dir','files','src'],
  data () {
  	var d = {
  		treeData: {},
  		content : ''
  	}
  	return d;
 },
 mounted() {
	var d = this;
	this.$http.get(this.dir+'config.json')
	  		.then(function(res){ 
	          d.treeData =  JSON.parse(res.bodyText);
			},
			function(res){  
	    });
 },
 components: {
 	VueMarkdown,TreeNode
 },methods: {
 	open:function(src) {
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


