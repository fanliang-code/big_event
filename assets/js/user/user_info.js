$(function() {
        var form = layui.form
        form.verify({
            nickname: function(value) {

                if (value.length > 6) {
                    return '昵称必须在1-6位';
                }
            }
        });
        $('#btnReset').on('click', function(e) {
            e.preventDefault();
            initUserInfo();
        })
        $('.layui-form').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/userinfo',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('更新用户信息失败');
                    }
                    console.log('更新用户信息成功');
                    window.parent.getUserINfo();

                },

            })
        })

    })
    // 初始化表单的基本信息
initUserInfo();

function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            // console.log(res.data);
            // 为表单数据赋值
            layui.form.val('formUserInfo', res.data);
        },

    })
}