import { constant } from 'lodash';
import { Select, Space, Row, Col, Button, InputNumber } from 'antd';
import React, { useState } from 'react';

import { RedoOutlined, EditOutlined, DownOutlined } from '@ant-design/icons';

const serviceGraySettingCondition = () => {

 const [grayPer, setGrayPer] = useState(50)

 const grayPerOnChange = (value) => {
   setGrayPer(value)
 }

 const staticPerOnChange = (value) => {
  setGrayPer(100 - value)
 }

 return (
  <>
   <Space direction="vertical" style={{ width: "100%" }}>
    <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
     <Col flex="40px">灰度</Col>
     <Col flex="310px">
      <InputNumber
       style={{ width: "100%" }}
       value={grayPer}
       min={0}
       max={100}
       formatter={value => `${value}%`}
       parser={value => value.replace('%', '')}
       onChange={grayPerOnChange}
      />
     </Col>
    </Row>
    <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
     <Col flex="40px">稳定</Col>
     <Col flex="310px">
      <InputNumber
       style={{ width: "100%" }}
       value={100 - grayPer}
       min={0}
       max={100}
       formatter={value => `${value}%`}
       parser={value => value.replace('%', '')}
       onChange={staticPerOnChange}
      />
     </Col>
    </Row>
    <Row>
     <Col>
      <Space>
       <Button type="primary" shape="round" icon={<EditOutlined />} >
        修改
                  </Button>
      </Space>

     </Col>
    </Row>
   </Space>
  </>
 )
}
export default serviceGraySettingCondition