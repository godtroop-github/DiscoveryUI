import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Select, Dropdown, Tabs, Input } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { FolderOpenOutlined, DesktopOutlined, CloudServerOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { Title, Text, Link } = Typography;
import { groups, instanceMap } from '@/services/console'
const { TextArea } = Input;

const service = () => {

  const [visible, setVisible] = useState(false);
  const [groupList, setGroupList] = useState([])
  const [type, setType] = useState();
  const [subscribe, setSubscribe] = useState();
  const [instanceList, setInstanceList] = useState([]);
  const [subscribeInstance, setSubScribeInstance] = useState();
  const [gatewayType, setGatewayType] = useState();
  const [configContent, setConfigContent] = useState();


  // 新建 - 确定
  const addSubmit = () => {
    setVisible(false);
  }

  // 初始化服务组列表
  const init = () => {
    setVisible(true);
    // 获取服务器组列表
    groups().then((res) => {
      setGroupList(res)
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
  }

  return (
    <>
      <Space>
        <Button icon={<FolderOpenOutlined />}
          onClick={init}
        >打开</Button>
      </Space>

      <Modal visible={visible}
        title={"打开配置[全链路服务蓝绿发布]"}
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
          <Col auto>
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
          <Col auto>
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
                    <Option value={item}>{item}</Option>
                  )
                })
              }
            </Select>
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 16]}>
          <Col flex="40px">
          </Col>
          <Col flex="100px">
            <Text>订阅服务名</Text>
          </Col>
          <Col auto>
            <Select defaultValue='' style={{ width: 300 }} value={subscribeInstance}
              onChange={(value) => {
                setSubScribeInstance(value)
              }}
            >
              {
                instanceList.map((item, index) => {
                  return (
                    <Option value={item.name}>{item.name}</Option>
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
          <Col auto>
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
        <Row gutter={[16, 16]}>
          <Col flex="40px">
          </Col>
          <Col>
            <Button icon={<CloudServerOutlined />}
              onClick={() => {
                setVisible(true);
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
              onchange={(e) => {
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
