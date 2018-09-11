<template>
	<div>
    <div>
      <el-switch v-model="query" active-text="查询" inactive-text="输入">
      </el-switch>
      <el-button icon="el-icon-search" @click="onSubmit">提交</el-button>
    </div>
    <div class="input-group">
      <label>话题：</label>
      <el-select v-model="topicId" placeholder="请选择">
        <el-option
          v-for="item in topics"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="input-group">
      <label>关系：</label>
      <el-input v-if="query" type="text" placeholder="输入节点" v-model="target">
      </el-input>          
    </div>

    <div v-if="!query">
      <el-input type="textarea" :rows="2" placeholder="A > B; B < A; A >< B; A <> B; A = B; A,B > C;" v-model="relation">
      </el-input>
    </div>
    <div>{{data}}</div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      query: true,
      target: "",
      topics: [],
      topicId: null,
      topicIds: null,
      relation: "",
      data: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    var self = this;
    self.$http.get('/topic').then(function(res){
      self.topics = res.data.data;
    });
  },
  methods : {
      onSubmit :function() {
        var self = this;
        if(self.query) {
          self.topicIds = [self.topicId];
          self.$http.get('/neure_relation/searchDepend',{params:{topicIds:self.topicIds,target:self.target}})
          .then(function(res){
            self.data = JSON.stringify(res.data);
          });
          
        }else {
          self.$http.post('/neure_relation/push',{topicId:self.topicId,relation:self.relation})
          .then(function(res){
            self.data = JSON.stringify(res.data);
          });
        }
      }
  }
}
</script>
