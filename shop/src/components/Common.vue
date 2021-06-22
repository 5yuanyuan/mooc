<script>
// 定义一些公共的属性和方法
// const API_ROOT = "http://localhost:8002"
// const API_ROOT = "http://10.7.189.92:8002"
const API_ROOT = "http://169.254.18.172:8002"
function commonFun() {
  console.log("公共方法")
}
// 暴露出这些属性和方法
export default {
  API_ROOT,
  commonFun
}
</script>
