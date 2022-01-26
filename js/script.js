$(document).ready(function(){
    $('.reviews__inner').slick({
        centerMode: true,
        centerPadding: '360px',
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/slider/next_arrow.png" alt=""></button>',
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/slider/back_arrow.png" alt=""></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    centerPadding: '300px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 993,
                settings: {
                    centerMode: true,
                    centerPadding: '70px',
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 576,
                settings: {

                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 375,
                settings: {

                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                }
            }
          ]
    });

});


const burger = document.querySelector('.header__burger'),
      asideMenu = document.querySelector('.aside-menu'),
      asideMenuClose = document.querySelector('.aside-menu__close'),
      asideMenuLink = document.querySelectorAll('.aside-menu__link'),
      overlay = document.querySelector('.overlay'),
      modal = document.querySelectorAll('.modal'),
      order_btn = document.querySelectorAll('[data-modal=order]'),
      consultation_btn = document.querySelectorAll('[data-modal=consultation]'),
      modalOrder = document.querySelector('[data-order="order"]'),
      modalСonsultation = document.querySelector('[data-order="consultation"]'),
      modal__close = document.querySelectorAll('.modal__close'),
      promotion = document.querySelector('.promotion__descr');

    


burger.addEventListener('click',()=>{
    asideMenu.classList.toggle('aside-menu--active');
    overlay.style.display = "block";
});   

asideMenuClose.addEventListener('click',()=>{
    asideMenu.classList.toggle('aside-menu--active');
    overlay.style.display = "none";
});

asideMenuLink.forEach((item)=>{
    item.addEventListener('click', ()=>{
        asideMenu.classList.toggle('aside-menu--active');
        overlay.style.display = "none";
    })
});

window.addEventListener('scroll', ()=>{
    if(window.pageYOffset >= 10){
        $('.header__inner').css("background-color", "rgba(0,0,0,0.7)")
    }
    else {
        $('.header__inner').css("background-color", "unset")
    }
})



const counters = document.querySelectorAll('.skills__ratings-counter'),
      lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});


consultation_btn.forEach((item) =>{
    item.addEventListener('click', ()=>{
        modalСonsultation.style = 'display: block';
        overlay.style = 'display: block';
        document.body.style.overflow = 'hidden'
    });
});


order_btn.forEach((item) =>{
    item.addEventListener('click', ()=>{
        modalOrder.style = 'display: block';
        overlay.style = 'display: block';
        document.body.style.overflow = 'hidden'
    });
});

 // #id

modal__close.forEach((item)=>{
    item.addEventListener('click', ()=>{
        document.body.style.overflow = 'visible'
        modal.forEach((item)=>{
            item.style = 'display: none';
        });
        overlay.style = 'display: none';
        $('form').trigger('reset');
    })
});



const deadline = '2022-01-30';
function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor( (t/(1000*60*60*24)) ),
        seconds = Math.floor( (t/1000) % 60 ),
        minutes = Math.floor( (t/1000/60) % 60 ),
        hours = Math.floor( (t/(1000*60*60) % 24) );

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
function getZero(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}
function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
        promotion.innerHTML = "Я ценю каждого клиента и предлагаю вам стать одним из них на очень выгодных условиях. Каждому, кто оформит заказ, будет предоставлена скидка в размере <span>30%!</span><br><br>Акция закончится  "+ (t.days+1)+"  Января в 00:00";

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}
setClock('.timer', deadline);





$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#order').fadeOut();
        $('#consultation').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});


$(function(){
        $("a[href^='#']").click(function(){
                var _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });
});




const WorksPathItemPayment = document.querySelector('.works-path__item--payment'),
      WorksPathItemDiagnostics = document.querySelector('.works-path__item--diagnostics');
let main_with = $(window).innerWidth();
if(main_with <= 768) {
    WorksPathItemPayment.innerHTML = 
    `           
        <img src="icons/work-path/work-path2.png" alt="" class="works-path__img">
        <h6 class="works-path__item-title title_fz14">Диагностика</h6>
        <p class="works-path__text">Я приеду в назначенное вами время, проведу первичную и аппаратную диагностику</p>
    `;
    WorksPathItemDiagnostics.innerHTML = 
    `
        <img src="icons/work-path/work-path1.png" alt="" class="works-path__img">
        <h6 class="works-path__item-title title_fz14">Расчет стоимости</h6>
        <p class="works-path__text">После диагностики мы обсудим все детали и нюансы работы и только после этого вы примите решение о дальнейшем ремонте</p>
    `;
}

