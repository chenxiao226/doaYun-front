<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="邮箱">
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '请输入正确的邮箱地址!',
              },
              {
                message: '邮箱',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="工号或学号">
      <a-input
        v-decorator="[
          'studentNumber',
          {
            rules: [
              {
                message: '请输入工号或学号',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="学校">
      <a-input
        v-decorator="[
          'University',
          {
            rules: [
              {
                message: '请输入学校',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="专业">
      <a-input
        v-decorator="[
          'profession',
          {
            rules: [
              {
                message: '请输入专业',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                message: '请输入密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
      <a-input
        v-decorator="[
          'ConfirmPassword',
          {
            rules: [
              {
                message: '两次密码不一致!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>

    <a-form-item v-bind="formItemLayout" label="手机号">
      <a-input
        v-decorator="[
          'phone',
          {
            rules: [{ message: '请输入11位手机号' }],
          },
        ]"
        style="width: 100%"
      >
        <a-select
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '86' }]"
          style="width: 70px"
        >
          <a-select-option value="86"> +86 </a-select-option>
          <a-select-option value="87"> +87 </a-select-option>
        </a-select>
      </a-input>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="验证码">
      <a-input
        v-decorator="[
          'codeNumber',
          {
            rules: [
              {
                message: '请输入验证码',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <a-button type="primary" @click="sendCode">获取验证码</a-button>
    </a-form-item>

    <a-form-item v-bind="tailFormItemLayout">
      <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
        I have read the
        <a href=""> agreement </a>
      </a-checkbox>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit"> Register </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
import { sendCodeByPhone, registerByPhone } from "../api/register";

export default {
  data() {
    return {
      confirmDirty: false,
      residences,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          //调用注册方法
          registerByPhone(values.password, values.phone).then((res) => {
            console.log(res);
            if (res.code === 0) {
              console.log("注册成功");
              const { token } = res;
              setToken(token, values.password, values.phone);
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
          //注册失败
          this.$notification.open({
            message: "错误",
            description: "注册失败！",
            style: {
              width: "600px",
              marginLeft: `${335 - 600}px`,
            },
          });
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },

    sendCode() {
      this.form.validateFields((err, values) => {
        if (!err) {
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
<style scoped>
.codenumber {
  position: absolute;
  float: right;
}
</style>