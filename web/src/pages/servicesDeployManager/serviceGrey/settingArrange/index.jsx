import { constant } from 'lodash';
import { Select, Space, Row, Col, Button } from 'antd';
import React, { useState } from 'react';

import { RedoOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

import { instanceMap } from '@/services/console'

const settingArrange = (props) => {

  const gobal = props.gobal;

  const [instanceList, setInstanceList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [instance, setInstance] = useState()
  const [grayService, setGrayService] = useState()
  const [stableService, setStableService] = useState()

  const addInstance = () => {
    if (instance) {
      props.add({
        subscribeInstance: instanceList.find(i => i.name == instance),
        arrange: {
          name: instance,
          grayService,
          stableService
        }
      })
    }
  }

  const editInstance = () => {
    if (instance) {
      props.edit({
        arrange: {
          name: instance,
          grayService,
          stableService
        }
      })
    }
  }

  const initInstanceList = (instanceMap) => {
    let list = []
    for (var instanceName in instanceMap) {
      list.push({
        name: instanceName,
        value: instanceMap[instanceName]
      })
    }
    setInstanceList(list)
    if (list.length > 0 && !instance) {
      setInstance(list[0].name)
    }
  }

  useEffect(() => {
    if (gobal.subscribe) {
      instanceMap([gobal.subscribe]).then(initInstanceList)
    }
  }, [gobal])

  useEffect(() => {
    let _instance = instanceList.find(i => i.name == instance)
    if (_instance) {
      if (!_instance.value.find(i => i.version == 'default')) {
        _instance.value.push({
          version: 'default'
        })
      }
      
      setServiceList(_instance.value)
      if (_instance.value.length > 0) {
        setGrayService(_instance.value[0].version)
        setStableService(_instance.value[0].version)
      }
    }

  }, [instance])

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
          <Col flex="40px">服务</Col>
          <Col flex="310px">
            <Select
              style={{ width: "100%" }}
              value={instance}
              onChange={(value) => {
                setInstance(value)
              }}
              showSearch>
              {
                instanceList.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                  )
                })
              }
            </Select>
          </Col>
          <Col flex={1}>
            <Button type="primary" shape="circle" icon={<RedoOutlined />} />
          </Col>
        </Row>
        <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
          <Col flex="40px">灰度</Col>
          <Col flex="310px">
            <Select
              style={{ width: "100%" }}
              value={grayService}
              onChange={(value) => {
                setGrayService(value)
              }}
              showSearch>
                {
                serviceList.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.version}>{item.version}</Select.Option>
                  )
                })
              }
            </Select>
          </Col>
        </Row>
        <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
          <Col flex="40px">稳定</Col>
          <Col flex="310px">
            <Select
              style={{ width: "100%" }}
              value={stableService}
              onChange={(value) => {
                setStableService(value)
              }}
              showSearch>
                {
                serviceList.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.version}>{item.version}</Select.Option>
                  )
                })
              }
            </Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Space>
              <Button type="primary" shape="round" icon={<EditOutlined />} onClick={addInstance}>
                添加
                  </Button>
              <Button type="primary" shape="round" icon={<EditOutlined />} onClick={editInstance}>
                修改
                  </Button>
            </Space>

          </Col>
        </Row>
      </Space>
    </>
  )
}

export default settingArrange;