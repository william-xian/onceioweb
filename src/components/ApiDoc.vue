<template>
  <div>
<b-row>
<b-col class="col-md-2">
<div>
  <el-tree :data="apitree" :props="treecnf" @node-click="showApi"></el-tree>
</div>
</b-col>
<b-col class="col-md-10">
  <div>
    <h3>简介：
    {{curapi.brief}}
    </h3>
    <br/>
    <div v-if="curapi.returnType">
      <div class="panel panel-primary">
          <div class="panel-heading">
              <h3 class="panel-title">参数:</h3>
          </div>
          <div class="panel-body">
            <form id="frm-params" class="form-horizontal" role="form" :action="curapi.api" :method="curapi.methods">
              <div v-bind:key="(p,name)"  v-for="(p,name) in curapi.params">
                <div v-if="name != ':type'" class="form-group row">
                  <label :for="name" class="col-sm-2 col-form-label">{{name}}</label>
                  <div class="col-sm-8">
                    <input :name="name" :id="name" class="form-control" :placeholder="p[':type']"/>
                  </div>
                </div>

                <div v-if="name == ':type'" v-bind:key="(sp,sname)" v-for="(sp,sname) in model[p]">
                  <div v-if="sname.indexOf(':') < 0" class="form-group row">
                    <label :for="sname" class="col-sm-2 col-form-label">{{sname}}</label>
                    <div class="col-sm-8">
                      <input :name="sname" :id="sname" class="form-control" :placeholder="sp"/>
                    </div>
                  </div>
                </div>

              </div>
              <div>
                <a class="btn btn-info col-sm-1" :href="curapi.api" target="_blank">转到</a>
                <a class="btn btn-success col-sm-1" :href="curapi.api" @click="submit">提交</a>
              </div>
            </form>
          </div>
      </div>

      <br/>
      <div>
        <div class="panel panel-danger">
            <div class="panel-heading">
                <h3 class="panel-title">返回值：{{curapi.returnType[':type']}}</h3>
            </div>
            <div class="panel-body">
              <pre v-bind:key="ep" v-for="ep in curapi.extractReturnType">{{JSON.stringify(ep,null,2)}}</pre>
            </div>
        </div>

      </div>
      <br/>
    </div>
  </div>
</b-col>
</b-row>

  </div>


</template>

<script>
export default {
  name: 'ApiDoc',
  props: ['url','target'],
  data() {
	return {
          apiurl:'',
          apitree: [],
          treecnf: {
            children: 'subapi',
            label: 'name'
          },
          curapi: {
          }
        }
  },
  mounted() {
    this.apiurl = this.url;
    this.$options.methods.fresh.bind(this)();
  },
  methods: {
    showApi: function(sa) {
      this.curapi = sa;
      if(sa.returnType != null && sa.returnType[':type'] != null) {
        this.curapi.extractReturnType = [];
        var extractReturnType = this.curapi.extractReturnType;
        var rt = sa.returnType[':type'];
        var l,r,m;
        do{
          l = rt.indexOf('<');
          r = rt.lastIndexOf('>');
          if(l<0){
            if(rt != this.model[rt]) {
              m = {};
              m[rt] = this.model[rt];
              extractReturnType.push(m);
            }
            break;
          }
          var rtContainer = rt.substr(0,l);
          m = {};
          m[rtContainer] = this.model[rtContainer];
          extractReturnType.push(m);
          rt = rt.substr(l+1,r-l-1);
        }while(l < rt.length);
      }
    },
    fresh : function() {
      var self = this;
      this.group = this.target;
      this.$http.get(this.apiurl).then(function(resp) {
        self.model = resp.data.model;
        delete resp.data['model'];
        self.apis= resp.data;
        self.apitree = [];
        for(var ei in resp.data) {
          var e = resp.data[ei];
          e.api=e.api;
          var api =  {};
          if(e.api == '') {
             api.name="/";
          }else {
             api.name=e.api;
          }
          api.subapi = [];
          e.subapi.forEach(function(item) {
            var se = item;
            se.name =  item.methods[0] + " - " + e.api + "" + item.api;
            se.api=e.api+item.api;
            api.subapi.push(se);
          });
          self.apitree.push(api);
        }
      }); 
    },
    submit: function(data) {
      var d = document.getElementById("frm-params");
      console.log(d);
      return true;
    }
  }
}
</script>

