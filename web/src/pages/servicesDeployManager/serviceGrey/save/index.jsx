import { Button, Space} from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { CheckOutlined } from '@ant-design/icons';
import { constant } from 'lodash';


const serviceBlueGreenSave = () => {

  // 保存
 const save = () => {
  
 }

 return (
  <>
     <Space>
      <Button icon={<CheckOutlined />}
       onClick={() => {
        save();
       }}
      >保存</Button>
     </Space>
  </>
 );
};

export default serviceBlueGreenSave;
