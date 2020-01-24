$(document).ready(function(){

    (function($) {
        "use strict";


    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "Type the correct answer.");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                subject: {
                    required: true,
                    minlength: 4
                },
                organization: {
                    required: false,
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                name: {
                    required: "Please input your name.",
                    minlength: "Your name must consist of at least 2 characters"
                },
                subject: {
                    required: "Please indicate a subject.",
                    minlength: "Subject must consist of at least 4 characters"
                },
                organization: {
                    required: "Please input your organization.",
                },
                email: {
                    required: "Please input your email."
                },
                message: {
                    required: "Can you give me some feedback?",
                    minlength: "Your message is too short."
                }
            },
            submitHandler: function(form) {
                // // Call getCookieUser function from chatbot-connection.js
                // let user_id = getCookieUser("user_id", "");
                let name = form[0].value;
                let email = form[1].value;
                let subject = form[2].value;
                let org = form[3].value;
                let msg = form[4].value;

                const FEEDBACK_API = 'http://127.0.0.1:5000/api/feedback'

                request = {
                    // user_id: user_id,
                    name: name,
                    email: email,
                    subject: subject,
                    organization: org,
                    message: msg
                };

                // Call getAPIResponse function from chatbot-connection.js
                getAPIResponse(FEEDBACK_API, request)
                .then(resp=> {
                    $('#contactForm').fadeTo(1000, 0.3, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find(':button').attr('disabled', 'disabled');
                    	$('#contact-modal').modal({
                            backdrop: false
                        });
                    })
                })
                .catch(resp=>{
                    $('#contactForm').fadeTo(1000, 0.3, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find(':button').attr('disabled', 'disabled');
                        $('#contact-modal').find(':button').css('background-color','#ee4000');
                        $('#contact-modal').find('.modal-content').css('border-color','#ee4000');
                        $('#contact-modal').find('.modal-body > p').text('Sorry! My server is temporarily out of service. Please send the message by email.');
	                	$('#contact-modal').modal({
                            backdrop: false
                        });
                    })
                })
            }
        })
    })

 })(jQuery)
})
