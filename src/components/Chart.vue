<template>  
   <div class="default-chart" :style="{width, height}"></div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';
import 'zrender/lib/svg/svg';
// 引入提示框和标题组件

import throttle from '../../utils/throttle';

export default {
   name: 'basic-echarts',
   props: { // 规范传入参数格式，以及默认值
      renderer: {
         type: String,
         required: false
      },
      option: {
         type: Object,
         default: () => ({})
      },
      notMerge: {
         type: Boolean,
         default: false
      },
      lazyUpdate: {
         type: Boolean,
         default: false
      }
   },
   data() {
      return {
         chart: null,
         width: '100%',
         height: '100%'
      };
   },
   methods: {
      // 初始化图表
      initChart(el) {
         // renderer 用于配置渲染方式 可以是 svg 或者 canvas
         const renderer = this.renderer || 'canvas';
         console.log(renderer);
         this.chart = echarts.init(el, null, {
            renderer,
            width: 'auto',
            height: 'auto'
         });
      },
      // 设置配置项
      setOption(option) {
         if (!this.chart) {
            return;
         }

         const notMerge = this.notMerge;
         const lazyUpdate = this.lazyUpdate;

         this.chart.setOption(option, notMerge, lazyUpdate);
      },
      // 销毁
      dispose() {
         if (!this.chart) {
            return;
         }

         this.chart.dispose();
         this.chart = null;
      },
      // 重新渲染
      resize() {
         this.chart && this.chart.resize();
      },
      getInstance() {
         return this.chart;
      }
   },
   mounted() {
      this.$nextTick(function() {
         console.log('did mount');
         this.initChart(this.$el);
         this.setOption(this.option);
         window.addEventListener('resize', throttle(this.resize, 100));
      });
   },
   beforeDestroy() {
      this.dispose();
   },
   watch: {
      // 监视传入的 option 参数，如果有变化则重新设置配置项
      option(newOpt) {
         console.log('update config');
         this.setOption(newOpt);
      }
   }
};
</script>
