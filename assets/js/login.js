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
    $('.layui-form').on('submit',function(e){
       console.log(e);
    })
})