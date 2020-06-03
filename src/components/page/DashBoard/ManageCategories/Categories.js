import React, { useEffect} from 'react';

import { Table, Space } from 'antd';
import Column from 'antd/lib/table/Column';
// import Update from './Update';
import DashBoard from '../Dashboard';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useStores } from '../../../../hooks/useStores';
import CreateCategorie from './Create';
import EditCategorie from './Edit';
import DeleteCategorie from './Delete';



const Categories = observer(() => {
    const { categoriesStore } = useStores();

    useEffect(() => {
      categoriesStore.getCategories();
    },[]);
    const categories = categoriesStore.categories;

    // console.log(toJS(categoriesStore.categories));
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
            <CreateCategorie />
            <Table dataSource={data} >
                <Column title="name" dataIndex="name" key="name" />
                <Column
                  title="Action"
                  dataIndex="id"
                  key="action"
                  render={ id => (
                    <Space size="middle">
                    <EditCategorie categories={categories} id={id} />
                    <DeleteCategorie id={id} />
                  </Space>
                  )}
                />
            </Table>
        </DashBoard>
    )
});

export default Categories;
