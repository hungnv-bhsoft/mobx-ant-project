import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '../../../hooks/useStores';
import {
    Appbar,
    DashboardWrapper,
    ButtonDefault,
    MainWrapper,
    AsideWrapper,
    SectionWrapper
} from '../../common';

import { Menu, Button } from 'antd';

import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;



const DashBoard = observer(({ children }) =>  {
    const { userStore } = useStores();
    const [info,setInfo] = React.useState('');
    const [collapsed,setCollapsed] = React.useState(false);

    React.useEffect(() => {
        userStore.checkAdmin();
        if (userStore.jwToken !== null) {
            setInfo(userStore.jwToken);
        } else {
            setInfo('');
        }
    },[]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    return (
        <DashboardWrapper>
            <Appbar
            display="flex"
            justify="space-between"
            align="center"
            padding={`0rem 2rem`}
            >
                <h3>Hello : { info.user !== undefined ? info.user.username : '' } </h3>
                <ButtonDefault onClick={ () => userStore.logout() }>Logout</ButtonDefault>
            </Appbar>
            <MainWrapper>
                <AsideWrapper
                width="20%"
                height="100vh"
                postion="fixed"
                padding={`1rem`}
                overflowX="auto"
                bgColor="#fff"
                >
                    {/* <Button type="primary" onClick={toggleCollapsed} style={{ margin: '0 0 1.5rem 0' }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button> */}
                    <Menu
                    defaultOpenKeys={['sub3']}
                    mode="inline"
                    theme="white"
                    inlineCollapsed={collapsed}
                    >
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to="/dashboard">Home</Link>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<MailOutlined />} title="Manage Products">
                            <Menu.Item key="2">
                                <Link to="/getproducts">List Products</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                            <Link to="/createproduct">Create Products</Link>
                            </Menu.Item>
                            <Menu.Item key="4">Option 7</Menu.Item>
                            <Menu.Item key="5">Option 8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<MailOutlined />} title="Manage Categories">
                            <Menu.Item key="6">
                                <Link to="/setcategories">List Categories</Link>
                            </Menu.Item>
                            <Menu.Item key="7">Option 6</Menu.Item>
                            <Menu.Item key="8">Option 7</Menu.Item>
                            <Menu.Item key="9">Option 8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<MailOutlined />} title="Deep 3">
                                <Menu.Item key="10">Option 5</Menu.Item>
                                <Menu.Item key="11">Option 6</Menu.Item>
                                <Menu.Item key="12">Option 7</Menu.Item>
                                <Menu.Item key="13">Option 8</Menu.Item>
                                <Menu.Item key="14">Option 9</Menu.Item>
                                <Menu.Item key="15">Option 10</Menu.Item>
                                <Menu.Item key="16">Option 11</Menu.Item>
                                <Menu.Item key="17">Option 12</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<MailOutlined />} title="Deep 4">
                                <Menu.Item key="18">Option 13</Menu.Item>
                                <Menu.Item key="19">Option 14</Menu.Item>
                                <Menu.Item key="20">Option 15</Menu.Item>
                                <Menu.Item key="21">Option 16</Menu.Item>
                                <Menu.Item key="22">Option 17</Menu.Item>
                                <Menu.Item key="23">Option 18</Menu.Item>
                                <Menu.Item key="24">Option 19</Menu.Item>
                                <Menu.Item key="26">Option 20</Menu.Item>
                        </SubMenu>
                    </Menu>
                </AsideWrapper>
                <SectionWrapper
                margin={`0 0 0 20%`}
                padding={`1rem`}
                >
                    { children }
                </SectionWrapper>
            </MainWrapper>
        </DashboardWrapper>
    )
})

export default DashBoard;
