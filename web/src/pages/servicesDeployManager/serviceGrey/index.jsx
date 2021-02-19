import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Tabs, Input, Select } from 'antd';
import React from 'react';
import { connect } from 'umi';

import ServiceGrayPreview from './preview/index.jsx';
import ServiceGraySave from './save/index.jsx';
import ServiceGrayNew from './add/index.jsx';
import ServiceGraySettingCondition from './settingCondition/index.jsx';
import ServiceGraySettingArrange from './settingArrange/index.jsx';

const serviceGrey = (props) => {
  
  // 当前页面的全局配置,在各个组件间传递
  const {serviceGray = {}} = props
  const {gobal = {}} = serviceGray
  
  const handleNew = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'serviceGray/new',
      payload: { ...values },
    });
  }

  return (
    <>
      <Row>
        <Col flex={10}>
          <ServiceGrayNew new={handleNew}></ServiceGrayNew>
          <ServiceGrayPreview></ServiceGrayPreview>
          <ServiceGraySave></ServiceGraySave>
        </Col>
        <Col flex="450px">
          <Divider orientation="left">灰度条件</Divider>
          <ServiceGraySettingCondition></ServiceGraySettingCondition>
          <Divider orientation="left">灰度编排</Divider>
          <ServiceGraySettingArrange  gobal={gobal}></ServiceGraySettingArrange>
        </Col>
      </Row>
    </>
  );
}

export default connect(({ serviceGray, loading }) => ({
  serviceGray
}))(serviceGrey);
