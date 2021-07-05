<template>
  <!--页面主要内容-->
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 col-lg-3">
        <div class="card bg-primary">
          <div class="card-body clearfix">
            <div class="pull-right">
              <p class="h6 text-white m-t-0">课程收入</p>
              <p class="h3 text-white m-b-0 fa-1-5x">102</p>
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
              <p class="h3 text-white m-b-0 fa-1-5x">92</p>
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
              <p class="h3 text-white m-b-0 fa-1-5x">34</p>
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
              <p class="h3 text-white m-b-0 fa-1-5x">253</p>
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
            <h4>登录人数</h4>
          </div>
          <div class="card-body" id="login_num" style="width: 500px; height: 400px">
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4>注册人数</h4>
          </div>
          <div class="card-body" id="register_num" style="width: 500px; height: 400px">
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
      loginList1: [],
      loginList2: [],
      registerList1:[],
      registerList2:[],
    }
  },
  mounted() {
    this.readLoginNum()
    this.readRegisterNum()
    // this.readDailyData()
  },
  methods: {
    readLoginNum() {
      var that = this
      axios.get(that.GLOBAL.API_ROOT + "/api/statisticsDaily/showData/login_num/2020-1-1/2020-12-30").then(
              function (response) {
                // console.log(response.data.data.date_calculatedList)
                that.loginList1 = response.data.data.date_calculatedList;
                that.loginList2 = response.data.data.numDataList
                that.showLoginNum(that.loginList1,that.loginList2)
              },
              function (err) {
                console.log(err);
              }
      )
    },
    showLoginNum(l1,l2){
      let LoginChart = this.$echarts.init(document.getElementById('login_num'))
      var option = {
        xAxis: {
          type: 'category',
          data: l1
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: l2,
          type: 'line',
          smooth: true
        }]
      };
      LoginChart.setOption(option)
    },
    readRegisterNum() {
      var that = this
      axios.get(that.GLOBAL.API_ROOT + "/api/statisticsDaily/showData/resigter_num/2020-1-1/2020-12-30").then(
              function (response) {
                // console.log(response.data.data.date_calculatedList)
                that.registerList1 = response.data.data.date_calculatedList;
                that.registerList2 = response.data.data.numDataList
                that.showRegisterNum(that.registerList1,that.registerList2)
              },
              function (err) {
                console.log(err);
              }
      )
    },
    showRegisterNum(){
      let RegisterChart = this.$echarts.init(document.getElementById('register_num'))
      let option = {
        xAxis: {},
        yAxis: {},
        series: [{
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.20],
            [11.5, 7.20],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
          ],
          type: 'scatter'
        }]
      };
      RegisterChart.setOption(option)
    },
    readDailyData:function () {
      // let that =this;
      // axios.get(that.GLOBAL.API_ROOT+"/api/statisticsDaily/getData").then(
      //         function (response) {
      //           // console.log("id=",response.data.data.id)
      //
      //         },
      //         function (err) {
      //           console.log(err);
      //         })
    }

  },

}
</script>

<style scoped>

</style>
