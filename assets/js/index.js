$(function () {

    var layer = layui.layer
    user()
    // 获取用户基本信息
    function user() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 渲染用户头像和名称
                reandTouxiang(res.data)
            },
        })
    }

    //渲染用户头像和名称
    function reandTouxiang(data) {
        // 渲染用户名
        var name = data.nickname || data.username
        $('.welcome').html('欢迎&nbsp;&nbsp;' + name)

        //渲染头像
        if (data.user_pic !== null) {
            $('.layui-nav-img').attr('src', data.user_pic).show()
            $('.text_touxiang').hide()
        } else {
            // 获取用户名首字母
            var first = name[0]
            $('.layui-nav-img').hide()
            $('.text_touxiang').html(first).show()
        }

    }

    // 退出功能
    $('.logoutBtn').click(function () {
        layer.confirm('是否确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 返回登录页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })

})