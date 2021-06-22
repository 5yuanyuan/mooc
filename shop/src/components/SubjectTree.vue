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
    // import axios from 'axios'
    export default {
        name: "SubjectTree",
        data(){
          return{
              data:{
                  "name": "subject",
                  "children": [
                      {
                          "name": "analytics",
                          "children": [
                              {"name": "cluster",},
                              {"name": "graph",},
                              {"name": "optimization",}
                          ]
                      },
                      {
                          "name": "animate",
                          "children": [
                              {"name": "Easing", "value": 17010},
                              {"name": "FunctionSequence", "value": 5842},
                              {"name": "interpolate",},
                              {"name": "ISchedulable", "value": 1041},
                          ]
                      },
                      {
                          "name": "data",
                          "children": [
                              {"name": "converters",},
                              {"name": "DataField", "value": 1759},
                              {"name": "DataSchema", "value": 2165},
                              {"name": "DataSet", "value": 586},
                              {"name": "DataSource", "value": 3331},
                              {"name": "DataTable", "value": 772},
                              {"name": "DataUtil", "value": 3322}
                          ]
                      },
                      {
                          "name": "display",
                          "children": [
                              {"name": "DirtySprite", "value": 8833},
                              {"name": "LineSprite", "value": 1732},
                              {"name": "RectSprite", "value": 3623},
                              {"name": "TextSprite", "value": 10066}
                          ]
                      },
                      {
                          "name": "flex",
                          "children": [
                              {"name": "FlareVis", "value": 4116}
                          ]
                      },
                      {
                          "name": "physics",
                          "children": [
                              {"name": "DragForce", "value": 1082},
                              {"name": "GravityForce", "value": 1336},
                              {"name": "IForce", "value": 319},
                              {"name": "NBodyForce", "value": 10498},
                              {"name": "Particle", "value": 2822},
                              {"name": "Simulation", "value": 9983},
                              {"name": "Spring", "value": 2213},
                              {"name": "SpringForce", "value": 1681}
                          ]
                      },
                      {
                          "name": "query",
                          "children": [
                              {"name": "AggregateExpression", "value": 1616},
                              {"name": "And", "value": 1027},
                              {"name": "Arithmetic", "value": 3891},
                              {"name": "Average", "value": 891},
                              {"name": "BinaryExpression", "value": 2893},
                          ]
                      },
                      {
                          "name": "scale",
                          "children": [
                              {"name": "IScaleMap", "value": 2105},
                              {"name": "LinearScale", "value": 1316},
                          ]
                      },
                      {
                          "name": "util",
                          "children": [
                              {"name": "Arrays", "value": 8258},
                              {"name": "Colors", "value": 10001},
                          ]
                      },
                      {
                          "name": "vis",
                          "children": [
                              {"name": "axis",},
                              {"name": "controls",},
                              {"name": "data",},
                              {"name": "events",},
                              {"name": "legend",},
                              {"name": "operator",},
                              {"name": "Visualization", "value": 16540}
                          ]
                      }
                  ]
              }

          }
        },
        methods:{
            getData:function(){

            },
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
            }
        },
        mounted() {
            this.subjectTree()
        }
    }
</script>

<style scoped>

</style>
