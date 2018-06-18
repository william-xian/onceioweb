<template>
  <div>

    <el-collapse v-model="group" >
      <el-collapse-item :title="g.prefix" :name="g.prefix" v-for="g in apis">
        <div>
          <h3>{{g.prefix}} - {{g.brief}} </h3>
          <el-collapse-item v-model="subgroup" :title="a.api" :name="a.api" v-for="a in g.subapi">
            <div>
              {{a.methods[0]}} - {{g.prefix}}{{a.api}} -- {{a.brief}}
            </div>
          </el-collapse-item>
        </div>
      </el-collapse-item>
    </el-collapse>

  </div>


</template>

<script>
import axios from 'axios';
export default {
  name: 'ApiDoc',
  props: ['url','target'],
  data() {
	return {apis:{},model:{},group:"",subgroup:""}
  },
  mounted() {
	var self = this;
  this.group = this.target;
	axios.get(this.url).then(function(resp) {
		self.model = resp.data.model;
		delete resp.data['model'];
		self.apis= resp.data;	
	});	
  }
 
}
</script>

