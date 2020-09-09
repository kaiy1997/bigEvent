$(function () {
    // 点击注册按钮
    $('#reg_btn').on('click', function () {
        $('.reg').show()
        $('.login').hide()
    })
    // 点击登录按钮
    $('#login_btn').on('click', function () {
        $('.login').show()
        $('.reg').hide()
    })
    //表单验证规则
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一样'
            }
        }
    })
})