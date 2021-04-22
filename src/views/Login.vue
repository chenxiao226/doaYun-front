<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!--登录表单区域--->
      <a-form class="login_form" :form="form" @submit="handleSubmit">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <!--选择登录方式区域--->
          <a-radio-group
            default-value="horizontal"
            @change="handleFormLayoutChange"
          >
            <a-radio-button
              value="horizontal"
              @click="() => (this.codeLogin = false)"
            >
              账号登录
            </a-radio-button>
            <a-radio-button
              value="vertical"
              @click="() => (this.codeLogin = true)"
            >
              手机登录
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <!--用户输入区域--->

        <a-form-item>
          <!---输入手机号或者账号--->
          <a-input
            v-decorator="[
              this.codeLogin ? 'phone' : 'username',
              {
                rules: [
                  {
                    required: true,
                    message: this.codeLogin ? '请输入手机号' : '请输入账号',
                  },
                ],
              },
            ]"
            :placeholder="this.codeLogin ? '手机号' : '账号'"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <!---输入验证码或者密码--->
        <a-form-item class="">
          <a-input
            v-decorator="[
              this.codeLogin ? 'code' : 'password',
              {
                rules: [
                  {
                    required: this.codeLogin ? false : true,
                    message: this.codeLogin ? '请输入验证码' : '请输入密码',
                  },
                ],
              },
            ]"
            :type="this.codeLogin ? 'text' : 'password'"
            :placeholder="this.codeLogin ? '验证码' : '密码'"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
          <a-button type="primary" v-if="this.codeLogin" @click="sendCode"
            >验证码</a-button
          >
        </a-form-item>
        <!---记住账号选择区域--->
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            记住我
          </a-checkbox>
        </a-form-item>
        <!---忘记密码跳转区域-->

        <a class="login-form-forgot"> 忘记密码 </a>
        <!---按钮区域-->
        <a-button type="primary" class="btns" html-type="submit">登录</a-button>

        <a-button
          type="primary"
          class="btns"
          @click="() => this.$router.push('/register')"
        >
          注册
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  sendCodeByPhone,
  loginByUsernameAndPassword,
  loginByPhoneAndCode,
} from "../api/login";
import { setToken } from "../utils/auth";

export default {
  data() {
    return {
      formLayout: "horizontal",
      codeLogin: false,
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },

  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.codeLogin) {
            loginByPhoneAndCode(values.phone, values.code).then((res) => {
              console.log("手机验证码登录成功");
              console.log(res);
              if (res.code === 0) {
                const token = res.token;
                setToken(token, values.remember);
              } else {
                //提示错误信息
                this.$notification.open({
                  message: "错误",
                  description: "手机验证码登录失败！",
                  style: {
                    width: "600px",
                    marginLeft: `${335 - 600}px`,
                  },
                });
              }
            });
          } else {
            loginByUsernameAndPassword(values.username, values.password).then(
              (res) => {
                console.log(res);
                if (res.code === 0) {
                  const { token } = res;
                  setToken(token, values.remember);
                } else {
                  //提示错误信息
                  this.$notification.open({
                    message: "错误",
                    description: "账户名登录失败！",
                    style: {
                      width: "600px",
                      marginLeft: `${335 - 600}px`,
                    },
                  });
                }
              }
            );
          }
        }
      });
    },
    sendCode() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          sendCodeByPhone(values.phone).then((res) => {
            if (res.code === 0) {
              this.$notification.open({
                message: "提示",
                description: "验证码已发送！",
                style: {
                  width: "600px",
                  marginLeft: `${335 - 600}px`,
                },
              });
            } else {
              this.$notification.open({
                message: "错误",
                description: "验证码发送失败！",
                style: {
                  width: "600px",
                  marginLeft: `${335 - 600}px`,
                },
              });
            }
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
#components-form-demo-normal-login {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login {
  width: 100%;
}
#components-form-demo-normal-login {
  width: 100%;
}
</style>