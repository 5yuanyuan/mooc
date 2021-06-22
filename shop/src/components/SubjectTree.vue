<template>
    <div class="row">
        <div class="col-lg-offset-1 col-lg-12">
            <div class="card col-lg-10">
                <div class="card-header">
                    <h4>课程分类</h4>
                </div>
                <div class="card-body" id="main" style="width: 700px; height: 600px">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
    import axios from "axios";
    // import axios from 'axios'
    export default {
        name: "SubjectTree",
        data(){
          return{
              List:[],
              tree:[],
              data:{
                  "name": "subject",
                  "children":this.tree,
              }
          }
        },
        methods:{
            subjectTree:function () {
                // var that = this
                var myChart = echarts.init(document.getElementById('main'));
                myChart.showLoading();
                // that.GLOBAL.API_ROOT
                myChart.hideLoading();
                this.data.children.forEach(function (datum, index) {
                    index % 2 === 0 && (datum.collapsed = true);
                });
                let option={
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'tree',

                            data: [this.data],

                            top: '1%',
                            left: '7%',
                            bottom: '1%',
                            right: '20%',

                            symbolSize: 7,

                            label: {
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 9
                            },

                            leaves: {
                                label: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            },

                            emphasis: {
                                focus: 'descendant'
                            },

                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                };
                myChart.setOption(option);
            },
            getSubjectList:function () {
                let config = {
                    headers:{'token':localStorage.getItem("token")}
                };
                var that = this;
                axios.get(that.GLOBAL.API_ROOT + '/api/eduSubject/getSubject/list',config).then(response=>{
                    console.log(response.data.data);
                    that.List=response.data.data
                    var l1 = that.List.length
                    var i =0;
                    for(i=0;i<l1;i++){
                        var node = {}
                        node.name = that.List[i].name;
                        node.children = []
                        var j=0;
                        var l2 = that.List[i].children.length
                        for(j=0;j<l2;j++){
                            node.children.push({"name":that.List[i].children[j].name})
                        }
                        this.tree.push(node)
                    }
                    console.log(that.tree)
                    that.data.children = that.tree
                    that.subjectTree()
                })
            },
        },
        mounted() {
            this.getSubjectList()
        }
    }
</script>

<style scoped>

</style>
