$(function () {
  var form = layui.form
  var layer = layui.layer
  var q = {
    pagenum: 1, // 页码值
    pagesize: 2, // 每页显示的数据
    cate_id: '', // 文章分类的 Id
    state: '', // 文章的状态
  }

  // 渲染分类文章
  xrArt()
  function xrArt() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 数据总数
        var tr = template('tpl_tr', res)
        $('tbody').html(tr)
        // 渲染分页
        xrpage(res.total)
      }
    })

  }

  // 渲染所有分类
  xrList()
  function xrList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        var tr = template('tpl_list', res)
        $('[name=cate_id]').html(tr)
        form.render()
      }
    })

  }

  // 筛选功能
  $('#selectList').on('submit', function (e) {
    e.preventDefault()
    var newCate_id = $('[name=cate_id]').val()
    var newState = $('[name=state]').val()
    q.cate_id = newCate_id
    q.state = newState
    xrArt()
  })

  // 分页 
  function xrpage(total) {
    layui.use('laypage', function () {
      var laypage = layui.laypage;
      //执行一个laypage实例
      laypage.render({
        elem: 'test1', // 分页盒子
        count: total, // 数据总数
        limit: q.pagesize, // 每页显示的数据
        limits: [2, 3, 5, 10],//数据总数，从服务端得到
        curr: q.pagenum, // 页码值
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], // 分页布局
        jump: function (obj, first) {
          q.pagenum = obj.curr  // 获取最新的页码值
          q.pagesize = obj.limit // 获取每页显示的数据
          //页面初始化不执行
          if (!first) {
            xrArt()
          }
        }
      })
    })
  }

  // 删除功能
  $('body').on('click', '#removeBtn', function () {
    // 文章的Id
    var removeId = $(this).attr('removeId')
    // 当前页文章的数量
    var len = $('#removeBtn').length

    layer.confirm('确认删除文章?', function (index) {
      $.ajax({
        method: 'GET',
        url: `/my/article/delete/${removeId}`,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg(res.message)

          // 当文章的数量为1且页码值不等于1时，页码值减1
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          xrArt()
        }
      })
      // 关闭提示框
      layer.close(index);
    })

  })

  

})