$(function() {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        oldIsSameNew: function(value) {
            oldpwd = $('[name=oldPwd]').val();
            // console.log(uname);
            if (oldpwd == value) {
                return '新旧密码不能相同';
            }
        },
        newIsSamerePwd: function(value) {
            newpwd = $('[name=newPwd]').val();
            // console.log(uname);
            if (newpwd !== value) {
                return '两次密码输入不一致';
            }
        }
    });

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败');
                }
                layui.layer.msg('密码更新成功');
                $('.layui-form')[0].reset();

            },

        })
    })

})