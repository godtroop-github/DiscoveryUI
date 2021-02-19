import { constant } from 'lodash';
import { Select, Space, Row, Col, Button, Input } from 'antd';
import React, { useState } from 'react';

import { PlusOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';

const settingArgs = () => {

 // 侦测参数
 const [conditionRow, setConditionRow] = useState([{
  argType: "Header"
 }]);

 const addCondition = (item, index) => {

  let row = {
   argType: "Header"
  }
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
        <Col flex="100px">
         <Select defaultValue="Header" style={{ width: 100 }} value={item.argType}
          onChange={(value) => {
           item.argType = value;
           setConditionRow(conditionRow.map((_item, _index) => _index == index ? item : _item))
          }}>
          <Option value="Header">Header</Option>
          <Option value="Paramter">Paramter</Option>
          <Option value="Cookie">Cookie</Option>
         </Select>
        </Col>
        <Col flex="110px">
         <Input placeholder="Basic usage" value={item.valA} onChange={(e) => {
          item.valA = e.target.value;
          setConditionRow(conditionRow.map((_item, _index) => _index == index ? item : _item))
         }} />
        </Col>
        <Col>
         &nbsp;=&nbsp;
        </Col>
        <Col flex="100px">
         <Input placeholder="Basic usage" value={item.valB} onChange={(e) => {
          item.valB = e.target.value;
          setConditionRow(conditionRow.map((_item, _index) => _index == index ? item : _item))
         }} />
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