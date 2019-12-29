import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'
import http from '../../../../api/index'

// const province = [
//   {
//     label: '北京',
//     value: '01',
//     children: [
//       {
//         label: '东城区',
//         value: '01-1'
//       },
//       {
//         label: '西城区',
//         value: '01-2'
//       },
//       {
//         label: '崇文区',
//         value: '01-3'
//       },
//       {
//         label: '宣武区',
//         value: '01-4'
//       }
//     ]
//   },
//   {
//     label: '浙江',
//     value: '02',
//     children: [
//       {
//         label: '杭州',
//         value: '02-1',
//         children: [
//           {
//             label: '西湖区',
//             value: '02-1-1'
//           },
//           {
//             label: '上城区',
//             value: '02-1-2'
//           },
//           {
//             label: '江干区',
//             value: '02-1-3'
//           },
//           {
//             label: '下城区',
//             value: '02-1-4'
//           }
//         ]
//       },
//       {
//         label: '宁波',
//         value: '02-2',
//         children: [
//           {
//             label: 'xx区',
//             value: '02-2-1'
//           },
//           {
//             label: 'yy区',
//             value: '02-2-2'
//           }
//         ]
//       },
//       {
//         label: '温州',
//         value: '02-3'
//       },
//       {
//         label: '嘉兴',
//         value: '02-4'
//       },
//       {
//         label: '湖州',
//         value: '02-5'
//       },
//       {
//         label: '绍兴',
//         value: '02-6'
//       }
//     ]
//   }
// ]

export default class FilterPicker extends Component {

  state = {
    area: '',
    mode: '',
    price: '',
    more: '',
    // 默认值
    defaultValue: null
  }

  componentDidMount () {
    this.getRenderData()
  }

  // 获取筛选菜单数据
  getRenderData = () => {
    // console.log(this.props.currentSelectMenu)
    // console.log(this.props.filterMenuData)
    // this.getHouseData()
    const { area, subway, rentType, price } = this.props.filterMenuData
    this.setState({
      area: [area, subway],
      mode: rentType,
      price
    })
  }

  // 获取房源信息
  getHouseData = async () => {
    const res = await http.get('/houses')
    console.log(res)
  }

  // 筛选条件数据
  getData = (defaultValue) => {
    // console.log(val);
    // console.log(type);

    this.setState({
      defaultValue
    })

  }

  render () {
    const { handleCancel, handleSave, currentSelectMenu, col, defaultVal } = this.props

    // console.log(defaultVal);
    

    let { defaultValue } = this.state
    let renderData = this.state[currentSelectMenu] || []
    // console.log(renderData)

    return (
      <>
        {/* 选择器组件：  data 规定渲染的数据 | value 当前组件的值 | cols 当前组件的列数 */}
        <PickerView data={renderData} value={defaultValue || defaultVal[currentSelectMenu] } cols={col} onChange={this.getData} />

        {/* 底部按钮 */}
        <FilterFooter handleCancel={handleCancel} handleSave={() => { handleSave(defaultValue, currentSelectMenu) }} />
      </>
    )
  }
}
