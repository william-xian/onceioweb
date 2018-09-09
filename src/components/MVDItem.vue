<template>
	<div>
        <li>
            <div v-if="model.base">
                <label>{{model.name}}</label>
                <select v-if="model.type=='select'" v-model="model.value" @change='changeType'>
                    <option v-bind:key="m" v-for="m in model.values" :value='m.val'>{{m.name}}</option>
                </select>
                <textarea v-else-if="model.type=='textarea'" v-model="model.value">
                </textarea>
                <element v-else-if="model.type=='radio' || model.type=='checkbox'" v-bind:key="m" v-for="m in model.values">
                    <label>{{m.name}}</label><input :name="model.name" :type="model.type" :value="m.val" />
                </element>
                <input v-else-if="model.type=='textlist'" :list="model.name" :type="model.type" :value="model.value"/>
                <input v-else :name="model.name" :type="model.type" :value="model.value"/>

                <datalist v-if="model.type=='textlist'" :id="model.name">
                    <option v-for="m in model.values" v-bind:key="m" :value='m'>{{m.name}}</option>
                </datalist>
            </div>
            <div  v-if='!model.base'>
                <label>{{model.name}}</label>
            <span @click='toggle'>
                <i v-if="open"> - </i>
                <i v-if="!open"> + </i>
            </span>
                <ul v-if="open">
                    <MVDItem v-for='cel in model.data' v-bind:key="cel" :model='cel'></MVDItem>
                </ul>  
            </div>
        </li>
	</div>
</template>

<style scoped>
li {
    list-style: none;
};
label {
    width:20%;
    min-width: 40px;
}
</style>

<script>
export default {
  name: "MVDItem",
  props: ["model"],
  components: {},
  data() {
    return {
      open: false,
      isFolder: true
    }
  },
  methods : {
    toggle : function() {
        this.open = !this.open;
    },
    changeType: function (ele) {
        var optionTxt = $(ele.target).find("option:selected").text();
        var optionVal = ele.target.value;
    }
  }
};
</script>

