$(document).ready(function() {
    $('#mysignform').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '이름을 입력해주세요.'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '이메일을 입력해주세요.'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '비밀번호를 입력해주세요.'
                    }
                }
            },
            password_confirmation: {
                validators: {
                    notEmpty: {
                        message: '비밀번호를 입력해주세요.'
                    }
                }
            }
        }
    });
});









// function change_to_err(name1, name2){
//     $(name1).removeClass("has-success");
//     $(name2).removeClass("glyphicon-ok");
//     $(name1).addClass("has-error");
//     $(name2).addClass("glyphicon-warning-sign");
// }
// function change_to_success(name1, name2){
//     $(name1).removeClass("has-error");
//     $(name2).removeClass("glyphicon-warning-sign");
//     $(name1).addClass("has-success");
//     $(name2).addClass("glyphicon-ok");
// }
// function validate_name() {
//     var name = document.forms['mysignform']['name'].value;
//     if(!name){
//         change_to_err(name_group,icon_in_name);
//     } else {
//         change_to_success(name_group,icon_in_name);
//     }
// }
// function validate_email(){
//     var email = document.forms['mysignform']['email'].value;
//     if(!email){
//         change_to_err(email_group,icon_in_email);
//     } else {
//         change_to_success(email_group,icon_in_email);
//     }
// }
// function validate_password(){
//     var password = document.forms['mysignform']['password'].value;
//     if(!password || password.length < 6){
//         change_to_err(password_group,icon_in_password);
//     } else {
//         change_to_success(password_group,icon_in_password);
//     }
// }
// function validate_confirmation(){
//     var password_confirmation = document.forms['mysignform']['password_confirmation'].value;
//     if(password_confirmation != document.forms['mysignform']['password'].value || !password_confirmation){
//         change_to_err(confirmation_group,icon_in_confirmation);
//         pwonfirm_check = false;
//     } else {
//         change_to_success(confirmation_group,icon_in_confirmation);
//         pwonfirm_check = true;
//     }
// }

// function validate_submit(){

// }