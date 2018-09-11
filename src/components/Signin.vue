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
    <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
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
      data: {neures:[],relations:[]}
    }
  },
  mounted() {
    var self = this;
    self.$http.get('/topic').then(function(res){
      self.topics = res.data.data;
    });
    self.drawLine(self.data);
  },
  methods : {
      onSubmit :function() {
        var self = this;
        if(self.query) {
          self.topicIds = [self.topicId];
          self.$http.get('/neure_relation/searchDepend',{params:{topicIds:self.topicIds,target:self.target}})
          .then(function(res){
            self.data = res.data;
            self.drawLine(res.data);
          });
          
        }else {
          self.$http.post('/neure_relation/push',{topicId:self.topicId,relation:self.relation})
          .then(function(res){
            self.data = JSON.stringify(res.data);
          });
        }
      },
      drawLine(data){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));

        /**data-begin */
        var graph = {};
        graph.nodes = [];
        graph.links = [];
        var categories = [{name:'基元'}];
        var categoriesMap = new Map();
        data.relations.forEach(function(item){
          if(!categoriesMap.has(item.comb)) {
            categoriesMap.set(item.comb,{names:[item.dependId]});
          }else {
            categoriesMap.get(item.comb).names.push(item.dependId);
          }
        });
        data.relations.forEach(function(item){
          var c = categoriesMap.get(item.comb)||{names:[]};
          graph.links.push({
            id: item.id+'',
            name: c.names.join(',')+' - '+item.relation,
            source: item.dependId+'',
            target: item.deduceId+''
          });
        });
       data.neures.forEach(function(neure){
          graph.nodes.push({
            id: neure.id+'',
            name: '' + neure.name,
            brief: neure.brief,
            "symbolSize":10,
            label : {
                normal: {
                    show: true
                }
            },
            category : 0
          });
        });
        /**data-end */
        var option = {
            title: {
                text: 'NR',
                subtext: 'Default layout',
                top: 'bottom',
                left: 'right'
            },
            tooltip: {},
            legend: [{
                // selectedMode: 'single',
                data: categories.map(function (a) {
                    return a.name;
                })
                
            }],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    title: '{b}',
                    type: 'graph',
                    layout: 'circular',
                    data: graph.nodes,
                    links: graph.links,
                    categories: categories,
                    roam: true,
                    draggable:true,
                    focusNodeAdjacency: true,
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 1,
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    label: {
                        position: 'right',
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3
                    },
                    emphasis: {
                        lineStyle: {
                            width: 10
                        }
                    }
                }
            ]
        };


      // 绘制图表
      myChart.setOption(option);
    }
  }
}
</script>
