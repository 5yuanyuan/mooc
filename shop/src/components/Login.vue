<template>
  <div class="row lyear-wrapper" style="background-image: url(static/images/login-bg-3.jpg); background-size: cover;">
    <div class="lyear-login">
      <div class="login-center">
        <div class="login-header text-center">
          <a href="index.html"> <img alt="light year admin" src="static/images/logo-sidebar.png"> </a>
        </div>
        <form action="#!" method="post">
          <div class="alert alert-warning" role="alert" v-if="message">{{ message }}</div>
          <div class="form-group has-feedback feedback-left">
            <input type="text" name="username" placeholder="请输入您的用户名" class="form-control" v-model="username"/>
            <span class="mdi mdi-account form-control-feedback" aria-hidden="true"></span>
          </div>
          <div class="form-group has-feedback feedback-left">
            <input type="password" name="password" placeholder="请输入密码" class="form-control" v-model="password"/>
            <span class="mdi mdi-lock form-control-feedback" aria-hidden="true"></span>
          </div>
          <div class="form-group">
            <label class="lyear-checkbox checkbox-primary m-t-10 text-white">
              <input type="checkbox"><span>5天内自动登录</span>
            </label>
          </div>
          <div class="form-group">
            <button class="btn btn-block btn-primary" type="button" @click="login">立即登录</button>
          </div>
        </form>
        <footer class="col-sm-12 text-center text-white">
          <p class="m-b-0">Copyright © 2021 <a href="http://www.baidu.com">miniclass</a>. All right reserved</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      message: ""
    }
  },
  methods: {
    login: function () {
      let token = ""
      var that = this
      axios.post(that.GLOBAL.API_ROOT + '/login', qs.stringify({
        "userName": that.username,
        "password": that.password
      })).then(res => {
        // console.log(res.data)
        if (res.data.status == "OK") {
          token = res.data.token
          localStorage.setItem("token", token)
          that.message = ""
          that.$router.push('/')
        } else {
          that.message = "login error!"
        }
      })
    }
  }
}
</script>

<style>
.lyear-wrapper {
  position: relative;
}

.lyear-login {
  display: flex !important;
  min-height: 100vh;
  align-items: center !important;
  justify-content: center !important;
}

.lyear-login:after {
  content: '';
  min-height: inherit;
  font-size: 0;
}

.login-center {
  background-color: rgba(255, 255, 255, .075);
  min-width: 29.25rem;
  padding: 2.14286em 3.57143em;
  border-radius: 3px;
  margin: 2.85714em;
}

.login-header {
  margin-bottom: 1.5rem !important;
}

.login-center .has-feedback.feedback-left .form-control {
  padding-left: 38px;
  padding-right: 12px;
  background-color: rgba(255, 255, 255, .075);
  border-color: rgba(255, 255, 255, .075)
}

.login-center .has-feedback.feedback-left .form-control-feedback {
  left: 0;
  right: auto;
  width: 38px;
  height: 38px;
  line-height: 38px;
  z-index: 4;
  color: #dcdcdc;
}

.login-center .has-feedback.feedback-left.row .form-control-feedback {
  left: 15px;
}

.login-center .form-control::-webkit-input-placeholder {
  color: rgba(255, 255, 255, .8);
}

.login-center .form-control:-moz-placeholder {
  color: rgba(255, 255, 255, .8);
}

.login-center .form-control::-moz-placeholder {
  color: rgba(255, 255, 255, .8);
}

.login-center .form-control:-ms-input-placeholder {
  color: rgba(255, 255, 255, .8);
}

.login-center .custom-control-label::before {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 0, 0, 0.1);
}

.login-center .lyear-checkbox span::before {
  border-color: rgba(255, 255, 255, .075)
}
</style>
