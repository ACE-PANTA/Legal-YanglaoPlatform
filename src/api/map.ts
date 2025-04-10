import axios from 'axios'

const KEY = 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2'

export const getDistrictList = async (id = 0) => {
    try {
        const response = await axios.get(`https://apis.map.qq.com/ws/district/v1/getchildren`, {
            params: {
                key: KEY,
                id: id
            }
        })
        if (response.data.status === 0) {
            return response.data.result[0]
        }
        return []
    } catch (error) {
        console.error('获取区域数据失败:', error)
        return []
    }
}
