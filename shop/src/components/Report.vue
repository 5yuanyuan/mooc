<template>
  <!--页面主要内容-->
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 col-lg-3">
        <div class="card bg-primary">
          <div class="card-body clearfix">
            <div class="pull-right">
              <p class="h6 text-white m-t-0">课程收入</p>
              <p class="h3 text-white m-b-0 fa-1-5x">102,125</p>
            </div>
            <div class="pull-left"><span class="img-avatar img-avatar-48 bg-translucent"><i
                class="mdi mdi-currency-cny fa-1-5x"></i></span></div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-lg-3">
        <div class="card bg-danger">
          <div class="card-body clearfix">
            <div class="pull-right">
              <p class="h6 text-white m-t-0">新增注册人数</p>
              <p class="h3 text-white m-b-0 fa-1-5x">920,000</p>
            </div>
            <div class="pull-left"><span class="img-avatar img-avatar-48 bg-translucent"><i
                class="mdi mdi-account fa-1-5x"></i></span></div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-lg-3">
        <div class="card bg-success">
          <div class="card-body clearfix">
            <div class="pull-right">
              <p class="h6 text-white m-t-0">课程总量</p>
              <p class="h3 text-white m-b-0 fa-1-5x">34,005</p>
            </div>
            <div class="pull-left"><span class="img-avatar img-avatar-48 bg-translucent"><i
                class="mdi mdi-arrow-down-bold fa-1-5x"></i></span></div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-lg-3">
        <div class="card bg-purple">
          <div class="card-body clearfix">
            <div class="pull-right">
              <p class="h6 text-white m-t-0">课程浏览量</p>
              <p class="h3 text-white m-b-0 fa-1-5x">253,500,000</p>
            </div>
            <div class="pull-left"><span class="img-avatar img-avatar-48 bg-translucent"><i
                class="mdi mdi-comment-outline fa-1-5x"></i></span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4>收入报表</h4>
          </div>
          <div class="card-body" id="incomeReport" style="width: 700px; height: 600px">
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4>销售收入对比表</h4>
          </div>
          <div class="card-body" id="saleIncomeReport" style="width: 700px; height: 600px">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Report",
  data() {
    return {
      saleTotalList: []
    }
  },
  mounted() {
    this.readReportDate()
    this.readSaleIncome()
  },

  methods: {
    showSaleIncomeReport: function (saleMoneyList, saleMonthList, level1List, level2List) {
      let saleIncomeReport = this.$echarts.init(document.getElementById('saleIncomeReport'))
      var posList = [
        'left', 'right', 'top', 'bottom',
        'inside',
        'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
        'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
      ]

      var app = {}

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      };

      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          }
          saleIncomeReport.setOption({
            series: [{
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }]
          });
        }
      };


      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      };

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['销售金额', '一级提成', '二级提成', 'Wetland']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: saleMonthList
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销售金额',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: saleMoneyList
          },
          {
            name: '一级提成',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: level1List
          },
          {
            name: '二级提成',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: level2List
          }
        ]
      }
      saleIncomeReport.setOption(option)
    },

    // 取销售和提成的数据
    readSaleIncome: function () {
      var that = this
      axios.get('http://10.7.189.69:8080/api/get_month_sale_list')
          .then(function (res) {
                let saleMoneyList = []
                let level1List = []
                let level2List = []
                let saleMonthList = []
                res.data.forEach(item => {
                  saleMoneyList.push(item.sale_money)
                  saleMonthList.push(item.sale_month)
                  level1List.push(item.level1money)
                  level2List.push(item.level2money)
                })
                that.showSaleIncomeReport(saleMoneyList, saleMonthList, level1List, level2List)
                that.pieReport(saleMoneyList, saleMonthList)
              },
              function (err) {
                console.log(err)
              })
    },

    showIncomeReport: function (keys, saleTotalList) {
      let incomeReportChart = this.$echarts.init(document.getElementById('incomeReport'))
      let option = {
        xAxis: {
          type: 'category',
          data: keys
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: saleTotalList,
          type: 'bar'
        }]
      }
      incomeReportChart.setOption(option)
    },

    readReportDate: function () {
      var that = this
      axios.get('http://10.7.189.69:8080/api/get_incomes/?seqNumber=100000')
          .then(function (res) {
                let keys = Object.keys(res.data.income_dict)
                keys.forEach(function (key) {
                  let saleTotal = res.data.income_dict[key].sale_total
                  that.saleTotalList.push(saleTotal)
                })
                that.showIncomeReport(keys, that.saleTotalList)
              },
              function (err) {
                console.log(err)
              })
    },

    
  }
}
</script>

<style scoped>

</style>
