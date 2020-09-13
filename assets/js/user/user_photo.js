$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image")
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 给上传按钮添加点击事件
  $('#uploadImg').click(function () {
    // 触发上传文件按钮
    $('#file').click()

  })

  // 监听上传文件按钮发生改变
  $('#file').change(function (e) {
    // 通过事件对象获取上传的文件
    var files = e.target.files[0]
    // 将文件转换为url路径
    var imgUrl = URL.createObjectURL(files)

    // 根据新图片初始化裁剪区域
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', imgUrl)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域

  })

  // 上传图片
  $('#sureBtn').click(function () {

    // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')

    // 将图片上传到服务器
    $.ajax({
      url: '/my/update/avatar',
      method: 'POST',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg('头像更换成功！')
        // 重新渲染页面头像
        top.window.parent.getUser()
      }
    })


  })

})
