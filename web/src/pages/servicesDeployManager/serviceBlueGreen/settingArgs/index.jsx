import { constant } from 'lodash';
import { Select, Space, Row, Col, Button, Input } from 'antd';
import React, { useState } from 'react';

import { RedoOutlined, EditOutlined } from '@ant-design/icons';

const settingArgs = () => {

 return (
  <>
   <Space direction="vertical" style={{ width: "100%" }}>
    <Row>
     <Col flex="40px">参数</Col>
     <Col flex="350px">
      <Input placeholder="Basic usage" />
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

export default settingArgs;