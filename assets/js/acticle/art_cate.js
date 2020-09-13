$(function () {

  var layer = layui.layer
  // 获取文章列表
  getArt()
  function getArt() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 创建模板引擎
        var tableHtml = template('table', res)
        $('tbody').html(tableHtml)
      }
    })
  }

  // 添加类别弹出层
  var indexAdd = null
  $("#addBtn").on("click", function () {

    indexAdd = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '添加文章分类',
      content: $("#addArtForm").html(),
    });

  })

  // 添加类别，通过事件委托给弹出层表单注册submit事件
  $('body').on('submit', '#addForm', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 提示信息
        layer.msg(res.message)
        // 重新渲染页面
        getArt()
        // 关闭弹出层
        layer.close(indexAdd)

      }
    })


  })



})