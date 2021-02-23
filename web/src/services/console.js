import request from 'umi-request';

// 获取服务组名列表
export async function groups() {
  return request('/console/groups', {
    method: 'GET'
  });
}
export async function instanceMap(params) {
  return request(`/console/instance-map`, {
    method: 'POST',
    data: params
  });
}
// 获取真实的服务列表(排除了网关的)
export async function getRealServices() {
  const services = await getServices()
  const gateways = await getGateways()
  const realServices = services.filter(service => !gateways.some(gateway => gateway == service))
  return realServices
}
// 获取所有服务实例
export async function getServices() {
  return request(`/console/services`, {
    method: 'GET'
  });
}
// 获取网关列表
export async function getGateways() {
  return request(`/console/gateways`, {
    method: 'GET'
  });
}
// 获取实例列表
export async function getInstances(serviceId) {
  return request(`/console/instances/${serviceId}`, {
    method: 'GET'
  });
}
// 校验策略的条件表达式
export async function validateExpression(params) {
  return request('/console/validate-expression', {
    method: 'GET',
    params: params,
  });
}