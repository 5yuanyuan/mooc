<script>
// 定义一些公共的属性和方法
const API_ROOT = "http://localhost:8002"

function commonFun() {
  console.log("公共方法")
}
// 暴露出这些属性和方法
export default {
  API_ROOT,
  commonFun
}

</script>
