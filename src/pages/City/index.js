import React from 'react'
import { NavBar, Icon, Toast } from 'antd-mobile'
import http from '../../api/index'
import './index.scss'
import { List, AutoSizer } from 'react-virtualized'
import { getLocation } from '../../utils/index'

class City extends React.Component {

    state = {
        cityList: [],
        firstLetterArr: [],
        currentLetterIndex: 0
    }

    componentDidMount () {
        // 添加加载中的提示
        Toast.loading('正在获取...', 0, null, true)
        this.getCityList()
    }

    // 获取城市列表数据
    getCityList = async () => {
        const res = await http.get('/area/city', { params: { level: 1 } })
        // console.log(res.body)
        let listObj = {}
        let firstLetterArr = []
        res.body.forEach(item => {
            firstLetterArr.push(item.short.charAt(0))
            listObj[item.short.charAt(0)] ? listObj[item.short.charAt(0)].push(item) : listObj[item.short.charAt(0)] = [item]
        })
        firstLetterArr = [...new Set(firstLetterArr)].sort()


        const ret = await http.get('/area/hot');
        // console.log(ret.body)
        firstLetterArr.unshift('hot')
        listObj.hot = ret.body

        firstLetterArr.unshift('#')
        // 动态获取当前城市信息
        const city = await getLocation()
        listObj['#'] = [city]

        // console.log(listObj)
        // console.log(firstLetterArr)

        this.setState({
            cityList: listObj,
            firstLetterArr
        })

        // 取消加载中的提示
        Toast.hide()
    }

    // 选择城市
    chooseCity = (item) => {
        // 存储当前选择的城市信息
        window.localStorage.setItem('currentCity', JSON.stringify(item))
        // 返回主页
        this.props.history.goBack()
    }

    // 渲染React长列表内部元素 【替代 渲染城市列表】
    rowRenderer = ({ key, index, style }) => {
        // console.log(key, index, style)
        const { firstLetterArr, cityList } = this.state;
        let letter = firstLetterArr[index];
        let list = cityList[letter];
        var listTag = null;
        if (letter === 'hot') {
            listTag = list.map((item, index) => (
                <div className="name" onClick={this.chooseCity.bind(this, item)} key={letter + index}>{item.label}</div>
            ))
        } else {
            listTag = list.map((item, index) => (
                <div className="name" onClick={() => {
                    Toast.info('暂无数据', 1, null, false)
                }} key={letter + index}>{item.label}</div>
            ))
        }
        return (
            // 注意：此处必须加style,不加就....贼诡异
            <div className="city" key={key} style={style}>
                <div className="title" key={key + letter}>{letter}</div>
                {listTag}
            </div >
        )

    }

    // 高度计算
    calculateHeight = ({ index }) => {
        // index为当前下标
        const { firstLetterArr, cityList } = this.state
        const letter = firstLetterArr[index]
        // console.log(letter);
        // console.log(cityList);

        // const num = (cityList[letter] && cityList[letter].length) || 2;
        const num = cityList[letter].length;
        // console.log(num);

        return 36 + 50 * num;
    }

    // 渲染城市列表 【作废】
    renderCityList = () => {
        const { cityList, firstLetterArr } = this.state
        return firstLetterArr.map((item, index) => (
            // <React.Fragment>
            <div className="city" key={item}>
                <div key={item.value + firstLetterArr + index} className="title">{item}</div>
                {cityList[item].map(item => {
                    return (
                        <div key={item.value + firstLetterArr} className="name">{item.label}</div>
                    )
                })}
            </div>
            // </React.Fragment>
        ))
    }

    // 渲染右侧索引
    renderRightIndex = () => {
        const { firstLetterArr, currentLetterIndex } = this.state
        return firstLetterArr.map((item, index) => (
            < li className="city-index-item" key={item} >
                {/* <span className='index-active'>A</span> */}
                {< span className={currentLetterIndex === index ? 'index-active' : ''} data-index={index}> {item === "hot" ? "热" : item}</span >}
            </li >
        ))
    }

    // 获取当前选中索引字母
    getCurrentLetterIndex = (e) => {
        let index = e.target.dataset && parseInt(e.target.dataset.index)
        // console.log(e.target.dataset && e.target.dataset.index)
        if (!e.target.dataset.index || index === this.state.currentLetterIndex) {
            return
        }
        // console.log(index, '+++++++++')
        // console.log(this.state.firstLetterArr.length - 1, '+++++++++this.state.firstLetterArr.length - 1')
        if (index === this.state.firstLetterArr.length - 1) {
            setTimeout(() => {
                // console.log("执行可")
                this.setState({
                    currentLetterIndex: index
                })
            }, 0)
        } else {
            this.setState({
                currentLetterIndex: index
            })
        }
    }

    // 获取长列表滚动位置
    getScrollLocation = ({ startIndex }) => {
        // console.log(overscanStartIndex, overscanStopIndex, startIndex, stopIndex)
        
        // if (startIndex === this.state.currentLetterIndex) {
        //     return
        // }

        // console.log(startIndex, '滚动事件触发');

        // setTimeout(() => {
        // this.setState({
        //     currentLetterIndex: startIndex
        // })
        // }, 1000)

        if (startIndex !== this.state.currentLetterIndex) {
            // console.log(startIndex, this.state.currentLetterIndex)
            this.setState({
                currentLetterIndex: startIndex
            })
        }
    }

    render () {
        return (
            <div>
                <NavBar
                    className="cityNavbar"
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                >城市选择</NavBar>
                <div className="cityList">
                    {/* <List
                        width={document.documentElement.clientWidth}
                        height={document.documentElement.clientHeight}
                        rowCount={15}
                        rowHeight={300}
                        rowRenderer={this.renderCityList}
                    /> */}
                    {/* {this.renderCityList()} */}
                    {/* 自动计算高度 */}
                    <AutoSizer>
                        {({ height, width }) => (
                            // <div>
                            //     宽度：{width}
                            //     高度：{height}
                            // </div>
                            <List
                                width={width}
                                height={document.documentElement.clientHeight}
                                rowCount={this.state.firstLetterArr.length}
                                rowHeight={this.calculateHeight}
                                // rowRenderer={this.renderCityList}
                                rowRenderer={this.rowRenderer}
                                // 滚动到指定索引位置
                                scrollToIndex={this.state.currentLetterIndex}
                                // 滚动的对齐方式 start:起始位置  center:中间位置  end:结束位置
                                scrollToAlignment="start"
                                // onRowsRendered 可以获取长列表滚动的位置  
                                onRowsRendered={this.getScrollLocation}
                            />
                        )}
                    </AutoSizer>

                    {/* 右侧索引列表 */}
                    <ul className="city-index" onClick={this.getCurrentLetterIndex}>
                        {this.renderRightIndex()}
                    </ul>
                </div>
            </div>
        )
    }
}
export default City