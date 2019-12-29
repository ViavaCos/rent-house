import React from 'react'
import { Flex } from 'antd-mobile'
import './index.scss'
import { getLocation } from '../../utils/index'
import styles from './components/FilterTitle/index.module.css'
import Filter from './components/Filter/index'

class Find extends React.Component {

    state = {
        currentCity: '',
        titleList: [
            { title: '区域', type: 'area' },
            { title: '方式', type: 'mode' },
            { title: '租金', type: 'price' },
            { title: '筛选', type: 'more' }
        ]
    }

    // 获取城市列表
    getCity = async () => {
        const res = await getLocation()
        // console.log(res);
        this.setState({
            currentCity: res.label
        })

    }

    componentDidMount () {
        this.getCity()
    }

    renderMenu = () => {
        return this.state.titleList.map(item => (
            <Flex.Item key={item.type}>
                <span className={styles.dropdown}>
                    <span>{item.title}</span>
                    <i className="iconfont icon-arrow" />
                </span>
            </Flex.Item>
        ))
    }

    render () {
        return (
            <React.Fragment>
                <Flex className='header'>
                    <i className="iconfont icon-back" />
                    <Flex className='search-box searchHeader'>
                        {/* 左侧白色区域 */}
                        <Flex className="search">
                            {/* 位置 */}
                            <div className="location" >
                                <span className="name">{this.state.currentCity}</span>
                                <i className="iconfont icon-arrow" />
                            </div>

                            {/* 搜索表单 */}
                            <div className="form" >
                                <i className="iconfont icon-seach" />
                                <span className="text">请输入小区或地址</span>
                            </div>
                        </Flex>
                        {/* 右侧地图图标 */}
                        <i className="iconfont icon-map" />
                    </Flex>
                </Flex>
                {/* 菜单布局 */}
                {/* {this.renderMenu()} */}
                <Filter />
            </React.Fragment>
        )
    }
}
export default Find