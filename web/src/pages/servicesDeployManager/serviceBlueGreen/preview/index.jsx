import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Menu, Dropdown, Tabs, Input } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { FileDoneOutlined, DownOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { Title, Text, Link } = Typography;
const { TextArea } = Input;

const serviceBlueGreenAdd = () => {
 const [visible, setVisible] = useState(false);
 // 新建 - 确定
 const addSubmit = () => {
  setVisible(false);
 }

 return (
  <>
     <Space>
      <Button icon={<FileDoneOutlined />}
       onClick={() => {
        setVisible(true);
       }}
      >预览</Button>
     </Space>
     
   <Modal visible={visible}
    title={"预览配置"}
    onOk={addSubmit}
    onCancel={() => {
     setVisible(false);
    }}
   >
    <Divider orientation="left">配置主键</Divider>

    <Row gutter={[16, 16]}>
     <Col flex={1}>
      <Input placeholder="Basic usage" />
     </Col>
    </Row>

    <Divider orientation="left">配置内容</Divider>
      <Row>
        <Col flex={1}>
          <TextArea rows={8} />
        </Col>
      </Row>
   </Modal>
  </>
 );
};

export default serviceBlueGreenAdd;
