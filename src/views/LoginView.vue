---Login.vue 元件檔---
<template>
  <div class="login-bg">
    <div class="container">
      <div class="login-widget">
        <div class="toplogo">
          <img src="../assets/img/ilogo.png" alt="臺中清潔車車輛管理" />
        </div>
        <div class="login-form">
          <div class="form-group text-left">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text btn-round"
                  ><i class="far fa-user"></i
                ></span>
              </div>
              <input
                v-model="account"
                class="form-control btn-round"
                placeholder="請輸入帳號"
                type="text"
              />
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text btn-round"
                  ><i class="fa fa-lock"></i
                ></span>
              </div>
              <input
                v-model="password"
                class="form-control btn-round"
                placeholder="請輸入密碼"
                type="password"
              />
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text btn-round"
                  ><i class="fas fa-fingerprint"></i
                ></span>
              </div>
              <input
                v-model="captchatxt"
                type="text"
                class="form-control btn-round"
                placeholder="請輸入驗証碼"
                size="10"
              />
              <img
                :src="captchaUrl"
                alt="驗證碼"
                width="100"
                @click="RefreshCaptcha"
              />
            </div>
          </div>
          <div class="text-center">
            <a href="#" class="btn btn-dark"
              ><i class="fas fa-question-circle"></i> 忘記密碼</a
            >
            <a @click="Login" class="btn btn-primary ml-6">登入</a>
            <p>請輸入帳號密碼，有任何問題請聯絡資訊人員</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-bg {
  background: url("../assets/img/loginbg.png") right/cover no-repeat fixed
    #fbfbfb;
  width: 100%;
  height: 100vh;
}

.login-bg .container {
  width: 380px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -190px;
  color: #474951;
}

.login-bg .toplogo {
  background: #7a868f;
  border-radius: 10px 10px 0 0;
}

.login-bg .toplogo img {
  margin: 15px 0;
  max-width: 310px;
  width: 100%;
}
.ml-6 {
  margin-left: 6px;
}
.login-form {
  padding: 20px 30px;
}

.login-form .spansy1 {
  margin-top: 10px;
  margin-left: 5px;
  text-align: left;
}
.login-form .input-group {
  margin-bottom: 8px;
}

.login-form .input-group-prepend span {
  padding: 10px;
  margin-right: 10px;
  font-size: 1.3em;
}

.login-widget {
  background-color: rgba(255, 255, 255, 0.6);
  width: 350px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 1px 1px 5px 1px rgba(10, 10, 10, 0.2);
  border-radius: 10px;
}

.dropdown-menu,
input {
  background-color: #fff;
}

.login-widget h3 {
  font-size: 1.6em;
  margin-top: 0.5em;
  padding-bottom: 0.4em;
  border-bottom: 2px dashed #f7d1b8;
  color: #ed7d31;
}

.login-widget p {
  margin: 0.4em 0;
}

.login-widget .form-control {
  height: auto;
  padding: 6px 20px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 0;
}

.login-widget .input-group-text {
  border: #a99985;
  background: #a99985;
  color: #fff;
}

.login-widget .btn {
  padding: 8px 30px !important;
  font-size: 18px;
}

.login-widget a {
  color: #474951;
}

.login-widget .form-check-label {
  color: #474951 !important;
}
</style>

<script>
export default {
  data() {
    return {
      // 驗證碼URL
      captchaUrl: `${this.$apiBaseUrl}Captcha`,
      captchatxt: "",
      password: "",
      account: "",
    };
  },
  methods: {
    // 刷新驗證碼
    RefreshCaptcha() {
      // 通過改變URL的query參數來刷新驗證碼
      this.captchaUrl = `${this.$apiBaseUrl}Captcha?_t=${Date.now()}`;
    },
    Login() {
      const data = {
        Captcha: this.captchatxt,
        Username: this.account,
        Password: this.password,
      };
      this.axios
        .post(this.$apiBaseUrl + "Login", data)
        .then((response) => {
          this.$store.commit("UserChk", response.data);
          this.$showAlertThen("登入成功", "success", () => {
            this.$router.push({ name: "cog1" });
          });
        })
        .catch((error) => {
          this.$store.commit("UserChkNone");
          if (error.response.status === 400 || error.response.status === 401) {
            this.$swal.fire({
              text: error.response.data,
              icon: "error",
              confirmButtonText: "確定",
              confirmButtonColor: "#3085d6",
            });
          } else {
            console.log(error);
            // 處理錯誤
          }
          this.refreshCaptcha();
          this.captchatxt = "";
          this.account = "";
          this.password = "";
        });
    },
  },
};
</script>
