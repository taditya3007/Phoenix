var page_name;
var dynamic_content_selector = '.cmn_display_cls'

function homepage_ready(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            900: {
                items: 3,
                nav: false
            },
            1000: {
                items: 4,
                nav: true,
                loop: false,
                margin: 20
            }
        }
    });
}

function shop_ready(){
    $('#horizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        closed: 'accordion', // Start closed if in accordion view
        activate: function (event) { // Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#tabInfo');
            var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });

    $('.flexslider1').flexslider({
        animation: "slide",
        controlNav: "thumbnails"
    });
}

function checkout_ready(){
    $('.value-plus').on('click', function () {
        var divUpd = $(this).parent().find('.value'),
            newVal = parseInt(divUpd.text(), 10) + 1;
        divUpd.text(newVal);
    });

    $('.value-minus').on('click', function () {
        var divUpd = $(this).parent().find('.value'),
            newVal = parseInt(divUpd.text(), 10) - 1;
        if (newVal >= 1) divUpd.text(newVal);
    });

    $('.close1').on('click', function (c) {
        $('.rem1').fadeOut('slow', function (c) {
            $('.rem1').remove();
        });
    });
}

function display_content(){
    for(var i=0; i<$(dynamic_content_selector).length;i++){
        if(!$($(dynamic_content_selector)[i]).hasClass(page_name+'_display')){
            $($(dynamic_content_selector)[i]).fadeOut(150);
        }
    }
    $('.'+page_name+'_display').fadeIn(300)
    setTimeout(function(){
        if(typeof(window[page_name+'_ready']) === 'function' ){
            window[page_name+'_ready']();
        }
    },300);

}

function history_state_change(page_load){
    var hash_val = (page_name == 'homepage') ? '' : page_name
    var new_href = location.origin + '/#' + hash_val;
    state_obj = {page_type : page_name, url: new_href}
    if(page_load){
        window.history.replaceState(state_obj,page_name,new_href);
    }
    else{
        if(window.history.state.page_name != page_name){
            window.history.pushState(state_obj,page_name,new_href);
        }
    }
}

function add_active(){
    $('.navbar-nav').find('.nav_links').removeClass('active');
    $('.'+page_name+'_active').addClass('active');
}

function navigation(page_type, state_change){
    change_history = (page_type == page_name) ? false : true;
    page_name = page_type
    add_active();
    display_content();
    if(state_change && change_history){
        history_state_change(false);
    }
}

$(window).on('popstate',function(){
    state_obj = history.state;
    page_name = state_obj.page_type;
    navigation(page_name, false);
})

$(document).ready(function(){
    $(".scroll").click(function(event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 900);
    });

    page_name = (location.hash === '') ? 'homepage' : location.hash.split('#')[1];
    if($('.'+page_name+'_display').length == 0){
        page_name = 'homepage'
    }
    add_active();
    display_content();
    history_state_change(true);
});