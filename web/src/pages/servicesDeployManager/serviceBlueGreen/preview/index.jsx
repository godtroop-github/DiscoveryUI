import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Menu, Dropdown, Tabs, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { FileDoneOutlined, DownOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { Title, Text, Link } = Typography;
const { TextArea } = Input;
import {remoteConfigUpdate } from '@/services/console'
var X2JS = require('x2js') //xml数据处理插件

const serviceBlueGreenPreview = (props) => {
 const [visible, setVisible] = useState(false)
 const [primaryKey, setPrimaryKey] = useState()
 const [xml, setXml] = useState()

 const gobal = props.gobal
 const condition = props.condition
 const args = props.args

 const preview = (() => {
  if (gobal) {
    let type = gobal.type
    let subscribe = gobal.subscribe
    let subscribeInstanceKey = gobal.subscribeInstanceKey.name
    let gatewayType = gobal.gatewayType
    let policy = gobal.policy
    let routeType = gobal.routeType
    let arrange = gobal.arrange
    // 兜底
    let revealRoute = {}
    let blueRoute = {}
    let greenRoute = {}
    arrange.forEach(item => {
      revealRoute[item.name] = item.revealService
      blueRoute[item.name] = item.blueService
      greenRoute[item.name] = item.greenService
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
        "strategy": {
          [versionRegion]: `${JSON.stringify(revealRoute)}`
        },
        "strategy-customization": {
          "conditions": {
            "condition": [],
            "_type": "blue-green"
          },
          "routes": {
            "route": []
          }
        }
      }
    }
    let blueConditonJson = {
      "_id": "blue-condition",
      "_header": `${condition.blue}`,
      [`_${versionRegion}-id`]: `blue-${versionRegion}-route`
    }
    let blueRouteJson = {
      "_id": `blue-${versionRegion}-route`,
      "_type": versionRegion,
      "__text": `${JSON.stringify(blueRoute)}`
    }
    let greenConditionJson = {
      "_id": "green-condition",
      "_header": `${condition.green}`,
      [`_${versionRegion}-id`]: `green-${versionRegion}-route`
    }
    let greenRouteJson = {
      "_id": `green-${versionRegion}-route`,
      "_type": versionRegion,
      "__text": `${JSON.stringify(greenRoute)}`
    }
    xmlJson.rule['strategy-customization'].conditions.condition.push(blueConditonJson)
    xmlJson.rule['strategy-customization'].routes.route.push(blueRouteJson)
    if (routeType == 1) {
      xmlJson.rule['strategy-customization'].conditions.condition.push(greenConditionJson)
      xmlJson.rule['strategy-customization'].routes.route.push(greenRouteJson)
    }
    
    if (args && args.length > 0) {
      let headers = {}
      headers.header = args.map(item => {
        return {
					"_key": item.key,
					"_value": item.value
				}
      })
      xmlJson.rule["strategy-customization"].headers = headers
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

export default serviceBlueGreenPreview;
