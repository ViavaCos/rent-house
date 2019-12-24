// 主页组件
import React from 'react'

import { TabBar } from 'antd-mobile';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: true,
            tabBarData: [
                {
                    title: "主页",
                    key: 'index',
                    icon: 'icon-ind'
                },
                {
                    title: "找房",
                    key: 'find',
                    icon: 'icon-ind'
                },
                {
                    title: "资讯",
                    key: 'news',
                    icon: 'icon-ind'
                }, {
                    title: "我的",
                    key: 'mine',
                    icon: 'icon-ind'
                }
            ]
        };
    }

    componentDidMount () {
        this.getTabBarData()
    }

    // 获取底部tab栏数据
    getTabBarData () {

    }

    // 渲染底部tab栏
    renderTabBar = () => {
        return this.state.tabBarData.map(item => (

            <TabBar.Item
                title={item.title}
                key={item.key}
                icon={<i className={`iconfont ${item.icon}`}></i>}
                selectedIcon={<i className="iconfont icon-ind"></i>}
                selected={this.state.selectedTab === item.key}
                onPress={() => {
                    this.setState({
                        selectedTab: item.key,
                    });
                }}
                data-seed="logId"
            >
                <div>zhu</div>
            </TabBar.Item>

        ))
    }

    render () {

        return (
            <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
                <TabBar>
                    {this.renderTabBar()}
                </TabBar>
            </div>
        );
    }
}


export default Home