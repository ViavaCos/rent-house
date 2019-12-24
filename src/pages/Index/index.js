import React from 'react'

// Carousel 走马灯(轮播图) |  Flex Flex布局  |  WingBlank 两翼留白  |  Grid 宫格    
import { Carousel, Flex, WingBlank, Grid } from 'antd-mobile';
// import axios from 'axios'
import http from '../../api/index'
import './index.scss'
// 导入图片基准地址
import { BASE_IMG_URL } from '../../utils/index'

import img1 from '../../assets/images/nav-1.png'
import img2 from '../../assets/images/nav-2.png'
import img3 from '../../assets/images/nav-3.png'
import img4 from '../../assets/images/nav-4.png'

class Index extends React.Component {
    state = {
        // 轮播图数据
        carouselData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        imgHeight: 476,
        // 导航栏数据
        navData: [
            { title: '整租', imgPath: img1 },
            { title: '合租', imgPath: img2 },
            { title: '地图找房', imgPath: img3 },
            { title: '去出租', imgPath: img4 },
        ],
        // 租房小组数据
        groupsData: [],
        // 最新资讯数据
        newsData: []
    }
    componentDidMount () {
        this.getCarouselData()
        this.getGroupsData()
        this.getNewsData()
    }

    // 获取轮播图数据
    getCarouselData = async () => {
        const res = await http.get('/home/swiper')
        // console.log(res);
        this.setState({
            carouselData: res.body
        })



    }
    // 获取租房小组数据
    getGroupsData = async () => {
        const res = await http.get('/home/groups');
        // console.log(res)
        this.setState({
            groupsData: res.body
        })
    }
    // 获取最新资讯数据
    getNewsData = async () => {
        const res = await http.get('/home/news');
        console.log(res);
        this.setState({
            newsData: res.body
        })
    }

    // 渲染导航列表
    renderNav = () => {
        return this.state.navData.map(item => (
            <Flex.Item key={item.title}>
                <img src={item.imgPath} alt="图片无法显示" />
                <p>{item.title}</p>
            </Flex.Item>
        ))
    }
    // 渲染最新资讯
    renderNews = () => {
        return this.state.newsData.map(item => (
            <div className="news-item" key={item.id}>
                <div className="imgwrap">
                    <img
                        className="img"
                        src={`http://localhost:8080${item.imgSrc}`}
                        alt=""
                    />
                </div>
                <Flex className="content" direction="column" justify="between">
                    <h3 className="title">{item.title}</h3>
                    <Flex className="info" justify="between">
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </div>
        ))
    }

    render () {
        return (
            <div className="wrapper">
                {/* 轮播图区域 */}
                <Carousel
                    autoplay={true}
                    infinite
                // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                // afterChange={index => console.log('slide to', index)}
                >
                    {this.state.carouselData.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`${BASE_IMG_URL}${val.imgSrc}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>

                {/* 导航栏区域 */}
                <div className="home-menu">
                    <WingBlank>
                        <Flex>
                            {this.renderNav()}
                        </Flex>
                    </WingBlank>
                </div>

                {/* 租房小组标题 */}
                <div className="group">
                    <Flex className="group-title" justify="between">
                        <h3>租房小组</h3>
                        <span>更多</span>
                    </Flex>
                </div>

                {/* 租房小组内容 */}
                <Grid
                    className="group"
                    data={this.state.groupsData}
                    columnNum={2}
                    square={false}
                    // 是否有框线
                    hasLine={false}
                    renderItem={item => {
                        return (
                            <Flex key={item.id} className="grid-item" justify="between">
                                <div className="desc">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                            </Flex>
                        )
                    }}
                />

                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div>
            </div>
        );
    }
}

export default Index