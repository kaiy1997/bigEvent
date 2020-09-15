$(function () {
  var form = layui.form
  var layer = layui.layer
  // 初始化富文本
  initEditor()

  // 1. 初始化图片裁剪器
  var $image = $('#image')
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  // 3. 初始化裁剪区域
  $image.cropper(options)


  // 渲染文章分类列表
  xrArtList()
  function xrArtList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var artList = template('tpl_artList', res)
        $('#artList').html(artList)
        form.render()
      }
    })

  }


  // 点击选择封面
  $('#coverBtn').on('click', function () {
    $('[type=file]').click()
    $('[type=file]').on('change', function (e) {
      // 将图片转换成url
      var newImg = URL.createObjectURL(e.target.files[0])
      $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImg)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
    })


  })

  // 发布文章
  // 处理发布的数据
  var art_state = '已发布'
  $('#draftBtn').click(function () {
    art_state = '草稿'
  })


  $('#pub_art').on('submit', function (e) {
    e.preventDefault()
    var fd = new FormData($(this)[0])
    fd.append('state', art_state)
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        fd.append('cover_img',blob)
        // 调用发布文章请求
        pubArt(fd)
      })
  })

  // 发布文章请求
  function pubArt (fd) {
    $.ajax({
      method : 'POST',
      url : '/my/article/add',
      data : fd,
      contentType : false,
      processData : false,
      success : function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        location.href = '/article/art_list.html'
      }
    })
  }



})