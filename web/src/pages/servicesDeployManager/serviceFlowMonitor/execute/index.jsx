import { constant } from 'lodash';
import { Select, Space, Row, Col, Progress, Input } from 'antd';
import React, { useState } from 'react';

import { RedoOutlined, EditOutlined } from '@ant-design/icons';

const settingArgs = () => {

 // 纬度
 const [latitude, setLatitude] = useState('')

 // 次数
 const [times, setTimes] = useState('')

 // 并发
 const [concurrency, setConcurrency] = useState('')

 // 成功
 const [success, setSuccess] = useState(0)

 // 失败
 const [fail, setFail] = useState(0)

 // 耗时
 const [consumingTime, setConsumingTime] = useState(0)

 return (
  <>
   <Space direction="vertical" style={{ width: "100%" }}>
    <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
     <Col flex="40px">维度</Col>
     <Col flex="100px">
      <Select defaultValue="版本" style={{ width: 100 }} value={latitude}
       onChange={(value) => {
        setLatitude(value)
       }}>
       <Option value="版本">版本</Option>
       <Option value="区域">区域</Option>
       <Option value="环境">环境</Option>
       <Option value="可用区">可用区</Option>
       <Option value="地址">地址</Option>
       <Option value="组">组</Option>
      </Select>
     </Col>
     <Col flex="40px">次数</Col>
     <Col flex="100px">
      <Select defaultValue="10" style={{ width: 100 }} value={times}
       onChange={(value) => {
        setTimes(value)
       }}>
       <Option value="1">1</Option>
       <Option value="5">5</Option>
       <Option value="10">10</Option>
       <Option value="20">20</Option>
       <Option value="50">50</Option>
       <Option value="100">100</Option>
       <Option value="200">200</Option>
       <Option value="500">500</Option>
       <Option value="1000">1000</Option>
       <Option value="2000">2000</Option>
       <Option value="5000">5000</Option>
       <Option value="10000">10000</Option>
       <Option value="20000">20000</Option>
      </Select>
     </Col>
     <Col flex="40px">并发</Col>
     <Col flex="100px">
      <Select defaultValue="10" style={{ width: 100 }} value={concurrency}
       onChange={(value) => {
        setConcurrency(value)
       }}>
       <Option value="10">10</Option>
       <Option value="20">20</Option>
       <Option value="30">30</Option>
       <Option value="50">50</Option>
       <Option value="80">80</Option>
       <Option value="100">100</Option>
       <Option value="120">120</Option>
       <Option value="150">150</Option>
       <Option value="180">180</Option>
       <Option value="200">200</Option>
       <Option value="300">300</Option>
       <Option value="500">500</Option>
      </Select>
     </Col>
    </Row>
    <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
     <Col flex="40px">成功</Col>
     <Col flex="100px">
      <Progress percent={success} status="active" />
     </Col>
     <Col flex="40px">失败</Col>
     <Col flex="100px">
      <Progress percent={fail} status="active" />
     </Col>
     <Col flex="40px">耗时</Col>
     <Col flex="100px">
       {consumingTime}
     </Col>
    </Row>
   </Space>
  </>
 )
}

export default settingArgs;