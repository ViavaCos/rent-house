// 主页组件
import React from 'react';

import { TabBar } from 'antd-mobile';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Home.css';

import Index from './Index/index'
import Find from './Find/index'
import News from './News/index'
import Mine from './Mine/index'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'index',
            tabBarData: [
                {
                    title: "主页",
                    key: 'index',
                    icon: 'icon-ind'
                },
                {
                    title: "找房",
                    key: 'find',
                    icon: 'icon-findHouse'
                },
                {
                    title: "资讯",
                    key: 'news',
                    icon: 'icon-infom'
                }, {
                    title: "我的",
                    key: 'mine',
                    icon: 'icon-my'
                }
            ]
        };
    }

    // 渲染底部tab栏
    renderTabBar = () => {
        return this.state.tabBarData.map(item => (

            <TabBar.Item
                title={item.title}
                key={item.key}
                icon={<i className={`iconfont ${item.icon}`}></i>}
                selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
                selected={this.state.selectedTab === item.key}
                onPress={() => {
                    this.setState({
                        selectedTab: item.key,
                    });
                    // console.log(this.props)
                    this.props.history.push(`/home/${item.key}`)
                }}
                data-seed="logId"
            >
            </TabBar.Item>
        ))
    }

    render () {

        return (
            <div className="Home-menu">
                {/* 顶部内容区域 */}
                <Switch>
                    <Redirect exact from='/home' to='/home/index' />
                    <Route path="/home/index" component={Index}></Route>
                    <Route path="/home/find" component={Find}></Route>
                    <Route path="/home/news" component={News}></Route>
                    <Route path="/home/mine" component={Mine}></Route>
                </Switch>

                {/* 底部tab栏区域 */}
                <TabBar>
                    {this.renderTabBar()}
                </TabBar>
            </div>
        );
    }
}


export default Home