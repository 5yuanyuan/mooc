<template>
    <div class="container-fluid" >
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="tab-content">
                        <small class="help-block">*标星号为必填字段</small>
                        <div class="form-group" v-if="this.subject.id">
                            <label for="name">课程ID*</label>
                            <input class="form-control" disabled="disabled" type="text" name="id" id="id" v-model="subject.id" placeholder="请输入课程ID" >
                        </div>
                        <div class="form-group">
                            <label for="name">课程名称*</label>
                            <input class="form-control" type="text" name="name" id="name" v-model="subject.name" placeholder="请输入课程名" >
                        </div>
                        <div class="form-group">
                            <label for="parentCid">父元素ID</label>
                            <input class="form-control" @change="getPcname" type="text" name="parentCid" id="parentCid" v-model="subject.parentCid" placeholder="请输入父元素的id">
                            <small class="help-block">（如不填则为一级菜单）</small>
                        </div>
                        <div class="form-group">
                            <label for="parentCid">父元素名</label>
                            <input class="form-control" disabled="disabled" type="text" name="parentCname" id="parentCname" v-model="parentCname" placeholder="请输入父元素的名字">
                            <small class="help-block">（将自动根据父元素ID计算得出）</small>
                        </div>
                        <div class="form-group" >
                            <button @click="addOrUpdate"  class="btn btn-default">确 定</button>
                            <button type="button" class="btn btn-default" onclick="javascript:history.back(-1);return false;">返 回</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    // import qs from "qs";
    // import qs from "qs";
    export default {
        name: "AddSubject",
        data(){
            return{
                subject:{
                    id: "",
                    name: "",
                    parentCid: "",
                    catLevel: null,
                    showStatus: 1,
                    sort: null,
                    gmtCreate: 1608304695000,
                    gmtModified: 1608304695000,
                    children: null,
                },
                parentCname:""
            }
        },
        mounted() {
            if(this.$router.history.current.query.id){
                this.subject.id=this.$router.history.current.query.id
                console.log(this.$router.history.current.query.id)
                this.getSubject(this.$router.history.current.query.id)
                if(this.subject.parentCid!==""){
                    this.getPcname();
                }
            }
        },
        methods:{
            getSubject:function (id) {
                var that = this
                axios.get(that.GLOBAL.API_ROOT + "/api/eduSubject/getSubject/"+id).then(
                    function (response) {
                        // console.log(response.data.data.subject);
                        that.subject = response.data.data.subject;
                    },
                    function (err) {
                        console.log(err);
                    }
                )
            },
            getPcname:function() {
                var that = this
                if(that.subject.parentCid !== ""){
                    axios.get(that.GLOBAL.API_ROOT + "/api/eduSubject/getSubject/"+that.subject.parentCid).then(
                        function (response) {
                            if(response.data.data.subject){
                                that.parentCname = response.data.data.subject.name;
                            }
                            else{
                                alert("父元素id无效")
                            }
                        },
                        function (err) {
                            console.log(err);
                        }
                    )
                }
            },
            addOrUpdate() {
                if(this.subject.name!==""){
                    // 判断修改还是添加
                    // 根据teacher是否有id
                    if (this.subject.id==="") {
                        console.log("add")
                        // 添加
                        this.addSubject()
                    } else {
                        console.log("update")
                        // 修改
                        this.updateSubject()
                    }
                }
                else{
                    alert("请检查信息填写是否正确")
                }
            },
            addSubject(){
                let config = {
                    headers:{'Content-Type': 'application/json','token':localStorage.getItem("token")}
                };
                let that = this
                // this.$http.post(that.GLOBAL.API_ROOT + "/api/add_image",formData,config)
                axios.put(that.GLOBAL.API_ROOT+ "/api/eduSubject/addSubject",that.subject,config).then(response => { // 添加成功
                        console.log('res=',response)
                        if(response.data.code === 200){
                            alert("成功")
                            // 回到列表页面 路由跳转
                            this.$router.push({ path: '/subject_list' })
                        }
                        else {
                            alert("失败")
                        }
                    },
                    err=>{
                        console.log(err)
                        alert("添加失败")
                    }
                )
            },
            updateSubject(){
                let config = {
                    // contentType: “application/json”,
                    headers:{'Content-Type': 'application/json','token':localStorage.getItem("token")}
                };
                let that = this
                axios.put(this.GLOBAL.API_ROOT+"/api/eduSubject/updateSubject",that.subject,config)
                    .then(response => {
                        console.log(response)
                        // 提示信息
                        if(response.data.message==="成功"){
                            alert("修改成功")
                        }
                        else{
                            alert("修改失败")
                        }
                        // 回到列表页面 路由跳转
                        // this.$router.push({ path: '/teacher_list' })
                    })
            }
        },
        watch:{
            parentCid(val, oldVal)
            {//普通的watch监听
                console.log("a: " + val, oldVal);
                this.getPcname()
            }
        }
    }
</script>

<style scoped>

</style>
