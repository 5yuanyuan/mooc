<template>
  <div class="card">
    <div class="card-body">
      <ul class="nav nav-tabs nav-justified">
        <li class="active">
          <a data-toggle="tab" href="#home-basic">基本信息</a>
        </li>
        <li class="nav-item">
          <a data-toggle="tab" href="#profile-basic">课程大纲及视频</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade active in" id="home-basic">
          <div class="card-body">
            <form class="form-horizontal" action="#" method="post" enctype="multipart/form-data"
                  onsubmit="return false;">
              <div class="form-group">
                <label class="col-xs-12" for="example-text-input">课程名</label>
                <div class="col-xs-12">
                  <input v-model="title" class="form-control" type="text" id="example-text-input"
                         name="example-text-input">
                </div>
              </div>
              <div class="form-group">
                <label class="col-xs-12" for="example-text-input">课程封面</label>
                <div class="col-xs-12">
                  <img :src="`${cover}?x-oss-process=image/resize,h_100,m_lfit`">
                  <input @change="uploadImage" type="file" name="cover_image"/>
                </div>
              </div>
              <div class="form-group">
                <label class="col-xs-12" for="example-email-input">价格</label>
                <div class="col-xs-12">
                  <input v-model="price" class="form-control" type="text" id="example-email-input"
                         name="example-email-input">
                </div>
              </div>
              <div class="form-group">
                <label class="col-xs-12" for="example-password-input">课时数</label>
                <div class="col-xs-12">
                  <input v-model="lessonNum" class="form-control" type="text" id="example-password-input"
                         name="example-password-input">
                </div>
              </div>
              <div class="form-group">
                <label class="col-xs-12" for="example-textarea-input">课程描述</label>
                <div class="col-xs-12">
              <textarea v-html="description" class="form-control" id="example-textarea-input"
                        name="example-textarea-input" rows="6">
              </textarea>
                </div>
              </div>
              <div class="form-group">
                <div class="col-xs-12">
                  <button @click="save" class="btn btn-primary" type="submit">提交</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="tab-pane fade" id="profile-basic">
          <video-player class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions">
          </video-player>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
  name: "ChangeBanner",
  components: {
    videoPlayer
  },
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
      viewCount: 0,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false,  // 如果为true,浏览器准备好时开始回放
        muted: false,     // 默认情况下将会消除任何音频。
        loop: false,      // 是否视频一结束就重新开始。
        preload: 'auto',  // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '4:3',  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true,  // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",  // 类型
          src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'             // url地址
        }],
        poster: '',  // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,           // 当前时间和持续时间的分隔符
          durationDisplay: true,       // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true       // 是否显示全屏按钮
        }
      }
    }
  },
  created() {
    var that = this
    if (that.id != null) {
      axios.get(that.GLOBAL.API_ROOT + '/api/eduCourse/getCourseInfo/' + that.id, {}).then(res => {
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
    }
  },
  methods: {
    uploadImage: function (event) {
      let file = event.target.files[0]
      let formData = new FormData()
      formData.append('file', file)
      console.log(file)
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
        alert(res.data.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
