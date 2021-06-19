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
                  <button class="btn btn-default dropdown-toggle" id="search-btn" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false">
                  标题 <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li> <a tabindex="-1" href="javascript:void(0)" data-field="title">标题</a> </li>
                    <li> <a tabindex="-1" href="javascript:void(0)" data-field="cat_name">栏目</a> </li>
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
                    <th>id</th>
                    <th>轮播图片</th>
<!--                    <th>详情图片</th>-->
                    <th>排序</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in bannerList" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td><img :src="`${item.imageUrl}?x-oss-process=image/resize,h_100,m_lfit`"></td>
<!--                    <td><img :src="`${item.detailImage}?x-oss-process=image/resize,h_100,m_lfit`"></td>-->
                    <td>
                      <select @change="changeOrder" v-model="item.orderNum">
                        <option v-for="index of 50" :value="index" :key="index">{{ index }}</option>
                      </select>
                    </td>
                    <td>
                      <div class="btn-group">
                        <a class="btn btn-xs btn-default" @click="goto(item.id)" title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>
                        <a class="btn btn-xs btn-default" title="查看" data-toggle="tooltip"><i class="mdi mdi-eye"></i></a>
                        <a class="btn btn-xs btn-default" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a>
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
import qs from 'qs'

export default {
  name: "ProductList",
  data() {
    return {
      bannerList: []
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
        axios.get(that.GLOBAL.API_ROOT + "/api/eduBanner", {
        }).then(function (res) {
          that.bannerList = res.data.data
          console.log(that.bannerList)
        },
        function (err) {
          console.log(err)
        })
      }
    },

    goto: function(id) {
      var that = this
      that.$router.push({
        name: "change_banner",
        query: {
          "id": id
        }
      })
    },

    goAdd: function () {
      this.$router.push("/change_banner")
    },

    changeOrder: function (event) {
      var that = this
      let productId = event.target.id
      let orderNum = event.target.value
      axios.post(that.GLOBAL.API_ROOT + "/change_product_order", qs.stringify({
        "productId": productId,
        "orderNum": orderNum
      })).then(function (res) {
            console.log(res)
            that.loadProducts()
          },
          function (err) {
            console.log(err)
          })
    }
  },
}
</script>
