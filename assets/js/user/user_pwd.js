$(function () {
  let form = layui.form;
  let layer = layui.layer;




  // 给form添加自定义校验规则
  form.verify({
    // 密码的校验
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 新旧密码不能相同
    oldpass: (value) => {
      // console.log(value); // 新密码输入框的值
      // 获取原密码的值
      let oldPwd = $("[name=oldPwd]").val();

      if (value === oldPwd) {
        return "新密码不能和原密码一样！";
      }
    },

    // 新旧密码不能相同
    repass: (value) => {
      // console.log(value); // 新密码输入框的值
      // 获取原密码的值
      let newPwd = $("[name=newPwd]").val();

      if (value !== newPwd) {
        return "两次输入的新密码不相同！";
      }
    }

  });




  
  $(".use-pwd").on("submit", function (a) {
    a.preventDefault()//阻止默认跳转


    let data = $(this).serialize()  //获取data数据
    $.ajax({
      type:`POST`,
      url: `/my/updatepwd`,
      data,
      success:function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("更新密码失败！" + res.message);
        }
        layer.msg('更新密码成功,即将退出登录', {
          time: 2000 //2秒关闭（如果不配置，默认是3秒）
        }, function () {
        localStorage.removeItem("token")
        window.parent.location.href = "/home/login.html"
        });
      }
    })
  })






})