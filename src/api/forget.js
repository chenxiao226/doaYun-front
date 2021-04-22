import { request } from "../utils/request";
//忘记密码 通过手机号改密码（已改）
export const forgetByPhone = function(phone, password, code) {
  return request({
    method: "put",
    url: `/user/loginInfo?checkPassword=${password}&code=${code}8&password=${password}&phone=${phone}`,
  });
};
//发送验证码（已改）
export const sendCodeByPhone = function(phone) {
  return request({
    method: "post",
    url: `/mobileCode?phone=${phone}`
  });
};
