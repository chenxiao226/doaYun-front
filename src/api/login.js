import { request } from "../utils/request";
//账号登录（已改）
export const loginByUsernameAndPassword = function(username, password) {
  return request({
    method: "post",
    url: `/user/login?password=${password}&userName=${username}`
  });
};
//手机验证码登录(已改)
export const loginByPhoneAndCode = function (phone, code) {
  return request({
    method: "post",
    url: `/user/loginMess?phone=${phone}&code=${code}`
  })
}
//发送验证码（已改）
export const sendCodeByPhone = function (phone) {
  return request({
    method: "post",
    url: `/mobileCode?phone=${phone}`
  })
}
