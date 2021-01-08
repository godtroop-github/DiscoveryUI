import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Tabs, Input, Select } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { TabPane } = Tabs;

const { Option } = Select;

import ServiceBlueGreenNew from './add/index.jsx';

const serviceBlueGreen = () => {

  return (
    <>
      <Row>
        <Col flex={10}><ServiceBlueGreenNew></ServiceBlueGreenNew></Col>
        <Col flex={3}>
          <Divider orientation="left">蓝绿条件</Divider>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="蓝" key="1">
              <Row>
                <Col flex={1}>
                  参数
              </Col>
                <Col flex={1}>运算</Col>
                <Col flex={1}>值</Col>
                <Col flex={1}>关系</Col>
              </Row>
              <Row>
                <Col flex={1}>
                  <Input placeholder="Basic usage" />
                </Col>
                <Col flex={1}>
                  <Select defaultValue="lucy" style={{ width: 120 }}>
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
                <Col flex={1}>
                  <Input placeholder="Basic usage" />
                </Col>
                <Col flex={1}>关系</Col>
              </Row>
            </TabPane>
            <TabPane tab="绿" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default serviceBlueGreen;
