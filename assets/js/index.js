getMessage()

function getMessage() {
 let layer = layui.layer;
$.ajax({
    url:"/my/userinfo",
    success:function (res) {
        if (res.status !== 0) {
            return layer.msg("获取用户信息失败");
        }

      // 渲染出来头像和昵称
      // 注意点：
      // 1. 如果有头像的话，展示头像，没有的话，展示文字头像
      // 2. 如果有nickname，优先展示nickname，否则才展示username
let name = res.data.nickname || res.data.username  // 优先级（nickname和 username）
let $userinfo = $(".userinfo")
$userinfo.text("欢迎"+name)
if (res.data.user_pic) {
  $(".layui-nav-img").attr("src",res.data.user_pic).css("display","inline-block")
  $(".text-top").hide()
}else{
  let myname = name[0].toUpperCase()//保证首字母大写
  $(".layui-nav-img").hide()
  $(".text-top").css("display","inline-block").text(myname)// 展示文字头像; 还需要修改文字头像的文字（来源于name的第一个字）
}
      
},
  complete:function (res) {
    if (res.responseJSON.status === 1 || res.responseJSON.message === "身份认证失败！") {
     layer.msg("获取用户信息失败，请先登录！");
     localStorage.removeItem("token")
     location.href = "/home/login.html"
    }
    console.log(res);
    
  }
})

}
// 获取用户信息结束


// 退出功能开始

$(function () {
  
let $quit = $(".quit")
$quit.on("click",function (a) {
  a.preventDefault()
  layer.confirm('确定退出登录?', {icon: 3, title:'退出'}, function(index){
  
  if (index !== 0) {
    location.href = "/home/login.html"
    localStorage.removeItem("token")
  }
  layer.close(index);
});
})



})