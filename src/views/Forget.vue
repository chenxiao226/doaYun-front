<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="手机号">
      <a-input
        v-decorator="[
          'phone',
          {
            rules: [{ message: '请输入11位手机号！' }],
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
                message: '请输入验证码！',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <a-button type="primary" @click="sendCode">获取验证码</a-button>
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
    <a-form-item v-bind="tailFormItemLayout"> </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit"> 确认 </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { sendCodeByPhone, forgetByPhone } from "../api/forget";

export default {
  data() {
    return {
      confirmDirty: false,

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
          forgetByPhone(values.phone, values.password, values.code).then(
            (res) => {
              console.log(res);
              if (res.code === 0) {
                const { token } = res;
                setToken(token, values.remember);
              } else {
                //提示错误信息
                this.$notification.open({
                  message: "错误",
                  description:
                    "找回密码失败！",
                  style: {
                    width: "600px",
                    marginLeft: `${335 - 600}px`,
                  },
                });
              }
            }
          );
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
        callback(" 两次密码不一致！");
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
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map(
          (domain) => `${value}${domain}`
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    },
    sendCode() {
      // console.log(1111);
      this.form.validateFields((err, values) => {
        if (!err) {
          sendCodeByPhone(values.phone).then((res) => {
            if (res.code === 0) {
            } else {
            }
          });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>