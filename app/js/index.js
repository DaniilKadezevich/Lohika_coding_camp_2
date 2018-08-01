

$(document).ready(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
    })
    $('#add-user').on('click', function (e) {
        let name = $('#username').val();
        let surname = $('#surname').val();
        let body = JSON.stringify({firstName: name, lastName: surname});
        console.log(body);
        $.ajax({
            url: 'http://localhost:3000/users',
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body,
            success: function (data) {
                console.log(data);
            },
        })
    });
});