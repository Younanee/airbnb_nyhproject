$(document).ready(function() {
    $('#editform').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: 'name is not valid',
                validators: {
                    notEmpty: {
                        message: '제목을 입력해주세요.'
                    }
                }
            },
            next_password:{
                message: 'password is not valid',
                validators: {
                    notEmpty: {
                        message: '변경할 비밀번호을 입력해주세요.'
                    }
                }
            }
        }
    });
});

