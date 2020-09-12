$(function () {

  var form = layui.form

  // 用户昵称输入框验证规则
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '用户昵称必须在 1~6 个字符'
      }
    }
  })

  // 获取用户基本信息
  inituserinfo()
  function inituserinfo() {
    $.ajax({
      url: '/my/userinfo',
      method: 'GET',
      success: function (res) {

        // 利用layui提供的方法给表单赋值，
        // input的name属性必须和后台数据的属性名一致
        form.val('userinfo', res.data)
      }
    })
  }

  // 点击重置按钮重新获取用户信息
  $('#resetBtn').on('click', function (e) {
    e.preventDefault()
    inituserinfo()
  })

  // 修改用户信息
  $('#changeUserInfo').submit(function (e) {
    e.preventDefault()

    $.ajax({
      url : '/my/userinfo',
      method : "POST",
      data : $(this).serialize(),
      success : function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }     
        
        window.parent.getUser()
      }
    })
  })


})