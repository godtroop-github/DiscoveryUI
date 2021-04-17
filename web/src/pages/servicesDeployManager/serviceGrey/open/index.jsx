import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Select, Dropdown, Tabs, Input, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { FolderOpenOutlined, DesktopOutlined, CloudServerOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { Title, Text, Link } = Typography;
import { groups, instanceMap, remoteConfig } from '@/services/console'
const { TextArea } = Input;

var X2JS = require('x2js') //xml数据处理插件

const service = (props) => {

  const [visible, setVisible] = useState(false);
  const [groupList, setGroupList] = useState([])
  const [type, setType] = useState(1);
  const [subscribe, setSubscribe] = useState();
  const [instanceList, setInstanceList] = useState([]);
  const [subscribeInstance, setSubScribeInstance] = useState();
  const [gatewayType, setGatewayType] = useState();
  const [configContent, setConfigContent] = useState();


  // 新建 - 确定
  const addSubmit = () => {
    setVisible(false)
    convertJson()
  }

  // 初始化服务组列表
  const init = () => {
    setVisible(true)
  }

  useEffect(() => {
    // 获取服务器组列表
    groups().then((res) => {
      setGroupList(res)
      if (res.length > 0) {
        setSubscribe(res[0])
        instanceMap(
          [res[0]]
        ).then((_res) => {
          initInstanceList(_res)
        })
      }
    })
  }, [])

  // 转为前端内部结构
  const convertJson = () => {
    var x2js = new X2JS()
    var json = x2js.xml2js(configContent)
    console.log(JSON.stringify(json))
    if (json) {

      let conditionType = json.rule["strategy-customization"].conditions && json.rule["strategy-customization"].conditions._type

      if (conditionType == 'blue-green') {
        message.error(`请打开蓝绿发布`)
        return
      } else if (conditionType != 'gray') {
        message.error(`格式不属于灰度发布`)
        return
      }
      let policy = 1
      let arrange = []
      let versionRegion
      let routeJson = json.rule["strategy-customization"].routes.route

      // 大于1代表是 灰度稳定 路由
      if (routeJson.length > 1) {

        if (routeJson[0]._type == 'version') {
          policy = 1
          versionRegion = 'version'
        } else {
          policy = 2
          versionRegion = 'region'
        }
        console.log(versionRegion)

        // 灰度路由解析
        let grayRoute = routeJson.find(i => i._id == `gray-${versionRegion}-route`)
        if (grayRoute) {
          grayRoute = JSON.parse(grayRoute)
          for (var name in grayRoute) {
            let service = arrange.find(i => i.name == name)
            if (service) {
              arrange.find(i => i.name == name).grayService = grayRoute[name]
            } else {
              arrange.push({
                name,
                grayService: grayRoute[name]
              })
            }
          }
        }
        // 稳定路由解析
        let stableRoute = routeJson.find(i => i._id == `stable-${versionRegion}-route`)
        if (stableRoute) {
          stableRoute = JSON.parse(stableRoute)
          for (var name in stableRoute) {
            let service = arrange.find(i => i.name == name)
            if (service) {
              arrange.find(i => i.name == name).stableService = stableRoute[name]
            } else {
              arrange.push({
                name,
                stableService: stableRoute[name]
              })
            }
          }
        }

        // 灰度条件
        let conditionJson = json.rule["strategy-customization"].conditions && json.rule["strategy-customization"].conditions.condition
        console.log(conditionJson)
        if (conditionJson) {
          if (conditionJson._id == 'gray-condition') {
            let condition = conditionJson[`_${versionRegion}-id`]
            condition.split(';').forEach(i => {
              let kv = i.split('=')
              if (kv[0] == `gray-${versionRegion}-route`) {
                props.updateCondition({
                  type: 'gray',
                  value: kv[1]
                })
              }
            })
          }
        }
      }

      let subscribeInstanceKey
      if (type == 1) {
        subscribeInstanceKey = instanceList.find(i => i.name == subscribeInstance)
      } else {
        subscribeInstanceKey = {
          name: subscribe
        }
      }

      props.new({
        type,
        subscribe,
        subscribeInstanceKey,
        arrange,
        gatewayType,
        policy
      })

      props.updateVersion()
    }
  }

  // 获取远程配置内容
  const getRemoteConfig = () => {
    let serviceId
    if (type == 1) {
      serviceId = subscribeInstance
    } else {
      serviceId = subscribe
    }
    remoteConfig({
      group: subscribe,
      serviceId
    }).then(res => {
      setConfigContent(res)
    })
  }

  // 初始化服务列表
  const initInstanceList = (instanceMap) => {
    let list = []
    for (var instanceName in instanceMap) {
      list.push({
        name: instanceName,
        value: instanceMap[instanceName]
      })
    }
    setInstanceList(list)
    if (list.length > 0) {
      setSubScribeInstance(list[0].name)
    }
  }

  return (
    <>
      <Space>
        <Button icon={<FolderOpenOutlined />}
          onClick={init}
        >打开</Button>
      </Space>

      <Modal visible={visible}
        title={"打开配置[全链路服务灰度发布]"}
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
          <Col flex="auto">
            <Radio.Group name="radiogroup" defaultValue={1} value={type}
              onChange={(e) => {
                setType(e.target.value)
              }}
            >
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
          <Col flex="auto">
            <Select defaultValue='' style={{ width: 300 }} value={subscribe}
              onChange={(value) => {
                setSubscribe(value)
                instanceMap(
                  [value]
                ).then((res) => {
                  initInstanceList(res)
                })
              }}
            >
              {
                groupList.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item}>{item}</Select.Option>
                  )
                })
              }
            </Select>
          </Col>
        </Row>
        {
          type == 1 && (
            <>
              <Row align="middle" gutter={[16, 16]}>
                <Col flex="40px">
                </Col>
                <Col flex="100px">
                  <Text>订阅服务名</Text>
                </Col>
                <Col flex="auto">
                  <Select defaultValue='' style={{ width: 300 }} value={subscribeInstance}
                    onChange={(value) => {
                      setSubScribeInstance(value)
                    }}
                  >
                    {
                      instanceList.map((item, index) => {
                        return (
                          <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                        )
                      })
                    }
                  </Select>
                </Col>
              </Row>
              <Divider orientation="left">部署参数</Divider>
              <Row gutter={[16, 16]}>
                <Col flex="40px">
                </Col>
                <Col flex="100px">
                  <Text>部署模式</Text>
                </Col>
                <Col flex="auto">
                  <Radio.Group name="radiogroup" defaultValue={1} value={gatewayType}
                    onChange={(e) => {
                      setGatewayType(e.target.value)
                    }}
                  >
                    <Radio value={1}>域网关模式</Radio>
                    <Radio value={2}>非域网关模式</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </>
          )
        }

        <Row gutter={[16, 16]}>
          <Col flex="40px">
          </Col>
          <Col>
            <Button icon={<CloudServerOutlined />}
              onClick={() => {
                setVisible(true);
                getRemoteConfig()
              }}
            >打开远程配置</Button>
          </Col>
          <Col>
            <Button icon={<DesktopOutlined />}
              onClick={() => {
                setVisible(true);
              }}
            >打开本地配置</Button>
          </Col>
        </Row>

        <Divider orientation="left">配置内容</Divider>
        <Row>
          <Col flex={1}>
            <TextArea rows={8} value={configContent}
              onChange={(e) => {
                setConfigContent(e.target.value)
              }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default service;
