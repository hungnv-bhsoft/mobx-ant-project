import React from 'react';
import { Link } from 'react-router-dom';
// import List from '../../list/List';
// import Item from '../../list/Item';
import styled from 'styled-components';
// import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';

const LinkStyle = styled(Link)`
    color : ${ ({ theme}) => theme.colors.textDark };
`;

const Spinner = styled.div`
    text-align: center;
    font-size: 2rem;
`;

const Block = styled.div`
    width: 100%;
    text-align: center;
    background-color: #fff;
    display: block;
    /* border: 1px solid red; */
`;
const BlockHead = styled.div`
    width: 100%;
`;
const BlockBody = styled.div`
    padding: 1rem 0;
`;
const Img = styled.img`
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-bottom : 1px solid #ddd;
`;

const ShowProduct = observer( ({ products, priceVND ,loading}) => {
    // console.log(toJS(props));
    return  loading ? <Spinner>Loading...</Spinner> : (
            <Row
            justify="start"
            gutter={[{ xs: 8, sm: 16, md: 24 }, { xs: 8, sm: 16, md: 24 }]}
            >
            {products !== undefined && products.map( product => {
                return <Col
                        key={product.id}
                        // className="gutter-row"
                        lg={{ span : 6 }}
                        md={{ span: 8 }}
                        sm={{ span: 8 }}
                        xs={{ span : 12}} >
                            <LinkStyle to={`product/${product.id}`}>
                            <Block>
                                <BlockHead>
                                    <Img src={product.images[0]} alt={'coffee hot'} />
                                </BlockHead>
                                <BlockBody>
                                    <h3>{product.name}</h3>
                                    <div>{product.price} $</div>
                                </BlockBody>
                            </Block>
                            </LinkStyle>
                        </Col>
                })}
            </Row>
        );
});

export default ShowProduct
