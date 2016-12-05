// $(function(){
    
//     // $('#hostingbtn').attr('disabled', true);
// });
//제목, 간단한 설명, city, address, cost, usingRule, facilities
$(document).ready(function() {
    $('#hostingForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            title: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '제목을 입력해주세요.'
                    }
                }
            },
            simpleComment: {
                validators: {
                    notEmpty: {
                        message: '간단한 설명을 작성해 주세요.'
                    }
                }
            },
            city: {
                validators: {
                    notEmpty: {
                        message: '숙소가 속한 도시를 입력해주세요.'
                    }
                }
            },
            address: {
                validators: {
                    notEmpty: {
                        message: '숙소의 주소를 입력해주세요.'
                    }
                }
            },
            cost: {
                validators: {
                    notEmpty: {
                        message: '숙박 비용을 입력해주세요.'
                    },
                    cost: {
                        
                    }
                }
            },
            usingRule: {
                validators: {
                    notEmpty: {
                        message: '이용 규칙을 작성해주세요.'
                    }
                }
            },
            facilities: {
                validators: {
                    notEmpty: {
                        message: '숙소의 편의시설을 설명해주세요.'
                    }
                }
            }
        }
    });
});

