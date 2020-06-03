import React from 'react';
import { Table, Space, Button ,Popconfirm, message } from 'antd';
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
    }, []);
    const data = [];
    for ( let i = 0 ; i < productStore.products.length; i++) {
        const {
            id,
            name,
            price,
            cover,
            description,
            quantity,
            status,
            created_at,
            updated_at
        } = productStore.products[i];
        // console.log(toJS(cover[0].formats.thumbnail.url));
        data.push({
            key: i,
            id,
            name,
            price: price + ' $',
            cover : 'http://localhost:1337'+cover[0].formats.thumbnail.url || null,
            description,
            quantity,
            status,
            created_at,
            updated_at
        });
    };
    // console.log(data);

    const cancel = () => message.error('Delete Failed!');

    return (
        <Dashboard>

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
                    <p>{description ? truncateString(description,15) : ''}</p>
                    <Button type="link">Read more</Button>
                    </>
                )}
                />
                <Column
                title="Action"
                dataIndex="id"
                key="action"
                render={ id => (
                    <Space size="middle">
                    <Button>Edit</Button>
                        <Popconfirm
                        title="Are you sure delete this product?"
                        onConfirm={()=> {
                            productStore.deleteProduct(id);
                            message.success(`Delete success`);
                        }}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                        <Button >Delete</Button>
                    </Popconfirm>
                    </Space>
                )}
                fixed="right"
                />
            </Table>
        </Dashboard>
    )
});

export default Products
