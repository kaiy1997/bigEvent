$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 统一hearders请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 身份验证
    options.complete = function (res) {
        localStorage.removeItem('token')
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            location.href = '../../login.html'
        }
    }
})