import { constant } from 'lodash';
import { Select, Space, Row, Col, Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';

import { RedoOutlined, EditOutlined } from '@ant-design/icons';

import { getRealServices, getGateways, getInstances } from '@/services/console'

const settingEnter = () => {

 const [type, setType] = useState("网关");
 const [protocol, setProtocol] = useState("http://")
 const [service, setService] = useState('')
 const [instance, setInstance] = useState('')

 // 服务列表
 const [services, setServices] = useState([])
 // 实例列表
 const [instances, setInstances] = useState([])

 // 初始化服务列表为网关类型
 useEffect(() => {
  getGateways().then(res => {
   setServices(res)
  })
 }, [])

 async function changeType(val) {
  setType(val)
  let res;
  if (val == '网关') {
   res = await getGateways()
  } else {
   res = await getRealServices()
  }
  setServices(res)
  if (res.length > 0) {
   setService(res[0])
  }
 }

 async function changeService(value) {
  setService(value)
  setInstances(await getInstances(value))
 }

 return (
  <>
   <Space direction="vertical" style={{ width: "100%" }}>
    <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
     <Col flex="40px">类型</Col>
     <Col flex="150px">
      <Select defaultValue="网关" style={{ width: 150 }} value={type}
       onChange={(value) => {
        changeType(value)
       }}>
       <Option value="网关">网关</Option>
       <Option value="服务">服务</Option>
      </Select>
     </Col>
     <Col flex="40px">协议</Col>
     <Col flex="150px">
      <Select defaultValue="http://" style={{ width: 150 }} value={protocol}
       onChange={(value) => {
        setProtocol(value)
       }}>
       <Option value="http://">http://</Option>
       <Option value="https://">https://</Option>
      </Select>
     </Col>
    </Row>
    <Row>
     <Col flex="40px">服务</Col>
     <Col flex="350px">
      <Select defaultValue="http://" style={{ width: 350 }} value={service}
       onChange={(value) => {
        changeService(value)
       }}>
       {
        services.map(item => {
         return (
          <Option value={item}>{item}</Option>
         )
        })
       }
      </Select>
     </Col>
    </Row>
    <Row>
     <Col flex="40px">实例</Col>
     <Col flex="350px">
      <Select defaultValue="http://" style={{ width: 350 }} value={instance}
       onChange={(value) => {
        setInstance(value)
       }}>
       {
        instances.map(item => {
         return (
          <Option value={item.host}>{item.host}</Option>
         )
        })
       }
      </Select>
     </Col>
    </Row>
   </Space>
  </>
 )
}

export default settingEnter;