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

    var form = layui.form
    var layer = layui.layer

    //表单验证规则
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

    // 注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()

        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function (res) {

            if (res.status !== 0) {
                return layer.msg(res.message);
            }

            layer.msg('注册成功，请登录！')

            $('#login_btn').click()
        })

    })

    // 登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }

                localStorage.setItem('token', res.token)
                location.href = '../../index.html'
            }
        })
    })
}) 