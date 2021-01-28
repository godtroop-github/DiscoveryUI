import request from 'umi-request';

// 校验策略的条件表达式
export async function validateExpression(params) {
  return request('/console/validate-expression', {
    method: 'GET',
    params: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}