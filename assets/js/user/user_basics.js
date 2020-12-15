$(function () {

    let form = layui.form;
    let layer = layui.layer;

    acquire()
    // 获取用户信息
    function acquire() {
        $.ajax({
            url: `/my/userinfo`,
            success: function (res) {
                console.log(res);
                
                form.val("form", res.data)
            }
        })
    }




    $(".del").on("click", function (a) {
        a.preventDefault();
        acquire()

    })

    // 重置按钮





    $(".use-bas").on("submit", function (a) {
          a.preventDefault();
        let data = $(this).serialize();

        $.ajax({
            type: `POST`,
            url: `/my/userinfo`,
            data,
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    layer.msg(res.message);
                }
               layer.msg('修改信息成功！');
               window.parent.getMessage()
            }
        })
    })











})