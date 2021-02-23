import { Button, Tabs, Space, Radio, Modal, Divider, Row, Col, Typography, Menu, Dropdown, Input } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { ReadOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { Title, Text, Link } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

const service = () => {
  const [visible, setVisible] = useState(false);
  // 新建 - 确定
  const addSubmit = () => {
    setVisible(false);
  }

  return (
    <>
      <Space>
        <Button icon={<ReadOutlined />}
          onClick={() => {
            setVisible(true);
          }}
        >查看</Button>
      </Space>

      <Modal visible={visible}
        title={"查看配置"}
        onOk={addSubmit}
        onCancel={() => {
          setVisible(false);
        }}
      >

        <Tabs defaultActiveKey="1" >
          <TabPane tab="局部配置" key="1">
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
          </TabPane>
          <TabPane tab="全局配置" key="2">
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
          </TabPane>
        </Tabs>

      </Modal>
    </>
  );
};

export default service;
