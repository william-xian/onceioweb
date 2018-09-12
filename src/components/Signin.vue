<template>
	<div>
    <el-form>
    <el-form-item label="操作：">
      <el-button icon="el-icon-search" @click="onQuery">查询</el-button>
      <el-button icon="el-icon-check" @click="onSubmit">提交</el-button>
      <el-button v-if="hover.relation" type="danger" icon="el-icon-delete" @click="deleteRelation">{{hover.name}}</el-button>
    </el-form-item>

    <el-form-item label="话题：">
      <el-select v-model="topicIds" multiple placeholder="请选择">
        <el-option
          v-for="item in topics"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="节点|关系：">
        <el-input type="textarea" :rows="1" placeholder="A > B; B < A; A ! B; A : B; A = B; A,B > C;" v-model="inputData">
        </el-input>    
    </el-form-item>
    </el-form>
    <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      query: true,
      topics: [],
      topicIds: null,
      inputData: "",
      hover:{},
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
        self.$http.post('/neure_relation/push',{topicId:self.topicIds[0],relation:self.inputData})
        .then(function(res){
          alert('添加成功');
        });
      },
      onQuery :function() {
        var self = this;
        self.$http.get('/neure_relation/searchDepend',{params:{topicIds:self.topicIds,target:self.inputData}})
        .then(function(res){
          self.data = res.data;
          self.drawLine(res.data);
        });
      },
      deleteRelation(){
        var self = this;
        self.$http.get('neure_relation/deleteRelation', {
          params : { ids: JSON.stringify([self.hover.relation.id]) }
        }).then(function(res) {
          alert('成功删除：' + self.hover.name);
          self.hover = {};
        });
      },
      dataConvert(data){
        var neureMap = new Map();
        var combMap = new Map();
        data.neures.forEach(function(neure){
          neure.symbolSize = 1;
          neureMap.set(neure.id, neure);
        });
        data.relations.forEach(function(item){
          if(!combMap.has(item.comb)) {
            combMap.set(item.comb,[item.dependId]);
          }else {
            combMap.get(item.comb).push(item.dependId);
          }
          neureMap.get(item.dependId).symbolSize++;
          neureMap.get(item.deduceId).symbolSize++;
        });
        data.neureMap = neureMap;
        data.combMap = combMap;
      },
      getNeureNamesByComb(data,comb){
        var dependIds = data.combMap.get(comb);
        var names = [];
        if(dependIds != null) {
          dependIds.forEach(function(id){
            names.push(data.neureMap.get(id).name);
          });
        }
        return names.join(', ');
      },
      drawLine(data){
        var self = this;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        self.dataConvert(data);
        /**data-begin */
        var graph = {};
        graph.nodes = [];
        graph.links = [];
        var categories = [{name: '红线'},{name: '正常'}];
        var lineStyles= [{color: "#000000", type: "solid"},{color: "#ff0000", type: "dashed"}];
        data.relations.forEach(function(item){
          var lineStyle = lineStyles[0];
          if(item.relation == '!') {
            lineStyle = lineStyles[1];
          }
          graph.links.push({
            id: item.id + '',
            value: item.relation,
            source: item.dependId + '',
            target: item.deduceId + '',
            lineStyle: lineStyle
          });
        });
       data.neures.forEach(function(neure){
          graph.nodes.push({
            id: neure.id + '',
            name: neure.name + '',
            symbolSize: neure.symbolSize*2+10,
            label : {
                normal: {
                    show: true
                }
            },
            category : 1
          });
        });
        /**data-end */
        var option = {
            title: {
                subtext: 'Default layout',
                top: 'bottom',
                left: 'right'
            },
            tooltip: {
              formatter : function(params,ticket,callback) {
                if(params.dataType == 'edge') {
                  var r = data.relations[params.dataIndex];
                  var t = data.neureMap.get(r.deduceId);
                  var name = null;
                  if(r.relation == '<') {
                     name =  self.getNeureNamesByComb(data,r.comb) + ' > ' + t.name;
                  }else {
                     name = self.getNeureNamesByComb(data,r.comb) + ' ' + r.relation + ' ' + t.name;
                  }
                  self.hover = {relation: r, name: name};
                  return name;
                } else if(params.dataType == 'node'){
                  var d = data.neures[params.dataIndex];
                  self.hover = {neure:d, name: d.name};
                  self.inputData = d.name;
                  return d.name + " : " + (d.brief ||''); 
                }
              }
            },
            legend: [{
                // selectedMode: 'single',
                data: categories.map(function (a) {
                    //return a.name;
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
