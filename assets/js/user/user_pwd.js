$(function () {

  var form = layui.form

  // 修改密码表单校验规则
  form.verify({
    pwd : [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],

    samePwd : function (value) {
      if (value === $('[name=oldPwd]').val()){
        return '新密码不能和旧密码一样'
      }
    },

    rePwd : function (value) {
      if (value !== $('[name=newPwd]').val()){
        return '两次新密码输入不一致'
      }
    }

  })

  // 修改密码信息
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url : '/my/updatepwd',
      method : 'POST',
      data : $(this).serialize(),
      success : function (res) {

        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }

        layui.layer.msg(res.message)
        // 重置表单
        $('.layui-form')[0].reset()
        // 清空token
        top.window.localStorage.removeItem('token')
        // 跳转到登录页面
        top.window.location.href = '/login.html'
      }
    })

  })

})