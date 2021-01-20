import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Tabs, Input, Select } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { PlusOutlined, MinusOutlined, SettingOutlined, CaretRightOutlined, EditOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { TabPane } = Tabs;

const { Option } = Select;

import ServiceBlueGreenPreview from './preview/index.jsx';
import ServiceBlueGreenSave from './save/index.jsx';
import ServiceBlueGreenNew from './add/index.jsx';
import ServiceBlueGreenSettingCondition from './settingCondition/index.jsx';
import ServiceBlueGreenSettingArrange from './settingArrange/index.jsx';
import ServiceBlueGreenSettingArgs from './settingArgs/index.jsx';

const serviceBlueGreen = () => {

  return (
    <>
      <Row>
        <Col flex={10}>
          <ServiceBlueGreenNew></ServiceBlueGreenNew>
          <ServiceBlueGreenPreview></ServiceBlueGreenPreview>
          <ServiceBlueGreenSave></ServiceBlueGreenSave>
        </Col>
        <Col flex="450px">
          <Divider orientation="left">蓝绿条件</Divider>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="蓝" key="1">
              <ServiceBlueGreenSettingCondition></ServiceBlueGreenSettingCondition>
            </TabPane>
            <TabPane tab="绿" key="2">
              <ServiceBlueGreenSettingCondition></ServiceBlueGreenSettingCondition>
            </TabPane>
          </Tabs>
          <Divider orientation="left">蓝绿编排</Divider>
          <ServiceBlueGreenSettingArrange></ServiceBlueGreenSettingArrange>
          <Divider orientation="left">蓝绿参数</Divider>
          <ServiceBlueGreenSettingArgs></ServiceBlueGreenSettingArgs>
        </Col>
      </Row>
    </>
  );
};

export default serviceBlueGreen;
