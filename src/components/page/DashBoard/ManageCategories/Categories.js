import React, { useEffect} from 'react';
import { EditOutlined ,DeleteOutlined } from '@ant-design/icons';
import { Table, Space , Popconfirm, message} from 'antd';
import Update from './Update';
import DashBoard from '../Dashboard';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useStores } from '../../../../hooks/useStores';

const Categories = observer(() => {
    const { categoriesStore } = useStores();

    useEffect(() => {
      categoriesStore.getCategories();
    },[]);

    function cancel(e) {
      console.log(e);
      message.error('Click on No');
    }

    // console.log(toJS(categoriesStore.categories));
    const categories = categoriesStore.categories;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <p>{text}</p>,
      },
      {
        title: 'Action',
        dataIndex : 'id',
        key: 'action',
        render: id => (
          <Space size="middle">
            <EditOutlined onClick={() => alert(1)} />
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
          </Space>
        ),
      },
    ];

    const data = [];
    for(let i = 0; i < categories.length; i++) {
        data.push({
          key: i,
          id: categories[i].id,
          name: categories[i].name
        });

    }

    return (
        <DashBoard>
            <h3>List Categories</h3>
            <Table columns={columns} dataSource={data} />
        </DashBoard>
    )
});

export default Categories;
