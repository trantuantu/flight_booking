var count = 0;

function refreshPage() {
	location.reload();
}
function booking_display() {
    count++;
    document.getElementById("booking_banner").style.display = "block";
    document.getElementById("mid").setAttribute('class', 'blur');
    document.getElementById("khuhoi").className += " btn-info";
    if (count % 2 == 0) {
        document.getElementById("booking_banner").style.display = "none";
        document.getElementById("mid").setAttribute('class', null);
    }
}

function close_form() {
    document.getElementById("booking_banner").style.display = "none";
    document.getElementById("mid").setAttribute('class', null);
}

function change_type(a) {
    if (a == 0) {
        document.getElementById("khuhoi").className += " btn-info";
        document.getElementById("motchieu").className -= " btn-info";
        document.getElementById("motchieu").className += " btn_in_form";
        document.getElementById("motchieu").className += " btn btn-default";

        document.getElementById("example2").style.display = "inline-block";
        document.getElementById("arrow").src = "images/arrow2.png";
    } else {
        document.getElementById("khuhoi").className -= " btn-info";
        document.getElementById("khuhoi").className += " btn_in_form";
        document.getElementById("khuhoi").className += " btn btn-default";
        document.getElementById("motchieu").className += " btn-info";
        document.getElementById("example2").required = false;
        document.getElementById("example2").style.display = "none";

        document.getElementById("arrow").src = "images/arrow1.png";
    }

}

function displayname(name) {
    document.getElementById("menu1").text() = name;
}

function chooseDanhXung(id, str) {
    document.getElementById(id).value = str;
}

$(function() {
    $('[data-toggle="popover"]').popover();

    $('#cvc').on('click', function() {
        if ($('.cvc-preview-container').hasClass('hide')) {
            $('.cvc-preview-container').removeClass('hide');
        } else {
            $('.cvc-preview-container').addClass('hide');
        }
    });

    $('.cvc-preview-container').on('click', function() {
        $(this).addClass('hide');
    });
});
