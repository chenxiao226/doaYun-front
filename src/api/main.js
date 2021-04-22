import { request } from "../utils/request";
//登出(已改)
export const logOut = function() {
  return request({
    method: "get",
    url: `/user/logout`,
  });
};