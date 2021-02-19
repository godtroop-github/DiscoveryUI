import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Tabs, Input, Select } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { PlusOutlined, MinusOutlined, SettingOutlined, CaretRightOutlined, EditOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { TabPane } = Tabs;

import ServiceFlowMonitorStart from './start/index.jsx';
import ServiceFlowMonitorStop from './stop/index.jsx';
import ServiceFlowMonitorArgs from './args/index.jsx';
import ServiceFlowMonitorEnter from './enter/index.jsx';
import ServiceFlowMonitorExecute from './execute/index.jsx';
import ServiceFlowMonitorLink from './link/index.jsx';

const serviceFlowMonitor = () => {
  return (
    <>
      <Row>
        <Col flex={10}>
          <ServiceFlowMonitorStart></ServiceFlowMonitorStart>
          <ServiceFlowMonitorStop></ServiceFlowMonitorStop>
        </Col>
        <Col flex="450px">
          <Divider orientation="left">侦测入口</Divider>
          <ServiceFlowMonitorEnter></ServiceFlowMonitorEnter>
          <Divider orientation="left">侦测参数</Divider>
          <ServiceFlowMonitorArgs></ServiceFlowMonitorArgs>
          <Divider orientation="left">侦测链路</Divider>
          <ServiceFlowMonitorLink></ServiceFlowMonitorLink>
          <Divider orientation="left">侦测执行</Divider>
          <ServiceFlowMonitorExecute></ServiceFlowMonitorExecute>
        </Col>
      </Row>
    </>
  );
};

export default serviceFlowMonitor;
