<template>
	<div>
    <form action="">
      <MVDItem  :model='model' v-for='model in data'/>
      <button>Submit</button>   
    </form>
	</div>
</template>

<script>
export default {
  name: 'MVD',
  data () {
    return {
      data : [
          {base:true,name:"username",type:"text",value:"zhangshan",pattern:".{4,20}"},
          {base:true,name:"password",type:"password",value:"123456",pattern:".{6,20}"},
          {base:true,name:"gender",type:"radio",value:"2",values:[{name:"女",val:0},{name:"男",val:1},{name:"保密",val:2}]},
          {base:true,name:"city",type:"select",value:"2",values:[{name:"北京",val:1},{name:"西安",val:2},{name:"乌鲁木齐",val:3}]},
          {base:true,name:"address",type:"textlist",value:"",values:["北京","西安","乌鲁木齐"]},
          {base:false, name : "profile",
              data: [
                  {base:true,name:"hobby",type:"checkbox",value:[0,1],values:[{name:"篮球",val:0},{name:"足球",val:1},{name:"跳舞",val:2}]}
            ]
          }
      ]
    }
  }
}
</script>

