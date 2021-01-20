import { Button, Space, Radio, Modal, Divider, Row, Col, Typography, Tabs, Input, Select } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { PlusOutlined, MinusOutlined, SettingOutlined, CaretRightOutlined, EditOutlined } from '@ant-design/icons';

const serviceBlueGreenSettingCondition = () => {

 return (
  <>
   <Space direction="vertical">
    <Row>
     <Col flex="90px">参数</Col>
     <Col flex="60px">运算</Col>
     <Col flex="90px">值</Col>
     <Col flex="120px">关系</Col>
    </Row>
    <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
     <Col flex="90px">
      <Input placeholder="Basic usage" />
     </Col>
     <Col flex="60px">
      <Select defaultValue="lucy" style={{ width: 60 }}>
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
      <Input placeholder="Basic usage" />
     </Col>
     <Col flex="70px">
      <Select defaultValue="&&" style={{ width: 70 }}>
       <Option value="disabled">&&</Option>
       <Option value="Yiminghe">||</Option>
      </Select>
     </Col>
     <Col flex={1}>
      <Space>
       <Button type="primary" shape="circle" icon={<PlusOutlined />} />
       <Button type="primary" shape="circle" icon={<MinusOutlined />} />
      </Space>
     </Col>
    </Row>
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