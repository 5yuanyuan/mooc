<template>
  <div class="container-fluid">

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="tab-content">
            <!--                        <div class="tab-pane active">-->
            <!--                            <form name="edit-form" class="edit-form" >-->
            <small class="help-block">标星号为必填字段</small>
            <div class="form-group">
              <label for="name">讲师名称*</label>
              <input class="form-control" type="text" name="name" id="name" v-model="teacher.name" placeholder="请输入姓名">
            </div>
            <div v-if="false" class="form-group">
              <label for="password">密码*</label>
              <input class="form-control" type="text" name="password" id="password" v-model="teacher.password"
                     placeholder="请输入密码"/>
            </div>
            <div class="form-group">
              <label for="tel">电话*</label>
              <input class="form-control" type="text" name="tel" id="tel" v-model="teacher.tel" placeholder="请输入电话"/>
            </div>
            <div class="form-group">
              <label for="intro">教师简介*</label>
              <textarea class="form-control" rows="5" name="intro" id="intro" v-model="teacher.intro"
                        placeholder="请输入简介"/>
            </div>
            <div class="form-group">
              <label for="career">教育经历</label>
              <textarea class="form-control" rows="3" id="career" name="career" v-model="teacher.career"
                        placeholder="请输入教师的生涯简介"/>
              <small class="help-block">无需填写全部，仅最近几段即可</small>
            </div>
            <div class="form-group">
              <label for="example-select">讲师级别</label>
              <div>
                <select class="form-control" v-model="teacher.sort" id="example-select" name="example-select" size="1">
                  <!--                                            <option value="0">请选择</option>-->
                  <option value="1">1级：初级</option>
                  <option value="2">2级：中级</option>
                  <option value="3">3级：高级</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>教师头衔*</label>
              <div class="example-box">
                <label class="lyear-radio radio-inline radio-primary">
                  <input type="radio" value="0" v-model="teacher.level" name="level"><span>高级讲师</span>
                </label>
                <label class="lyear-radio radio-inline radio-primary">
                  <input type="radio" value="1" v-model="teacher.level" name="level"><span>首席讲师</span>
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="avatar">头像</label>
              <div class="input-group">
                <img :src="`${teacher.avatar}?x-oss-process=image/resize,h_100,m_lfit`">
                <input type="file" @change="uploadImage" class="form-control" name="avatar" id="avatar"/>
                <!--                                        <input type="text" class="form-control" name="avatar" id="avatar"/>-->
                <!--                                        <div class="input-group-btn"><button class="btn btn-default" type="button">上传图片</button></div>-->
              </div>
            </div>

            <div class="form-group">
              <button @click="addOrUpdate" class="btn btn-default">确 定</button>
              <button type="button" class="btn btn-default" onclick="javascript:history.back(-1);return false;">返 回
              </button>
            </div>
            <!--                            </form>-->

            <!--                        </div>-->
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import qs from 'qs'
import axios from "axios";

export default {
  name: "AddTeacher",
  data() {
    return {
      teacher: {
        // not null
        name: "",
        // not null
        password: "123",
        // not null
        tel: "",
        // not null
        intro: "",
        career: "",
        avatar: "",
        // not null
        level: "",
        id: "",
        sort: ""//讲师级别
      },
    }
  },
  mounted() {
    console.log("id=", this.$router.history.current.query.id)
    this.teacher.id = this.$router.history.current.query.id;
    if (this.$router.history.current.query.id) {
      this.getTeacherInfo(this.$router.history.current.query.id)
    }
  },
  methods: {
    submit() {

    },
    checkForm() {
      return true
    },
    addOrUpdate() {
      if (this.checkForm()) {
        // 判断修改还是添加
        // 根据teacher是否有id
        console.log("id=", this.teacher.id)
        if (this.teacher.id === "") {
          console.log("add")
          // 添加
          this.addTeacher()
        } else {
          console.log("update")
          // 修改
          this.updateTeacher()
        }
      } else {
        alert("请检查信息填写是否正确")
      }
    },
    uploadImage: function (event) {
      var that = this
      console.log("传图片")
      let file = event.target.files[0];
      that.teacher.avatar = file
      console.log(file)
      // let objName = event.target.name;
      let formData = new FormData();
      formData.append('file', file);
      let config = {
        headers: {'Content-Type': 'multipart/form-data', 'token': localStorage.getItem("token")}
      };
      console.log(config)
      axios.post(that.GLOBAL.API_ROOT + '/api/oss/uploadAvatar', formData, config)
          .then(response => {
            console.log(response.data.data.url);
            that.teacher.avatar = response.data.data.url;
            console.log(that.teacher)
          })
    },
    changeLevel: function (i) {
      this.teacher.level = i;
    },
    // 修改讲师的方法
    updateTeacher() {
      let config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'token': localStorage.getItem("token")}
      };
      let that = this
      axios.post(this.GLOBAL.API_ROOT + "/api/eduTeacher/update", qs.stringify(that.teacher), config)
          .then(response => {
            console.log(response)
            // 提示信息
            // this.$message({
            //   type: 'success',
            //   message: '修改成功!'
            // })
            alert('修改成功！')
            // 回到列表页面 路由跳转
            this.$router.push({path: '/teacher_list'})
          })
    },
    // 添加讲师的方法
    addTeacher() {
      console.log("1" + this.GLOBAL.API_ROOT)
      console.log(JSON.stringify(this.teacher))
      // let config = {
      //   headers: {'Content-Type': 'application/x-www-form-urlencoded', 'token': localStorage.getItem("token")}
      // };
      let config = {
        headers:{'Content-Type': 'application/json','token':localStorage.getItem("token")}
      };
      let that = this
      // this.$http.post(that.GLOBAL.API_ROOT + "/api/add_image",formData,config)
      axios.post(that.GLOBAL.API_ROOT + "/api/eduTeacher/addTeacher", that.teacher, config).then(response => { // 添加成功
            console.log('res=', response)
            if (response.data.code === 200) {
              alert("成功")
              // 回到列表页面 路由跳转
              this.$router.push({path: '/teacher_list'})
            } else {
              alert("失败")
            }
          },
          err => {
            console.log(err)
            alert("添加失败")
          }
      )
    },
    // 根据id查询讲师
    getTeacherInfo(id) {
      var that = this
      axios.get(this.GLOBAL.API_ROOT + "/api/eduTeacher/getTeacherById/" + id).then(res => {
        console.log(res.data.data)
        that.teacher.avatar = res.data.data.avatar;
        that.teacher.career = res.data.data.career;
        that.teacher.level = res.data.data.level;
        that.teacher.intro = res.data.data.intro;
        that.teacher.password = res.data.data.password;
        that.teacher.name = res.data.data.name;
        that.teacher.tel = res.data.data.tel;
        that.teacher.sort = res.data.data.sort;
      })
    },
  }
}
</script>

<style scoped>

</style>
