import { constant } from 'lodash';
import { Select, Space, Row, Col, Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';

import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { getRealServices } from '@/services/console'


const settingArgs = () => {

 // 服务列表
 const [services, setServices] = useState([])

 // 侦测链路
 const [conditionRow, setConditionRow] = useState([{}]);

 useEffect(() => {
  getRealServices().then(res => {
   setServices(res)
  })
 }, [])

 const addCondition = (item, index) => {

  let row = {}
  let conditionRowBak = conditionRow.concat()
  conditionRowBak.splice(index + 1, 0, row);
  setConditionRow(conditionRowBak)
 }

 // 删除当前这一行
 const removeCondition = (item, index) => {

  if (conditionRow.length <= 1) {
   message.error("至少得要有一行")
  }

  let conditionRowBak = conditionRow.concat()
  conditionRowBak.splice(index)
  setConditionRow(conditionRowBak)
 }

 return (
  <>
   <Space direction="vertical" style={{ width: "100%" }}>
    {
     conditionRow.map((item, index) => {
      return (
       <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
        <Col flex="40px">服务</Col>
        <Col flex="100px">
         <Select style={{ width: 300 }} value={item.val}
          onChange={(value) => {
           item.val = value;
           setConditionRow(conditionRow.map((_item, _index) => _index == index ? item : _item))
          }}>
          {
           services.map((service, serviceIndex) => {
            return (
             <Option value={service}>{service}</Option>
            )
           })
          }

         </Select>
        </Col>
        <Col flex={1}>
         <Space>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => { addCondition(item, index) }} />
          <Button type="primary" shape="circle" icon={<MinusOutlined />} onClick={() => { removeCondition(item, index) }} />
         </Space>
        </Col>
       </Row>
      )
     })
    }
   </Space>
  </>
 )
}

export default settingArgs;