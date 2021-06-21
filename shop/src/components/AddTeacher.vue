<template>
    <div class="container-fluid">

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <ul class="nav nav-tabs page-tabs">
                        <li class="active"> <a href="#!">基本</a> </li>
                        <li> <a href="lyear-config-system.html">系统</a> </li>
                        <li> <a href="lyear-config-upload.html">上传</a> </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active">
<!--                            <th>姓名</th>-->
<!--                            <th>电话</th>-->
<!--                            <th>简介</th>-->
<!--                            <th>教育经历</th>-->
<!--                            <th>头像</th>-->

<!--                            <th>等级</th>-->
<!--                            <th>创建时间</th>-->
<!--                            <th>上次修改时间</th>-->
<!--                            <th>排序</th>-->
                            <form method="post" name="edit-form" class="edit-form">
                                <div class="form-group">
                                    <label for="name">讲师名称</label>
                                    <input class="form-control" type="text" name="name" id="name" v-model="teacher.name" placeholder="请输入姓名" >
                                </div>
                                <div class="form-group">
                                    <label for="tel">电话</label>
                                    <input class="form-control" type="text" name="tel" id="tel" v-model="teacher.tel" placeholder="请输入电话" />
                                </div>
                                <div class="form-group">
                                    <label for="tel">电话</label>
                                    <div class="input-group">
                                        <input class="form-control" type="text" name="tel" id="tel2" v-model="tel" placeholder="请输入姓名" />
                                        <!--                                        <div class="input-group-btn"><button class="btn btn-default" type="button">上传图片</button></div>-->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="web_site_keywords">站点关键词</label>
                                    <input class="form-control" type="text" id="web_site_keywords" name="web_site_keywords" value="后台系统模板,LightYear Admin Template,html模板,后台模板,管理系统模板" placeholder="请输入站点关键词" >
                                    <small class="help-block">网站搜索引擎关键字</small>
                                </div>
                                <div class="form-group">
                                    <label for="web_site_description">站点描述</label>
                                    <textarea class="form-control" id="web_site_description" rows="5" name="web_site_description" placeholder="请输入站点描述" >光年(Light Year Admin)后台管理系统模板是一个基于基于Bootstrap v3.3.7的纯HTML模板。</textarea>
                                    <small class="help-block">网站描述，有利于搜索引擎抓取相关信息</small>
                                </div>
                                <div class="form-group">
                                    <label for="web_site_copyright">版权信息</label>
                                    <input class="form-control" type="text" id="web_site_copyright" name="web_site_copyright" value="" placeholder="请输入版权信息" >
                                    <small class="help-block">调用方式：<code>config('web_site_copyright')</code></small>
                                </div>
                                <div class="form-group">
                                    <label for="web_site_icp">备案信息</label>
                                    <input class="form-control" type="text" id="web_site_icp" name="web_site_icp" value="" placeholder="请输入备案信息" >
                                    <small class="help-block">调用方式：<code>config('web_site_icp')</code></small>
                                </div>
                                <div class="form-group">
                                    <label class="btn-block" for="web_site_status">站点开关</label>
                                    <label class="lyear-switch switch-solid switch-primary">
                                        <input type="checkbox" checked="">
                                        <span></span>
                                    </label>
                                    <small class="help-block">站点关闭后将不能访问，后台可正常登录</small>
                                </div>
                                <div class="form-group">
                                    <button @click="submit" class="btn btn-primary m-r-5">确 定</button>
                                    <button type="button" class="btn btn-default" onclick="javascript:history.back(-1);return false;">返 回</button>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "AddTeacher",
        data(){
            return{
                teacher:{
                    name: "",
                    tel:"",
                    intro:"",
                    career:"",
                    avatar:"",
                    level:"",

                    //     <td>{{item.gmtCreate}}</td>
                    //     <td>{{item.gmtModified}}</td>
                    //     <td>
                    //     <select :id="item.id" @change="changeOrder" v-model="item.sort">
                    //         <option v-for="index of 50" :value="index" :key="index">{{index}}</option>
                    //     </select>
                    //     </td>
                    //     <td>
                    //     <div class="btn-group">
                    //         <a class="btn btn-xs btn-default" @click="goAdd(item.id)" title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>
                    //     <!--                                                    <a class="btn btn-xs btn-default" href="#!" title="查看" data-toggle="tooltip"><i class="mdi mdi-eye"></i></a>-->
                    //     <a class="btn btn-xs btn-default" @click="deleteById(item)" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a>
                    //     </div>
                    //     </td>
                }
            }
        },
        methods:{
            submit(){

            }
        }
    }
</script>

<style scoped>

</style>