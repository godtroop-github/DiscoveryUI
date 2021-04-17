import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Tabs, Input, Select } from 'antd';
import React from 'react';
import { connect } from 'umi';

import ServiceGrayPreview from './preview/index.jsx';
import ServiceGraySave from './save/index.jsx';
import ServiceGrayNew from './add/index.jsx';
import ServiceGrayOpen from './open/index.jsx';
import ServiceGrayReload from './reload/index.jsx';
import ServiceGraySettingCondition from './settingCondition/index.jsx';
import ServiceGraySettingArrange from './settingArrange/index.jsx';
import ServiceGrayView from './view';

const serviceGrey = (props) => {

  // 当前页面的全局配置,在各个组件间传递
  const { serviceGray = {} } = props
  const { gobal = {}, condition = {}, version } = serviceGray

  const handleNew = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'serviceGray/new',
      payload: { ...values },
    });
  }

  const handlerUpdateCondition = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'serviceGray/updateCondition',
      payload: { ...values },
    });
  }

  const handlerUpdateVersion = () => {
    const { dispatch } = props;
    dispatch({
      type: 'serviceGray/updateVersion'
    });
  }

  const handleAdd = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'serviceGray/add',
      payload: { ...values },
    });
  }

  const handleEdit = (values) => {
    const { dispatch } = props
    dispatch({
      type: 'serviceGray/edit',
      payload: { ...values }
    })
  }

  return (
    <>
      <Row wrap={false} justify="space-around">
        <Col flex={1} style={{ 'display': 'flex', 'flex-flow': 'column' }}>
          <Row>
            <Col>
              <ServiceGrayNew new={handleNew}></ServiceGrayNew>
              <ServiceGrayOpen
                new={handleNew}
                updateCondition={handlerUpdateCondition}
                updateVersion={handlerUpdateVersion}
              ></ServiceGrayOpen>
              <ServiceGrayPreview
                gobal={gobal} condition={condition}
              ></ServiceGrayPreview>
              {/* <ServiceGraySave */}
              {/* gobal={gobal} condition={condition}  */}
              {/* ></ServiceGraySave> */}
              {/* <ServiceGrayReload></ServiceGrayReload> */}

            </Col>
          </Row>
          <ServiceGrayView 
            gobal={gobal} condition={condition}></ServiceGrayView>
        </Col>
        <Col flex="450px">
          <Divider orientation="left">灰度条件</Divider>
          <ServiceGraySettingCondition
            type={'gray'}
            condition={condition}
            version={version}
            update={handlerUpdateCondition}
          ></ServiceGraySettingCondition>
          <Divider orientation="left">灰度编排</Divider>
          <ServiceGraySettingArrange
            gobal={gobal}
            version={version}
            add={handleAdd}
            edit={handleEdit}></ServiceGraySettingArrange>
        </Col>
      </Row>
    </>
  );
}

export default connect(({ serviceGray, loading }) => ({
  serviceGray
}))(serviceGrey);
