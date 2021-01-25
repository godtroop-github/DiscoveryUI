import { Button, Space, Radio, Modal, Divider, Row, Col, Typography, Tabs, Input, Select } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { PlusOutlined, MinusOutlined, SettingOutlined, CaretRightOutlined, EditOutlined } from '@ant-design/icons';

const serviceBlueGreenSettingCondition = () => {

 // 蓝绿条件运算条件
 const [conditionRow, setConditionRow] = useState([{}]);

 // 下一行增加运算条件
 const addCondition = (item, index) => {

  let row = {}
  let conditionRowBak = conditionRow.concat()
  conditionRowBak.splice(index + 1, 0, row);
  setConditionRow(conditionRowBak)
 }

 // 删除当前这一行
 const removeCondition = (item, index) => {

  let conditionRowBak = conditionRow.concat()
  conditionRowBak.splice(index)
  setConditionRow(conditionRowBak)
 }

 return (
  <>
   <Space direction="vertical">
    <Row>
     <Col flex="90px">参数</Col>
     <Col flex="60px">运算</Col>
     <Col flex="90px">值</Col>
     <Col flex="120px">关系</Col>
    </Row>
    {
     conditionRow.map((item, index) => {
      return (
       <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
        <Col flex="90px">{/*  */}
         <Input placeholder="Basic usage" value={item.args} onChange={(e) => {
          item.args = e.target.value;
          setConditionRow([...conditionRow, { index: item }])
         }} />
        </Col>
        <Col flex="60px">
         <Select defaultValue="lucy" style={{ width: 60 }} value={item.symbol}>
          <Option value="jack">==</Option>
          <Option value="lucy">!=</Option>
          <Option value="disabled">
           &gt;
                  </Option>
          <Option value="Yiminghe">
           &gt;=
                  </Option>
          <Option value="Yiminghe">
           &lt;
                  </Option>
          <Option value="Yiminghe">
           &lt;=
                  </Option>
          <Option value="Yiminghe">
           match
                  </Option>
         </Select>
        </Col>
        <Col flex="90px">
         <Input placeholder="Basic usage" value={item.val} />
        </Col>
        <Col flex="70px">
         {
          index != conditionRow.length - 1 &&
          <Select defaultValue="&&" style={{ width: 70 }} value={item.relation}>
           <Option value="disabled">&&</Option>
           <Option value="Yiminghe">||</Option>
          </Select>
         }

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

    <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
     <Col flex="40px">条件</Col>
     <Col flex="310px">
      <Input placeholder="Basic usage" />
     </Col>
     <Col flex={1}>
      <Button type="primary" shape="circle" icon={<SettingOutlined />} />
     </Col>
    </Row>
    <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
     <Col flex="40px">校验</Col>
     <Col flex="310px">
      <Input placeholder="Basic usage" />
     </Col>
     <Col flex={1}>
      <Button type="primary" shape="circle" icon={<CaretRightOutlined />} />
     </Col>
    </Row>
    <Row>
     <Col>
      <Button type="primary" shape="round" icon={<EditOutlined />} >
       修改
                  </Button>
     </Col>
    </Row>
   </Space>

  </>
 )
}

export default serviceBlueGreenSettingCondition;