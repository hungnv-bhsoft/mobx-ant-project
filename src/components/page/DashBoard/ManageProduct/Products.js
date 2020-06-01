import React from 'react';
import { Table, Space, Button } from 'antd';
import Dashboard from '../Dashboard';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useStores } from '../../../../hooks/useStores';
import truncateString from '../../../../utils/truncate';


const { Column } = Table;

const Products = observer(() => {
    const { productStore } = useStores();
    React.useEffect(() => {
        productStore.getProducts();
    },[]);
    const data = [];
    for ( let i = 0 ; i < productStore.products.length; i++) {
        data.push({
            key : i,
            name : productStore.products[i].name,
            price : productStore.products[i].price + " $",
            cover : 'http://localhost:1337'+productStore.products[i].cover[0].formats.thumbnail.url,
            description : productStore.products[i].description,
            quantity : productStore.products[i].quantity,
            status : productStore.products[i].status,
            created_at : productStore.products[i].created_at,
            updated_at : productStore.products[i].updated_at
        });
    };
    // console.log(data);
    return (
        <Dashboard>
            {/* <MarginButton>
                <Create />
            </MarginButton> */}
            <Table dataSource={data} scroll={{ x: 1500, y: 600 }}>
                <Column title="Name" dataIndex="name" key="name" fixed="left"/>
                <Column title="Price" dataIndex="price" key="price" />
                <Column title="Status" dataIndex="status" key="status" />
                <Column title="Quantity" dataIndex="quantity" key="quantity" />
                <Column
                title="Image"
                dataIndex="cover"
                render={ cover => <img src={cover} alt={cover} /> }
                />
                <Column
                title="Description"
                dataIndex="description"
                render={ description => (
                    <>
                    <p>{truncateString(description,15)}</p>
                    <Button type="link">Read more</Button>
                    </>
                )}
                />
                <Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Space size="middle">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                    </Space>
                )}
                fixed="right"
                />
            </Table>
        </Dashboard>
    )
});

export default Products
