<template>
    <div>
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
                                            姓名 <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li> <a tabindex="-1" href="javascript:void(0)" data-field="title">姓名</a> </li>
                                            <li> <a tabindex="-1" href="javascript:void(0)" data-field="cat_name">电话</a> </li>
                                        </ul>
                                    </div>
                                    <input type="text" class="form-control" value="" name="keyword" placeholder="请输入">
                                </div>
                            </form>
                            <div class="toolbar-btn-action">
                                <a class="btn btn-primary m-r-5" @click="goAdd()"><i class="mdi mdi-plus"></i> 新增</a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" style="table-layout: fixed;word-break: break-all;">
                                    <thead>
                                    <tr>
                                        <th>姓名</th>
                                        <th>电话</th>
                                        <th>简介</th>
                                        <th>教育经历</th>
                                        <th>头像</th>

                                        <th>等级</th>
                                        <th>创建时间</th>
                                        <th>上次修改时间</th>
                                        <th>排序</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in teacherlist" :v-if="item.isDeleted===0" :key="item.id">
                                        <td>{{item.name}}</td>
                                        <td>{{item.tel}}</td>
                                        <td>{{item.intro}}</td>
                                        <td>{{item.career}}</td>
                                        <td><img :src="`${item.avatar}?x-oss-process=image/resize,h_100,m_lfit`"/></td>
                                        <td>{{item.level}}</td>
                                        <td>{{item.gmtCreate}}</td>
                                        <td>{{item.gmtModified}}</td>
                                        <td>
                                            <select :id="item.id" @change="changeOrder" v-model="item.sort">
                                                <option v-for="index of 50" :value="index" :key="index">{{index}}</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <a class="btn btn-xs btn-default" @click="goAdd(item.id)" title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>
                                                <!--                                                    <a class="btn btn-xs btn-default" href="#!" title="查看" data-toggle="tooltip"><i class="mdi mdi-eye"></i></a>-->
                                                <a class="btn btn-xs btn-default" @click="deleteById(item)" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a>
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
    export default {
        name: "TeacherList",
        data(){
            return{
                teacherlist:[

                ]
            }
        },
        mounted() {
            this.loadTeachers()
        },
        methods:{
            loadTeachers:function () {
                var that = this;
                localStorage.setItem("token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaW5pY291cnNlLXVzZXIiLCJpYXQiOjE2MjQwNjc1MDIsImV4cCI6MTYyNDE1MzkwMiwiaWQiOiIxNDA2MDY3MDg4MzczOTg5Mzc3IiwibmFtZSI6IuS8muWRmDk1NmNkYyJ9.qfHoWx6zpRk---tozqQKa8hxuFUMWy0J1r2bmwgU7Ho")
                if(!localStorage.getItem("token")){
                    this.$router.push("/login")
                }else{
                    console.log(localStorage.getItem("token"));
                    // that.GLOBAL.API_ROOT
                    this.$http.get("http://localhost:8002" + "/api/eduTeacher/findAll", {params:{
                        },headers:{'token':localStorage.getItem("token")}
                    }).then(
                        function (response) {
                            that.teacherlist = response.data.data
                            console.log(response.data);
                            var i =0;
                            for (i=0;i<that.teacherlist.length;i++){
                                console.log(new Date(that.teacherlist[i].gmtCreate))
                                that.teacherlist[i].gmtCreate = new Date(that.teacherlist[i].gmtCreate)
                                that.teacherlist[i].gmtModified = new Date(that.teacherlist[i].gmtModified)
                            }
                        },
                        function (err) {
                            console.log(err);
                        }
                    )
                }
            },
            // eslint-disable-next-line no-unused-vars
            goAdd: function (id) {
                this.$router.push({name:"add_teacher"})
            },
            // eslint-disable-next-line no-unused-vars
            changeOrder:function (event) {
                // let productId = event.target.id;
                // let orderNum = event.tarhget.value;
                // var that = this
                // this.$http.post(that.GLOBAL.API_ROOT + "/api/change_product_order", qs.stringify({
                //     "productId": productId,
                //     "orderNum": orderNum
                // })).then(
                //     function (response) {
                //         console.log(response.data);
                //         that.loadProducts();
                //     },
                //     function (err) {
                //         console.log(err);
                //     }
                // )
            },
            deleteById:function (item) {
                let that =this
                console.log(item)
                that.$http.delete("http://localhost:8002" + "/api/eduTeacher/remove/"+item.id).then(
                    function () {
                        console.log('success to delete')
                        that.loadTeachers()
                    },
                    function (err) {
                        console.log(err);
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>