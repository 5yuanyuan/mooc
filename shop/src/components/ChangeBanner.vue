<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <!--            <form action="#!" method="post" class="row">-->
            <div class="form-group col-md-12">
              <label>标题</label>
              <input v-model="title" type="text" class="form-control"/>
            </div>
            <div class="form-group col-md-12">
              <label>封面图片</label>
              <img :src="`${cover}?x-oss-process=image/resize,h_100,m_lfit`">
              <input @change="uploadImage" type="file" name="cover_image"/>
            </div>
            <div class="form-group col-md-12">
              <label>价格</label>
              <input v-model="price" type="text" class="form-control"/>
            </div>
            <div class="form-group col-md-12">
              <label>课时数</label>
              <input v-model="lessonNum" type="text" class="form-control"/>
            </div>
            <div class="form-group col-md-12">
              <label>课程描述</label>
              <input v-model="description" type="text" class="form-control"/>
            </div>
            <div class="form-group col-md-12">
              <button @click="save" type="button" class="btn btn-primary ajax-post" target-form="add-form">确 定</button>
            </div>
            <!--            </form>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "ChangeBanner",
  data() {
    return {
      title: "",
      cover: "",
      lessonNum: 0,
      price: 0,
      description: "",
      id: this.$route.query.id,
      gmtCreate: "",
      gmtModified: "",
      status: "",
      subjectId: "",
      subjectParentId: "",
      teacherAvatar: "",
      teacherId: "",
      teacherIntro: "",
      teacherName: "",
      type: 0,
      viewCount: 0
    }
  },

  created() {
    var that = this
    if (that.id != null) {
      that.getImage()
    }
  },

  methods: {
    getImage: function () {
      var that = this
      axios.get(that.GLOBAL.API_ROOT + '/api/eduCourse/getCourseInfo/' + that.id, {}).then(res => {
        console.log(res.data)
        let list = res.data.data
        that.cover = list.cover
        that.title = list.title
        that.price = list.price
        that.lessonNum = list.lessonNum
        that.description = list.description
        that.gmtCreate = list.gmtCreate,
            that.gmtModified = list.gmtModified,
            that.status = list.status,
            that.subjectId = list.status,
            that.subjectParentId = list.subjectParentId,
            that.teacherAvatar = list.teacherAvatar,
            that.teacherId = list.teacherId,
            that.teacherIntro = list.teacherIntro,
            that.teacherName = list.teacherName,
            that.type = list.type,
            that.viewCount = list.viewCount
      })
    },

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
            this.getImage()
          })
    },

    save: function () {
      var that = this
      axios.put(that.GLOBAL.API_ROOT + '/api/eduCourse/updateCourseInfo', ({
        "cover": that.cover,
        "description": that.description,
        "id": that.id,
        "lessonNum": that.lessonNum,
        "price": that.price,
        "gmtCreate": that.gmtCreate,
        "gmtModified": that.gmtModified,
        "status": that.status,
        "subjectedId": that.subjectId,
        "subjectParentId": that.subjectParentId,
        "teacherAvatar": that.teacherAvatar,
        "teacherId": that.teacherId,
        "teacherInfo": that.teacherIntro,
        "teacherName": that.teacherName,
        "type": that.type,
        "viewCount": that.viewCount
      })).then(function (res) {
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
