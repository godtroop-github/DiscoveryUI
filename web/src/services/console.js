import request from 'umi-request';

// 获取服务组名列表
export async function groups() {
  return request('/console/groups', {
    method: 'GET'
  });
}

// 获取非域网关服务(列表)
export async function instanceMapNotArea(params) {
  const services = await getServices()
  const instanceMapRes = await instanceMap(params)
  services.forEach(element => {
    if (!instanceMapRes[element]) {
      instanceMapRes[element] = []
    }
  })
  return instanceMapRes
}

// 推送规则到配置中心
export async function remoteConfigUpdate(params) {
  let group = params.group
  let serviceId = params.serviceId
  let config = params.config
  return request(`/console/remote-config/update/${group}/${serviceId}`, {
    method: 'POST',
    data: config
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
// 获取远程配置中心配置规则
export async function remoteConfig(params) {
  let group = params.group
  let serviceId = params.serviceId
  return request(`/console/remote-config/view/${group}/${serviceId}`, {
    method: 'GET'
  });
}