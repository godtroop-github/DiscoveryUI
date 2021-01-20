import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Menu, Dropdown, Tabs, Input } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { FileDoneOutlined, DownOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { Title, Text, Link } = Typography;


const subscribeGroupMenu = (
 <Menu>
  <Menu.Item key="0">
   <a href="http://www.alipay.com/">1st menu item</a>
  </Menu.Item>
  <Menu.Item key="1">
   <a href="http://www.taobao.com/">2nd menu item</a>
  </Menu.Item>
  <Menu.Divider />
  <Menu.Item key="3">3rd menu item</Menu.Item>
 </Menu>
)

const subscribeServiceMenu = (
 <Menu>
  <Menu.Item key="0">
   <a href="http://www.alipay.com/">1st menu item</a>
  </Menu.Item>
  <Menu.Item key="1">
   <a href="http://www.taobao.com/">2nd menu item</a>
  </Menu.Item>
  <Menu.Divider />
  <Menu.Item key="3">3rd menu item</Menu.Item>
 </Menu>
)



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
    onOk={addSubmit}
    onCancel={() => {
     setVisible(false);
    }}
   >
    <Divider orientation="left">订阅参数</Divider>

    <Row gutter={[16, 16]}>
     <Col flex="40px">
     </Col>
     <Col flex="100px">
      <Text>订阅类型</Text>
     </Col>
     <Col auto>
      <Radio.Group name="radiogroup" defaultValue={1}>
       <Radio value={1}>局部订阅</Radio>
       <Radio value={2}>全局订阅</Radio>
      </Radio.Group>
     </Col>
    </Row>
    <Row align="middle" gutter={[16, 16]}>
     <Col flex="40px">
     </Col>
     <Col flex="100px">
      <Text>订阅组名</Text>
     </Col>
     <Col auto>
      <Dropdown overlay={subscribeGroupMenu} placement="bottomLeft" arrow>
       <Button>请选择要订阅的组名 <DownOutlined /></Button>
      </Dropdown>
     </Col>
    </Row>
    <Row align="middle" gutter={[16, 16]}>
     <Col flex="40px">
     </Col>
     <Col flex="100px">
      <Text>订阅服务名</Text>
     </Col>
     <Col auto>
      <Dropdown overlay={subscribeServiceMenu} placement="bottomLeft" arrow>
       <Button>请选择要订阅的服务名 <DownOutlined /></Button>
      </Dropdown>
     </Col>
    </Row>
    <Divider orientation="left">部署参数</Divider>
    <Row gutter={[16, 16]}>
     <Col flex="40px">
     </Col>
     <Col flex="100px">
      <Text>部署模式</Text>
     </Col>
     <Col auto>
      <Radio.Group name="radiogroup" defaultValue={1}>
       <Radio value={1}>域网管模式</Radio>
       <Radio value={2}>非域网关模式</Radio>
      </Radio.Group>
     </Col>
    </Row>
    <Divider orientation="left">发布参数</Divider>
    <Row gutter={[16, 16]}>
     <Col flex="40px">
     </Col>
     <Col flex="100px">
      <Text>发布策略</Text>
     </Col>
     <Col auto>
      <Radio.Group name="radiogroup" defaultValue={1}>
       <Radio value={1}>版本策略</Radio>
       <Radio value={2}>区域策略</Radio>
      </Radio.Group>
     </Col>
    </Row>
    <Row gutter={[16, 16]}>
     <Col flex="40px">
     </Col>
     <Col flex="100px">
      <Text>路由类型</Text>
     </Col>
     <Col auto>
      <Radio.Group name="radiogroup" defaultValue={1}>
       <Radio value={1}>蓝|绿|兜底</Radio>
       <Radio value={2}>蓝|兜底</Radio>
      </Radio.Group>
     </Col>
    </Row>
   </Modal>
  </>
 );
};

export default serviceBlueGreenAdd;
