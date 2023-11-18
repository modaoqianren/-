<template>
  <div>
    <div id="container" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

import { mapGetters, mapActions } from 'vuex'
export default {
  mounted() {
    this.reqList()
    this.moreChart();
  },
  computed:{
    ...mapGetters({
      list: 'cate/list'
    })
  },
  methods: {
    ...mapActions({
      reqList: 'cate/reqList'
    }),
    moreChart() {
      let options = {
        chart: {
          type: "line" //指定图表的类型，默认是折线图（line）
        },
        title: {
          text: "商品分类" // 标题
        },
        xAxis: {
          categories: this.list.map(item => item.catename) // x 轴分类
        },
        yAxis: {
          title: {
            text: "下级分类数量" // y 轴标题
          }
        },
        series: [
          {
            // 数据列
            name: "数量", // 数据列名
            data: this.list.map(item => item.children ? item.children.length : 0) // 数据
          }
        ]
      };

      let chart = Highcharts.chart("container", options);
    }
  },
  watch:{
    list:{
      handler(){
        if(this.list.length > 0){
          this.moreChart()
        }
      }
    }
  }
};
</script>

<style>
</style>