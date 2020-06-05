import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Table, Space, Button ,Popconfirm, message } from 'antd';
import { EditOutlined , DeleteOutlined } from '@ant-design/icons';
import Dashboard from '../Dashboard';
import { observer } from 'mobx-react';
import { useStores } from '../../../../hooks/useStores';
import truncateString from '../../../../utils/truncate';
import List from '../../../list/List';
import Item from '../../../list/Item';

const { Column } = Table;

const LinkStyle = styled(Link)`
    color : #333;
`;

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
            categories,
            quantity,
            status,
            created_at,
            updated_at
        } = productStore.products[i];
        // console.log(toJS(cover));
        const coverUrl = !cover ? '/uploads/thumbnail_img_placeholder_ff16fdc090.jpeg' : cover[0].formats.thumbnail.url;
        data.push({
            key: i,
            id,
            name,
            price: price + ' $',
            cover : 'http://localhost:1337'+coverUrl,
            description,
            categories,
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

            <Table dataSource={data} scroll={{ x: 1300, y: 600 }}>
                <Column title="Name" dataIndex="name" key="name" fixed="left"/>
                <Column title="Price" dataIndex="price" key="price" />
                <Column title="Status" dataIndex="status" key="status" />
                <Column title="Quantity" dataIndex="quantity" key="quantity" />
                <Column
                title="Categories"
                dataIndex="categories"
                key="categories"
                render={ categories => (
                  <List flexDirection="column">
                    { categories !== undefined && categories.map( categorie => (
                    <Item key={categorie.id}>
                      {categorie.name}
                    </Item>
                    ))}
                  </List>
                )}
                />
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
                    <LinkStyle to={`editproduct/${id}`}><EditOutlined /></LinkStyle>
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
                        <DeleteOutlined />
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
