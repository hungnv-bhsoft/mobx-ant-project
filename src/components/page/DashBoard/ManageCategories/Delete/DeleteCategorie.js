import React, { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../../../hooks/useStores';

const DeleteCategorie = observer(({id}) => {
  const { categoriesStore } = useStores();

  const cancel = () => message.error('Click on No');
  return (
    <>
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={()=> {
            categoriesStore.deleteCategorie(id);
            // alert(id);
            message.success(`Delete success`);
          }}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined/>
        </Popconfirm>
    </>
  )
});

export default DeleteCategorie
