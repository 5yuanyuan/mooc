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
<!--                                        <th>简介</th>-->
<!--                                        <th>教育经历</th>-->
                                        <th>头像</th>
                                        <th>已购买课程</th>
<!--                                        <th>职称</th>-->
<!--                                        <th>创建时间</th>-->
<!--                                        <th>上次修改时间</th>-->
<!--                                        <th>等级</th>-->
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in List" :v-if="item.isDeleted===0" :key="item.id">
                                        <td>{{item.name}}</td>
                                        <td>{{item.tel}}</td>
                                        <td><img :src="`${item.avatar}?x-oss-process=image/resize,h_100,m_lfit`"/></td>
<!--                                        <td v-if="item.level===0">高级讲师</td>-->
<!--                                        <td v-if="item.level===1">首席讲师</td>-->
                                        <td>
                                            <div class="btn-group">
                                                <a class="btn btn-xs btn-default" @click="goAdd(item.id)" title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>
                                                <!--                                                    <a class="btn btn-xs btn-default" href="#!" title="查看" data-toggle="tooltip"><i class="mdi mdi-eye"></i></a>-->
<!--                                                <a class="btn btn-xs btn-default" @click="deleteById(item)" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a>-->
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
        data(){
            return{
                List:[],
            }
        },
        methods:{
            getMemberList:function () {
                let config = {
                    headers:{'token':localStorage.getItem("token")}
                };
                var that = this;
                axios.get(that.GLOBAL.API_ROOT + '/api/eduMember/findAll',config).then(response=>{
                    console.log(response.data);
                    that.List=response.data.data
                })
            },
        },
        mounted() {
            this.getMemberList();
        }
    }
</script>

<style scoped>

</style>
