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
                            <a class="btn btn-xs btn-primary m-r-5"><i class="mdi mdi-window-close"></i>删除</a>
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
                                <a class="btn btn-xxs btn-cyan m-r-5"><i class="mdi mdi-window-close"></i></a>
                            </div>
                        </span>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "SubjectList",
        data(){
            return{
                List:[{
                    id:1
                },{
                    id:2
                },{
                    id:3
                }]
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
        border:0px
    }
</style>
