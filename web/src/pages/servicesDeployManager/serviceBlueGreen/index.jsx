import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Tabs, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { PlusOutlined, MinusOutlined, SettingOutlined, CaretRightOutlined, EditOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { TabPane } = Tabs;

import ServiceBlueGreenPreview from './preview/index.jsx';
import ServiceBlueGreenSave from './save/index.jsx';
import ServiceBlueGreenNew from './add/index.jsx';
import ServiceBlueGreenOpen from './open/index.jsx';
import ServiceBlueGreenReload from './reload/index.jsx';
import ServiceBlueGreenSettingCondition from './settingCondition/index.jsx';
import ServiceBlueGreenSettingArrange from './settingArrange/index.jsx';
import ServiceBlueGreenSettingArgs from './settingArgs/index.jsx';
import ServiceBlueGreenView from './view/index.jsx';
const serviceBlueGreen = (props) => {

  // 当前页面的全局配置,在各个组件间传递
  const { serviceBlueGreen = {} } = props
  const { gobal = {}, condition = {}, args = [], version } = serviceBlueGreen

  const handleNew = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'serviceBlueGreen/new',
      payload: { ...values },
    });
  }

  const handlerUpdateCondition = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'serviceBlueGreen/updateCondition',
      payload: { ...values },
    });
  }

  const handlerUpdateVersion = () => {
    const { dispatch } = props;
    dispatch({
      type: 'serviceBlueGreen/updateVersion'
    });
  }

  const handlerUpdateArgs = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'serviceBlueGreen/updateArgs',
      payload: { ...values },
    });
  }

  const handleAdd = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'serviceBlueGreen/add',
      payload: { ...values },
    });
  }

  const handleEdit = (values) => {
    const { dispatch } = props
    dispatch({
      type: 'serviceBlueGreen/edit',
      payload: { ...values }
    })
  }

  return (
    <>
      <Row wrap={false} justify="space-around">
        <Col flex={1} style={{ 'display': 'flex', 'flex-flow': 'column' }}>
          <Row>
            <Col>
              <ServiceBlueGreenNew new={handleNew}></ServiceBlueGreenNew>
              <ServiceBlueGreenOpen
                new={handleNew}
                updateArgs={handlerUpdateArgs}
                updateCondition={handlerUpdateCondition}
                updateVersion={handlerUpdateVersion}
              ></ServiceBlueGreenOpen>
              <ServiceBlueGreenPreview gobal={gobal} condition={condition} args={args}></ServiceBlueGreenPreview>
              {/* <ServiceBlueGreenSave gobal={gobal} condition={condition} args={args}></ServiceBlueGreenSave> */}
              {/* <ServiceBlueGreenReload></ServiceBlueGreenReload> */}
            </Col>
          </Row>
          <ServiceBlueGreenView gobal={gobal}></ServiceBlueGreenView>
        </Col>
        <Col flex="450px">
          <Divider orientation="left">蓝绿条件</Divider>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="蓝" key="1">
              <ServiceBlueGreenSettingCondition
                type={'blue'}
                condition={condition}
                version={version}
                update={handlerUpdateCondition}></ServiceBlueGreenSettingCondition>
            </TabPane>
            {gobal.routeType == 1 && (
              <TabPane tab="绿" key="2">
                <ServiceBlueGreenSettingCondition
                  condition={condition}
                  type={'green'}
                  version={version}
                  update={handlerUpdateCondition}></ServiceBlueGreenSettingCondition>
              </TabPane>
            )}

          </Tabs>
          <Divider orientation="left">蓝绿编排</Divider>
          <ServiceBlueGreenSettingArrange
            gobal={gobal}
            version={version}
            add={handleAdd}
            edit={handleEdit}></ServiceBlueGreenSettingArrange>
          <Divider orientation="left">蓝绿参数</Divider>
          <ServiceBlueGreenSettingArgs
            args={args}
            update={handlerUpdateArgs}></ServiceBlueGreenSettingArgs>
        </Col>
      </Row>
    </>
  );
};

export default connect(({ serviceBlueGreen, loading }) => ({
  serviceBlueGreen
}))(serviceBlueGreen);
