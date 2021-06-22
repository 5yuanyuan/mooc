<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-toolbar clearfix">
            <form class="pull-right search-bar" method="get" action="#!" role="form">
              <div class="input-group">
                <div class="input-group-btn">
                  <input type="hidden" name="search_field" id="search-field" value="title">
                  <button class="btn btn-default dropdown-toggle" id="search-btn" data-toggle="dropdown" type="button"
                          aria-haspopup="true" aria-expanded="false">
                    标题 <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><a tabindex="-1" href="javascript:void(0)" data-field="title">标题</a></li>
                    <li><a tabindex="-1" href="javascript:void(0)" data-field="cat_name">栏目</a></li>
                  </ul>
                </div>
                <input type="text" class="form-control" name="keyword" placeholder="请输入名称">
              </div>
            </form>
            <div class="toolbar-btn-action">
              <a class="btn btn-primary m-r-5" @click="goAdd"><i class="mdi mdi-plus"></i> 新增</a>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                <tr>
                  <th>课程名</th>
                  <th>课程图片</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in payCourseList" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td><img :src="`${item.cover}?x-oss-process=image/resize,h_100,m_lfit`"></td>
                  <td>
                    <div class="btn-group">
                      <a class="btn btn-xs btn-default" @click="gotoA(item.id)" title="编辑" data-toggle="tooltip"><i
                          class="mdi mdi-pencil"></i></a>
                      <a class="btn btn-xs btn-default" title="查看" data-toggle="tooltip"><i class="mdi mdi-eye"></i></a>
                      <a class="btn btn-xs btn-default" @click="delClass(item.id)" title="删除" data-toggle="tooltip"><i
                          class="mdi mdi-window-close"></i></a>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: "ExcellentCourses",
  data() {
    return {
      payCourseList: []
    }
  },

  mounted() {
    this.loadProducts()
  },

  methods: {
    loadProducts: function () {
      var that = this
      let token = localStorage.getItem("token")
      if (!token) {
        that.$router.push("/login")
      } else {
        // console.log(token)
        axios.get(that.GLOBAL.API_ROOT + "/api/index", {}).then(function (res) {
              that.payCourseList = res.data.data.vipCourseList
              // console.log(that.payCourseList)
            },
            function (err) {
              console.log(err)
            })
      }
    },

    goto: function (id) {
      var that = this
      that.$router.push({
        name: "change_banner",
        query: {
          "id": id
        }
      })
    },

    gotoA: function (id) {
      var that = this
      that.$router.push({
        name: "course",
        query: {
          "id": id
        }
      })
    },

    goAdd: function () {
      this.$router.push("/course")
    },

    delClass: function (id) {
      var that = this
      if (confirm('确定要删除吗？') === true) {
        axios.delete(that.GLOBAL.API_ROOT + '/api/eduCourse/removeCourseInfo/' + id).then(res => {
          console.log(res)
        })
      }
    }
  },
}
</script>
