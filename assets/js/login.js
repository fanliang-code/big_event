(function() {
    // 点击去注册让注册显示，登录隐藏

    $("#link_reg").on('click', function() {
        $(".reg-box").show();
        $(".login-box").hide();
    })

    // 点击去登录让登录显示，注册隐藏
    $("#link_login").on('click', function() {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    //表单添加自定义的验证
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        username: function(value) {
            uname = $('.reg-box [name=password]').val();
            // console.log(uname);
            if (uname !== value) {
                return '两次密码输入不一致';
            }
        }
    });
    // 监听注册的提交事件
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();

        var data = { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val() }

        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录啊');
            $("#link_login").click();
        })
    });

    //监听登录的提交事件
    $("#form_login").on('submit', function(e) {
        e.preventDefault();

        $.post('/api/login', $(this).serialize(), function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('登录成功aaa');
            // 把token值存储到浏览器缓存
            localStorage.setItem('token', res.token);
            location.href = '/JINSSHI/阶段4/bigEventFll/index.html'
        })
    })



})()