import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
// import FilterMore from '../FilterMore'
import http from '../../../../api/index'
import styles from './index.module.css'

export default class Filter extends Component {
  state = {
    // 显示级联菜单
    isShow: false,
    // 当前选中菜单
    currentSelectMenu: '',
    // 高亮项
    // isHeighLight: false,
    // 子级城市菜单
    filterMenuData: {},
    // 级联菜单列数
    col: 3,
    // 级联菜单内容
    area: '',
    mode: '',
    price: ''
  }

  componentDidMount () {
    this.getFilterMenuData()
  }

  // 菜单栏点击事件
  handleClick = (type) => {
    // console.log(type)
    if (type === 'area' || type === 'mode' || type === 'price') {
      this.setState({
        isShow: true,
        // isHeighLight: {},
        currentSelectMenu: type
      })
      // const { area, mode, price } = this.state
      switch (type) {
        case 'area':
          this.setState({
            col: 3,
            // isHeighLight: !!area
          })
          break;

        case 'mode':
          this.setState({
            col: 1,
            // isHeighLight: !!mode
          })
          break;

        case 'price':
          this.setState({
            col: 1,
            // isHeighLight: !!price
          })
          break;

        default:
          break;
      }
    }
    if (type === 'more') {
      this.setState({
        isShow: false
      })
    }
  }

  // 级联菜单取消按钮
  handleCancel = () => {
    this.setState({
      isShow: false
    })
  }

  // 级联菜单确定按钮
  handleSave = (value, type) => {

    // console.log(value)

    this.setState({
      isShow: false,
      [type]: value

    }, () => {
      // console.log(this.state[type])
    })
  }

  // 获取子级城市列表
  getFilterMenuData = async () => {
    let data = window.localStorage.getItem('currentCity');
    const { value } = JSON.parse(data)


    const res = await http.get('/houses/condition', { params: { id: value } })
    // console.log(res)
    this.setState({
      filterMenuData: res.body
    })
  }

  render () {

    const { isShow, currentSelectMenu, filterMenuData, col, area, mode, price } = this.state

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle handleClick={this.handleClick} isHeighLight={{ area, mode, price }} />

          {/* 前三个菜单对应的内容： */}
          {isShow && <FilterPicker
            key={currentSelectMenu}
            filterMenuData={filterMenuData}
            handleCancel={this.handleCancel}
            handleSave={this.handleSave}
            currentSelectMenu={currentSelectMenu}
            col={col}
            defaultVal={{ area, mode, price }}
          />}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
