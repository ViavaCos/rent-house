import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
// import FilterMore from '../FilterMore'

import styles from './index.module.css'

export default class Filter extends Component {
  state = {
    // 显示级联菜单
    isShow: false,
    // 当前选中菜单
    currentSelectMenu: '',
    // 高亮项
    isHeighLight: false
  }

  handleClick = (type) => {
    // console.log(type)
    if (type === 'area' || type === 'mode' || type === 'price') {
      this.setState({
        isShow: true,
        isHeighLight: type,
        currentSelectMenu: type
      })
    }
  }

  handleCancel = () => {
    this.setState({
      isShow: false
    })
  }

  handleSave = () => {
    this.setState({
      isShow: false
    })
  }

  render () {

    const { isShow, currentSelectMenu, isHeighLight } = this.state

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle handleClick={this.handleClick} isHeighLight={isHeighLight} />

          {/* 前三个菜单对应的内容： */}
          {isShow && <FilterPicker handleCancel={this.handleCancel} handleSave={this.handleSave} currentSelectMenu={currentSelectMenu} />}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
