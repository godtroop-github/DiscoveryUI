import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Menu, Dropdown, Tabs, Input, message } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { FileDoneOutlined, DownOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { Title, Text, Link } = Typography;
const { TextArea } = Input;
import {remoteConfigUpdate } from '@/services/console'
var X2JS = require('x2js') //xml数据处理插件

const serviceGrayPreview = (props) => {
  const [visible, setVisible] = useState(false)
  const [primaryKey, setPrimaryKey] = useState()
  const [xml, setXml] = useState()
 
  const gobal = props.gobal
  const condition = props.condition
 
  const preview = (() => {
   if (gobal) {
     let type = gobal.type
     let subscribe = gobal.subscribe
     let subscribeInstanceKey = gobal.subscribeInstanceKey.name
     let gatewayType = gobal.gatewayType
     let policy = gobal.policy
     let arrange = gobal.arrange
     let grayRoute = {}
     let stableRoute = {}
     arrange.forEach(item => {
       grayRoute[item.name] = item.grayService
       stableRoute[item.name] = item.stableService
     })
 
     //策略
     let versionRegion
     if (policy == 1) {
       versionRegion = 'version'
     } else {
       versionRegion = 'region'
     }
 
     setPrimaryKey(`Data ID=${subscribe} | Group=${subscribeInstanceKey}`)
 
     let xmlJson = {
       "rule": {
         "strategy-customization": {
          "conditions": {
            "condition": {
              "_id": "gray-condition",
              [`_${versionRegion}-id`]: `gray-${versionRegion}-route=${condition.gray};stable-${versionRegion}-route=${100 - condition.gray}`
            },
            "_type": "gray"
          },
           "routes": {
             "route": [{
               "_id": `gray-${versionRegion}-route`,
               "_type": versionRegion,
               "__text": `${JSON.stringify(grayRoute)}`
             }, {
               "_id": `stable-${versionRegion}-route`,
               "_type": versionRegion,
               "__text": `${JSON.stringify(stableRoute)}`
             }]
           }
         }
       }
     }
     var x2js = new X2JS()
     var xmlContent = x2js.js2xml(xmlJson)
     console.log(xmlContent)
     setXml(xmlContent)
    }
  })
 
 
  // 保存预览
  const submit = () => {
   let group = gobal.subscribe
   let serviceId = gobal.subscribeInstanceKey.name
 
   let config = xml
   remoteConfigUpdate({
     group,
     serviceId,
     config
   }).then(res => {
     message.info(`ok`)
   })
   setVisible(false)
  }
 
  return (
   <>
      <Space>
       <Button icon={<FileDoneOutlined />}
        onClick={() => {
         preview()
         setVisible(true);
        }}
       >预览</Button>
      </Space>
      
    <Modal visible={visible}
     title={"预览配置"}
     okText="保存配置"
     cancelText="关闭预览"
     onOk={submit}
     onCancel={() => {
      setVisible(false);
     }}
    >
     <Divider orientation="left">配置主键</Divider>
 
     <Row gutter={[16, 16]}>
      <Col flex={1}>
       <Input placeholder="Basic usage" disabled={true} value={primaryKey}/>
      </Col>
     </Row>
 
     <Divider orientation="left">配置内容</Divider>
       <Row>
         <Col flex={1}>
           <TextArea rows={8} value={xml}/>
         </Col>
       </Row>
    </Modal>
   </>
  );
 };
 
 export default serviceGrayPreview;
