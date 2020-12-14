$.ajaxPrefilter(function (options) {
    options.url = `http://ajax.frontend.itheima.net${options.url}`
})
// 全局根路径