import React, { useState } from 'react';
import { EditOutlined  } from '@ant-design/icons';
import { Modal, Button } from 'antd';



const UpdateCategorie = () => {
  const [visible,setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };
  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

  return (
    <div>
        <Button type="primary" onClick={showModal}>
          <EditOutlined />
        </Button>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    </div>
  )
}

export default UpdateCategorie;
