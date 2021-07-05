<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" style="table-layout: fixed;word-break: break-all;">
                  <thead>
                  <tr>
                    <th>姓名</th>
                    <th>电话</th>
                    <th>头像</th>
                    <th>已购买课程</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in List" :v-if="item.isDeleted===0" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.tel }}</td>
                    <td><img :src="`${item.avatar}?x-oss-process=image/resize,h_100,m_lfit`"/></td>
                    <td>
                      <div class="btn-group">
                        <div class="toolbar-btn-action">
                          <a class="btn btn-primary m-r-5" @click="goto(item.id)"><i class="mdi mdi-eye"></i> 课程列表</a>
                        </div>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MemberList",
  data () {
    return {
      List: []
    }
  },

  methods: {
    close (){
      this.vm.showDialog = false;
    },
    getMemberList: function () {
      let config = {
        headers: {'token': localStorage.getItem("token")}
      }
      var that = this;
      axios.get(that.GLOBAL.API_ROOT + '/api/eduMember/findAll', config).then(response => {
        that.List = response.data.data
      })
    },

    goto: function (id) {
      var that = this
      that.$router.push({
        name: "already_buy",
        query: {
          "id": id
        }
      })
    },
  },

  mounted () {
    this.getMemberList()
  }
}
</script>

<style scoped>

</style>
