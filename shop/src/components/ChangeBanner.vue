<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <form action="#!" method="post" class="row">
              <div class="form-group col-md-12">
                <label>标题</label>
                <input v-model="title" type="text" class="form-control"/>
              </div>
              <div class="form-group col-md-12">
                <label>封面图片</label>
                <img :src="`${coverImageUrl}?x-oss-process=image/resize,h_200,m_lfit`">
                <input @change="uploadImage" type="file" name="cover_image"/>
              </div>
              <div class="form-group col-md-12">
                <label>详情图片</label>
                <img :src="`${detailImageUrl}?x-oss-process=image/resize,h_200,m_lfit`">
                <input @change="uploadImage" type="file" name="detail_image"/>
              </div>
              <div class="form-group col-md-12">
                <button @click="save" type="button" class="btn btn-primary ajax-post" target-form="add-form">确 定</button>
              </div>
            </form>
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
  name: "AddProduct",
  data () {
    return {
      coverImageUrl: "",
      detailImageUrl: "",
      title: "",
      id: this.$route.query.id
    }
  },
  created() {
    var that = this
    if (that.id != null) {
      axios.get(that.GLOBAL.API_ROOT + '/load_product', {
        params: {
          "id": that.id
        }
      }).then(res => {
        // console.log(res.data[0])
        that.coverImageUrl = res.data[0].coverImage
        that.detailImageUrl = res.data[0].detailImage
        that.title = res.data[0].title
      })
    }
  },
  methods: {
    uploadImage: function (event) {
      var that = this
      let file = event.target.files[0]
      let formData = new FormData()
      formData.append('file', file)
      let config = {
        headers:{ 'Content-Type': 'multipart/form-data' }
      }
      axios.post(that.GLOBAL.API_ROOT + '/upload_image', formData, config)
      .then(response => {
        var that = this
        console.log(response.data)
        let imageUrl = response.data.imageUrl
        if (event.target.name == "cover_image") {
          that.coverImageUrl = imageUrl
        } else {
          that.detailImageUrl = imageUrl
        }})
    },
    save: function () {
      var that = this
      axios.post(that.GLOBAL.API_ROOT + '/save_image', qs.stringify({
        "coverImage": that.coverImageUrl,
        "detailImage": that.detailImageUrl,
        "title": that.title,
        "category": "product"
      })).then(function (res) {
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
