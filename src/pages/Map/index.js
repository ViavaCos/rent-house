import React from 'react'

class testMap extends React.Component {

    state = {
        style: {
            height: '500px'
        }
    }

    getLocationViaIP = () => {
        // BMap 是百度地图开放平台里的对象，因为在index.html中引入了，所以可以在组件内访问window对象来获取这个实例。
        var map = new window.BMap.Map("test");
        var point = new window.BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);

        function myFun (result) {
            var cityName = result.name;
            map.setCenter(cityName);
            // alert("当前定位城市:" + cityName);
        }
        var myCity = new window.BMap.LocalCity();
        myCity.get(myFun);
    }

    componentDidMount(){
        this.getLocationViaIP()
    }

    render () {
        const { style } = this.state
        return (
            < div id="test" style={style} ></div >
        )
    }
}

export default testMap