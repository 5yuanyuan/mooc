<template>
  <div class="col-lg-6">
    <div class="card">
      <div class="card-header">
        <h4>课程购买人数与浏览量</h4>
      </div>
      <div class="card-body" id="main" style="width: 500px; height: 400px">
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from "axios";

export default {
  name: "CourseBar",
  data() {
    return {
    }
  },
  mounted() {
    this.loadInfo()
  },

  methods: {
    loadInfo: function () {
      var that = this
      var list1 = new Array()
      var list2 = new Array()
      var nameList = new Array()
      axios.get(that.GLOBAL.API_ROOT + '/api/eduCourse/findAll').then(res => {
        console.log(res.data.data)
        // var list = res.data.data
        var i =0
        for(i=0;i<res.data.data.length;i++){
          list1.push(res.data.data[i].buyCount)
          list2.push(res.data.data[i].viewCount)
          nameList.push(res.data.data[i].title)
        }
      })

      that.showBar(list1,list2,nameList)
    },
    showBar: function (l1,l2,nl) {
      console.log('l1',l1)
      console.log('l2',l2)
      console.log('l3',nl)
      var myChart = echarts.init(document.getElementById('main'));
      var option = {
        title: {
          text: '课程购买人数与浏览量的区别',
          subtext: '数据来自后端'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['购买人数', '浏览人数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: nl
        },
        series: [
          {
            name: '购买人数',
            type: 'bar',
            data: l1
          },
          {
            name: '浏览人数',
            type: 'bar',
            data: l2
          }
        ]
        // title: {
        //   text: '世界人口总量',
        //   subtext: '数据来自网络'
        // },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'shadow'
        //   }
        // },
        // legend: {
        //   data: ['2011年', '2012年']
        // },
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        // xAxis: {
        //   type: 'value',
        //   boundaryGap: [0, 0.01]
        // },
        // yAxis: {
        //   type: 'category',
        //   data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        // },
        // series: [
        //   {
        //     name: '2011年',
        //     type: 'bar',
        //     data: [18203, 23489, 29034, 104970, 131744, 630230]
        //   },
        //   {
        //     name: '2012年',
        //     type: 'bar',
        //     data: [19325, 23438, 31000, 121594, 134141, 681807]
        //   }
        // ]
      };
      myChart.setOption(option);
    }
  }
}
</script>

<style scoped>

</style>
