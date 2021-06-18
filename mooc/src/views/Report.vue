<template>
    <div>hello</div>
    <div class="card-body" style="width: 600px;height: 600px;" id="incomeReport">
        <!--                            <canvas class="js-chartjs-bars"></canvas>-->
    </div>
</template>

<script>
    export default {
        name: "Report",
        methods:{
            showIncomeReport:function () {
                let incomeReportChart = this.echarts.init(document.getElementById('incomeReport'))

                let option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }]
                };
                incomeReportChart.setOption(option)
            },
        },
        mounted() {
            this.showIncomeReport()
        }
    }
</script>

<style scoped>

</style>