import React from 'react'

import { Carousel, WingBlank } from 'antd-mobile';
import axios from 'axios'

class Index extends React.Component {
    state = {
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        imgHeight: 176
    }
    componentDidMount () {
        this.getCarouselData()
    }

    // 获取轮播图数据
    getCarouselData = async () => {
        const res = await axios.get('http://localhost:8080/home/swiper')
        // console.log(res);
        this.setState({
            data: res.data.body
        })

    }

    render () {
        return (
            <WingBlank>
                <Carousel
                    autoplay={true}
                    infinite
                // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                // afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`http://localhost:8080${val.imgSrc}`}
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
            </WingBlank>
        );
    }
}

export default Index