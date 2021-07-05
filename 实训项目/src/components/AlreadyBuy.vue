<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div v-if="list.length != 0" class="table-responsive">
              <table class="table table-bordered" style="table-layout: fixed;word-break: break-all;">
                <thead>
                <tr>
                  <th>课程图片</th>
                  <th>课程名</th>
                  <th>课时数</th>
                  <th>价格</th>
                  <th>教师名</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in list" :key="item.id">
                  <td><img :src="`${item.cover}?x-oss-process=image/resize,h_100,m_lfit`"/></td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.lessonNum }}</td>
                  <td>￥{{ item.price }}</td>
                  <td>{{ item.teacherName }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="noclass">该用户无购买记录！</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: "AlreadyBuy",
  data () {
    return {
      id: this.$route.query.id,
      list: []
    }
  },

  created() {
    var that = this
    that.getAll()
  },

  methods: {
    getAll () {
      var that = this
      axios.get(that.GLOBAL.API_ROOT + '/api/eduCourseSelect/getSelectCourse/' + that.id, {}).then(res => {
        that.list = res.data.data
      })
    }
  }
}
</script>

<style scoped>
.noclass {
  text-align: center;
  margin-top: 50px;
  font-size: 30px;
  color: #ddd;
}
</style>
