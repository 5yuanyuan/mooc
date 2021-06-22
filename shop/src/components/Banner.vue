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
                <input @change="uploadImage" type="file" name="cover_image"/>
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
<!--                    <th>排序</th>-->
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in bannerList" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td><img :src="`${item.imageUrl}?x-oss-process=image/resize,h_100,m_lfit`"></td>
                    <td>
                      <div class="btn-group">
                        <a class="btn btn-xs btn-default" @click="myconfirm(item.id)" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i>删除</a>
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
// import qs from 'qs'

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
    uploadImage: function (event) {
      var that = this
      let file = event.target.files[0]
      let formData = new FormData()
      formData.append('file', file)
      console.log(file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': localStorage.getItem('token')
        }
      }
      axios.post(that.GLOBAL.API_ROOT + '/api/eduBanner/add', formData, config)
          .then(response => {
            console.log(response.data)
            alert('上传成功！')
            this.loadProducts()
          })
    },

    loadProducts: function () {
      var that = this
      let token = localStorage.getItem("token")
      if (!token) {
        that.$router.push("/login")
      } else {
        // console.log(token)
        axios.get(that.GLOBAL.API_ROOT + "/api/eduBanner/getAllBanner", {
        }).then(function (res) {
          that.bannerList = res.data.data
          console.log(that.bannerList)
        },
        function (err) {
          console.log(err)
        })
      }
    },

    myconfirm (id) {
      if(confirm('确定要删除吗')==true){
        this.delBanner(id)
      }
    },

    delBanner: function (id) {
      var that = this
      axios.delete(that.GLOBAL.API_ROOT + '/api/eduBanner/remove/' + id).then(res => {
        console.log(res)
        that.loadProducts()
      })
    },
  },
}
</script>
