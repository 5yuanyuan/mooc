<template>
    <div>
        <div class="panel-group" id="accordion">
            <div class="panel panel-default" v-for="item in List" :key="item.id">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" class="col-md-10"
                           :href="`#${item.id}`">
                            {{item.name}}
                        </a>
                        <div class="btn-group ">
<!--                            <a class="btn btn-xs btn-primary m-r-5"><i class="mdi mdi-plus"></i> 新增</a>-->
                            <a class="btn btn-xs btn-primary m-r-5" @click="GotoAdd(item.id)"><i class="mdi mdi-pencil"></i>编辑</a>
                            <a class="btn btn-xs btn-primary m-r-5" @click="deleteSubject(item.id)"><i class="mdi mdi-window-close"></i>删除</a>
                        </div>
                    </h4>
                </div>
                <div :id="item.id" class="panel-collapse collapse">
                    <div class="panel-body">
                        <span class="label label-outline-primary" v-for="subject in item.children" :key="subject.id">
                            {{subject.name}}
                            <div class="btn-group ">
    <!--                            <a class="btn btn-xs btn-primary m-r-5"><i class="mdi mdi-plus"></i> 新增</a>-->
                                <a class="btn btn-xxs btn-cyan m-r-5" @click="GotoAdd(subject.id)"><i class="mdi mdi-pencil"></i></a>
                                <a class="btn btn-xxs btn-cyan m-r-5" @click="deleteSubject(subject.id)"><i class="mdi mdi-window-close"></i></a>
                            </div>
                        </span>

                    </div>
                </div>
            </div>
        </div>
        <div class="side-bar">
            <a @click="GotoAdd()" class="icon-qq"></a>
        </div>
    </div>

</template>

<script>
    import axios from "axios";
    export default {
        name: "SubjectList",
        data(){
            return{
                List:[],
                subject:{
                    id: "",
                    name: "",
                    parentCid: "",
                    catLevel: null,
                    showStatus: null,
                    sort: null,
                    gmtCreate: 1608304695000,
                    gmtModified: 1608304695000,
                    children: null,
                },
            }
        },
        methods:{
            getSubjectList:function () {
                let config = {
                    headers:{'token':localStorage.getItem("token")}
                };
                var that = this;
                axios.get(that.GLOBAL.API_ROOT + '/api/eduSubject/getSubject/list',config).then(response=>{
                    console.log(response.data);
                    that.List=response.data.data
                })
            },
            GotoAdd:function(id){
                if(id === undefined){
                    this.$router.push({path:"/add_subject"})
                }else{
                    this.$router.push({path:"/add_subject",query:{id:id}})
                }
            },
            deleteSubject:function (id) {
                var that = this
                axios.get(that.GLOBAL.API_ROOT + "/api/eduSubject/getSubject/"+id).then(
                    function (response) {
                        // console.log(response.data.data.subject);
                        that.subject = response.data.data.subject;
                        that.subject.showStatus = 0;
                        that.updateSubject();
                        that.getSubjectList();

                    },
                    function (err) {
                        console.log(err);
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
        mounted() {
            this.getSubjectList();
        }
    }
</script>

<style scoped>
    .btn-group-xxs>.btn,
    .btn-xxs {
        font-size: 12px;
        padding: 2px 6px;
        line-height: 10px;
    }
    span{
        border:0
    }

    .side-bar { border-radius:33px ;width: 66px;position: fixed;bottom: 20px;right: 25px;font-size: 0;line-height: 0;z-index: 100; background-color: #ddd;}
    .side-bar a { border-radius:33px; width: 66px;height: 66px;display: inline-block;margin-bottom: 2px;background: url("../../public/static/images2/add.png");background-size:cover;}
    .side-bar a:hover {background-color: #669fdd;}
    .side-bar .icon-qq {background-position: 0 -62px;}
    .side-bar .icon-chat:hover .chat-tips {display: block;}
    .chat-tips i {width: 9px;height: 16px;display: inline-block;position: absolute;right: -9px;top: 80px;background-position:-88px -350px;}
    .chat-tips img {width: 138px;height: 138px;}
</style>
