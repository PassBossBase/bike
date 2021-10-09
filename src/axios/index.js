import { Modal } from "_antd@3.26.20@antd";
import axios from "_axios@0.21.4@axios"
import Utils from '../utils'
export default class Axios {
    static requestList(_this, url, params, isMock) {

        var data = {
            params: params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then(data => {
            if (data && data.result) {
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                })
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    //请求方法
    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading')
            loading.style.display = 'block'
        }
        let baseApi="";
        //根据是否需要mock加载不同的Api
        if (options.isMock) {
            baseApi = 'https://mock.mengxuegu.com/mock/613b13f625a0294d53656200/example'
        }else{
            baseApi = 'https://mock.mengxuegu.com/mock/613b13f625a0294d53656200/example'

        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ""
            }).then((response) => {

                if (response.status === 200) {

                    let res = response.data;
                    if (res.code === 0) {
                        if (options.data && options.data.isShowLoading !== false) {
                            loading = document.getElementById('ajaxLoading')
                            loading.style.display = 'none'
                        }
                        resolve(res)
                    } else {
                        Modal.info({
                            title: '提升',
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        });
    }

}