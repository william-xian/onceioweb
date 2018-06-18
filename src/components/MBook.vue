
<template>

<b-row>
<b-col class="col-md-2">
<b-nav vertical class="col-md-12">
<div>
  <label>{{book.name}}</label>
  <el-tree :data="book.children" :props="defaultProps" node-key="src" :default-checked-keys="['00.伊始.md']" @node-click="open"></el-tree>
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
import axios from 'axios';
import VueMarkdown from 'vue-markdown';
export default {
  name: 'MBook',
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
	var self = this;
	axios.get(this.dir+'config.json')
	  		.then(function(res){ 
	          self.book =  res.data;
			}).then(function(){

        axios.get(self.dir+self.book.children[0].src)
          .then(function(res){ 
              self.content =  res.data;
        });

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
		  	axios.get(self.dir+src)
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


