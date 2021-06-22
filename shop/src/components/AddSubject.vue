<template>
    <div class="container-fluid" >
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="tab-content">
                        <div class="form-group">
                            <label for="name">课程名称*</label>
                            <input class="form-control" type="text" name="name" id="name" v-model="subject.name" placeholder="请输入课程名" >
                            <label for="parentCid">父元素ID</label>
                            <input class="form-control" type="text" name="parentCid" id="parentCid" v-model="subject.parentCid" placeholder="请输入父元素的id">


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "AddSubject",
        data(){
            return{
                subject:{
                    "id": "",
                    "name": "",
                    "parentCid": "",
                    "catLevel": null,
                    "showStatus": null,
                    "sort": null,
                    "gmtCreate": 1608304695000,
                    "gmtModified": 1608304695000,
                    "children": null
                }
            }
        },
        mounted() {
            if(this.$router.history.current.query.id){
                console.log(this.$router.history.current.query.id)
                this.getSubjectList(this.$router.history.current.query.id)
            }
        },
        methods:{
            getSubjectList:function (id) {
                var that = this
                axios.get(that.GLOBAL.API_ROOT + "/api/eduSubject/getSubject/"+id).then(
                    function (response) {
                        console.log(response.data.data.subject);
                        that.subject = response.data.data.subject;
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
