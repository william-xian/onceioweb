<template>

  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle"
      @dblclick="changeType">
      <label>{{ model.name }}</label>
      <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <TreeNode
        v-for="(model, index) in model.children"
        :key="index"
        :model="model"
        :callback="callback"
        >
      </TreeNode>
      <li v-if="options!=null && !options.readOnly" class="add" @click="addChild">+</li>
    </ul>
  </li>

</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    model: Object,
    options: Object,
    callback: Function
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
      this.callback(this.model.src);
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
        name: 'new node'
      })
    }
  }
}
</script>

<style scoped>
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>