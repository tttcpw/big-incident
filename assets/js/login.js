$(function () {
    
$(".logins").on("click",function () {
    $(".register").show();
    $(".login").hide()
})
$(".registers").on("click",function () {
    $(".register").hide()
    $(".login").show()
})


let form = layui.form;
let layer = layui.layer;
form.verify({
  username: function(value, item){ //value：表单的值、item：表单的DOM对象
    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      return '用户名不能有特殊字符';
    }
    if(/(^\_)|(\__)|(\_+$)/.test(value)){
      return '用户名首尾不能出现下划线\'_\'';
    }
    if(/^\d+\d+\d$/.test(value)){
      return '用户名不能全为数字';
    }
    
    //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
    if(value === 'xxx'){
      alert('用户名不能为敏感词');
      return true;
    }
  },
  respass:function(value, item){
      let newpwd = $(".newpwd").val().trim();
      if (value !== newpwd) {
       return '两次密码输入不一样！'
      }
    }
  
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  ,pass: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ] 
}); 


$("#register-botton").on("submit",function (a) {
    a.preventDefault()
    let data = $(this).serialize().trim();
    $.ajax({
        type:`POST`,
        url:`/api/reguser`,
        data,
        success:function (res) {
            if (res.status !== 0) {
            return layer.msg(res.message); 
            }
            layer.msg(res.message, {
              time: 2000
            }, function(){
              $("#register-botton")[0].reset();
              $(".registers").click()
            }); 
            
        }
    })


})

$("#logo-top").on("submit",function (a) {
    a.preventDefault()
    let data = $(this).serialize().trim();
    $.ajax({
        type:`POST`,
        url:`/api/login`,
        data,
       success:function (res) {
            if (res.status !== 0) {
              return layer.msg(res.message); 
            }


            localStorage.setItem("token",res.token)
            // 获得token


            layer.msg(
            res.message, 
            {
            time: 2000
            },
            function(){
                location.href = "/home/index.html"
            }); 
            
        }
    })
})




})