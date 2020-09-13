$(function () {

  var layer = layui.layer
  var form = layui.form
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

  // 修改类别弹出层,通过事件委托给编辑按钮注册点击事件
  var indexEdit = null
  $("body").on("click", '#btnEdit', function () {

    //设置弹出层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '修改文章分类',
      content: $("#editArtForm").html(),
    });

    // 获取编辑按钮上的Id值，用来获取后台数据并复制到弹出层表单
    var dataId = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: `/my/article/cates/${dataId}`,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }

        // 用layui提供的方法给指定表单赋值
        form.val('edit-form', res.data)

      }
    })

    // 根据Id值修改分类文章信息
    $('body').on('submit', '#editForm', function (e) {
      e.preventDefault()
      $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          // 提示信息
          layer.msg(res.message)
          // 关闭弹窗
          layer.close(indexEdit)
          // 渲染页面
          getArt()
        }
      })

    })

  })

  // // 删除文章类别
  $('body').on('click', '#removeBtn', function () {
    var dataId = $(this).siblings().attr('data-id')

    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: `/my/article/deletecate/${dataId}`,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg(res.message)
          layer.close(index)
          getArt()
        }
      })
    })
  })




})