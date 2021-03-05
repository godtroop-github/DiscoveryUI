import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Select, Dropdown, Tabs, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
import { groups, instanceMap } from '@/services/console'
const { Title, Text, Link } = Typography;

const serviceBlueGreenAdd = (props) => {

  const [groupList, setGroupList] = useState([])
  const [visible, setVisible] = useState(false);
  const [subscribe, setSubscribe] = useState();
  const [instanceList, setInstanceList] = useState([]);
  const [subscribeInstance, setSubScribeInstance] = useState();
  const [type, setType] = useState(1)
  const [deployArgs, setDeployArgs] = useState(1)
  const [publishArgs, setPublishArgs] = useState(1)

  // 新建 - 确定
  const addSubmit = () => {
    setVisible(false);
    props.new({
      type,
      subscribe,
      subscribeInstanceKey: instanceList.find(i => i.name == subscribeInstance),
      subscribeInstance: [],
      arrange: [],
      deployArgs,
      publishArgs
    })

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

  // 初始化服务组列表
  const init = () => {
    setVisible(true);
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
        <Button icon={<PlusOutlined />}
          onClick={init}
        >新增</Button>
      </Space>

      <Modal visible={visible}
        onOk={addSubmit}
        onCancel={() => {
          setVisible(false);
        }}
        title={"新建配置[全链路服务灰度发布]"}
      >
        <Divider orientation="left">订阅参数</Divider>

        <Row gutter={[16, 16]}>
          <Col flex="40px">
          </Col>
          <Col flex="100px">
            <Text>订阅类型</Text>
          </Col>
          <Col flex={'auto'}>
            <Radio.Group name="radiogroup" defaultValue={1} value={type}
              onChange={(e) => {
                setType(e.target.value)
              }}>
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
          <Col flex={'auto'}>
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
        <Row align="middle" gutter={[16, 16]}>
          <Col flex="40px">
          </Col>
          <Col flex="100px">
            <Text>订阅服务名</Text>
          </Col>
          <Col flex={'auto'}>
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
          <Col flex={'auto'}>
            <Radio.Group name="radiogroup" defaultValue={1} value={deployArgs}
              onChange={(e) => {
                setDeployArgs(e.target.value)
              }}>
              <Radio value={1}>域网关模式</Radio>
              <Radio value={2}>非域网关模式</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Divider orientation="left">发布参数</Divider>
        <Row gutter={[16, 16]}>
          <Col flex="40px">
          </Col>
          <Col flex="100px">
            <Text>发布策略</Text>
          </Col>
          <Col flex={'auto'}>
            <Radio.Group name="radiogroup" defaultValue={1} value={publishArgs}
              onChange={(e) => {
                setPublishArgs(e.target.value)
              }}>
              <Radio value={1}>版本策略</Radio>
              <Radio value={2}>区域策略</Radio>
            </Radio.Group>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default serviceBlueGreenAdd;
