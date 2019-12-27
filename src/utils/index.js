import http from '../api/index'


// 图片基准地址
export const BASE_IMG_URL = 'http://localhost:8080'

// IP定位获取地址
export const getLocation = () => {

    return new Promise((resolve) => {
        let currentCity = window.localStorage.getItem('currentCity');
        if (currentCity) {
            currentCity = JSON.parse(currentCity);
            resolve(currentCity);
        } else {
            // 通过定位获取城市名称
            var myCity = new window.BMap.LocalCity();
            myCity.get(async (result) => {
                // 根据城市名称获取具体城市信息
                const cityObj = await http.get('/area/info', { params: { name: result.name } })
                // 将获取到的城市信息存放在本地
                window.localStorage.setItem('currentCity', JSON.stringify(cityObj.body))
                resolve(cityObj.body);
            });

        }
    })
}