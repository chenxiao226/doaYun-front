import { request } from "../utils/request";
//注册用户（新增用户）(已改)
export const registerByPhone = function(password, phone) {
  return request({
    method: "post",
    url: `/user/user?password=${password}&phone=${phone}`,
  });
};
//发送手机验证码（已改）
export const sendCodeByPhone = function(phone) {
  return request({
    method: "post",
    url: `/mobileCode?phone=${phone}`,
  });
};
