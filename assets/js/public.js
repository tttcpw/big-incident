$.ajaxPrefilter(function (options) {
    options.url = `http://ajax.frontend.itheima.net${options.url}`,
    options.headers = {
        Authorization:localStorage.getItem("token")  //全局获取token信息
    }
})
// 全局根路径