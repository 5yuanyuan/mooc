<template>
  <div class="lyear-layout-web" id="app">
    <div class="lyear-layout-container">
      <!--左侧导航-->
      <aside class="lyear-layout-sidebar">

        <!-- logo -->
        <div id="logo" class="sidebar-header">
          <a href="index.html"><img src="static/images/logo-sidebar.png" title="LightYear" alt="LightYear"/></a>
        </div>
        <div class="lyear-layout-sidebar-scroll">

          <nav class="sidebar-main">
            <ul class="nav nav-drawer">
              <li class="nav-item">
                <router-link to="/report">
                  <i class="mdi mdi-home"></i>
                  首页
                </router-link>
              </li>
              <li class="nav-item nav-item-has-subnav active open">
                <a href="javascript:void(0)" data-toggle="dropdown"><i class="mdi mdi-file-outline"></i> 首页管理</a>
                <ul class="nav nav-subnav">
                  <li>
                    <router-link to="/banner_list">轮播图管理</router-link>
                  </li>
                  <li>
                    <router-link to="/excellent_courses">热门管理</router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item nav-item-has-subnav active open">
                <a href="javascript:void(0)" data-toggle="dropdown"><i class="mdi mdi-file-outline"></i> 课程管理</a>
                <ul class="nav nav-subnav">
                  <li>
                    <router-link to="/excellent_courses">课程管理</router-link>
                  </li>
                  <li>
                    <router-link to="/subject_list">课程归类管理</router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item nav-item-has-subnav active open">
                <a href="javascript:void(0)" data-toggle="dropdown"><i class="mdi mdi-file-outline"></i> 教师管理</a>
                <ul class="nav nav-subnav">
                  <li>
                    <router-link to="/teacher_list">教师管理</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div class="sidebar-footer">
            <p class="copyright">Copyright &copy; 2021. <a target="_blank" href="#">miniclass</a> All
              rights reserved.</p>
          </div>
        </div>
      </aside>
      <!--End 左侧导航-->

      <!--头部信息-->
      <header class="lyear-layout-header">
        <nav class="navbar navbar-default">
          <div class="topbar">
            <div class="topbar-left">
              <div class="lyear-aside-toggler">
                <span class="lyear-toggler-bar"></span>
                <span class="lyear-toggler-bar"></span>
                <span class="lyear-toggler-bar"></span>
              </div>
              <span class="navbar-page-title"> {{title}} </span>
            </div>
            <ul class="topbar-right">
              <li class="dropdown dropdown-profile">
                <a href="javascript:void(0)" data-toggle="dropdown">
                  <img class="img-avatar img-avatar-48 m-r-10" src="static/images/users/avatar.jpg" alt="admin"/>
                  <span>admin<span class="caret"></span></span>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="lyear_pages_profile.html"><i class="mdi mdi-account"></i> 个人信息</a></li>
                  <li><a href="lyear_pages_edit_pwd.html"><i class="mdi mdi-lock-outline"></i> 修改密码</a></li>
                  <li><a href="javascript:void(0)"><i class="mdi mdi-delete"></i> 清空缓存</a></li>
                  <li class="divider"></li>
                  <li><a href="lyear_pages_login.html"><i class="mdi mdi-logout-variant"></i> 退出登录</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <!--End 头部信息-->

      <!--页面主要内容-->
      <main class="lyear-layout-content">
        <router-view name="content"/>
      </main>
      <!--End 页面主要内容-->
    </div>
  </div>
</template>

<script>

export default {
  name: 'Layout',
  provide(){
    return{
      changeTitle:this.changeTitle
    }
  },
  data(){
    return{
      title:''
    }
  },
  methods:{
    changeTitle(title){
      this.title = title
    }
  }
}
</script>
