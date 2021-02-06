$(function() {
    getUserINfo();
    //退出功能
    $('#btnLogoout').on('click', function() {
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something

            localStorage.removeItem('token');
            location.href = '/JINSSHI/阶段4/bigEventFll/login.html'
            layer.close(index);
        });
    })
})

function getUserINfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //渲染用户的头像
            renderAvatar(res.data);
        },
        //请求成功或失败都会调用这个函数
        complete: function(res) {
            // console.log(res);
            // responseJSON: {status: 1, message: "身份认证失败！"}
            if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
                // 强制清空token
                localStorage.removeItem('token');
                // 强制跳转到登录页面
                location.href = '/JINSSHI/阶段4/bigEventFll/login.html'

            }
        }
    })
}
//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username;
    //设置欢迎的文本
    $('.welcome').html('欢迎' + ' ' + name);
    //获取用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avator').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avator').html(first).show();
    }
    //拿到用户名的第 一个字符
}