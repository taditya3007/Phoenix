var page_name;
var domain_name = 'Phoenix'
var dynamic_content_selector = '.cmn_display_cls'
var product_price = 500;

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

function modify_count_display(){
    var cart_val = Number(window.sessionStorage.getItem('product_count')) || 0;
    $('.cart_count').html(cart_val);
    $('.cart_val').html(cart_val * product_price);
}

function checkout_ready(){
    modify_count_display();
    $('.close1').off('click');
    $('.close1').on('click', function (c) {
        $('.rem1').fadeOut('slow', function (c) {
            $('.rem1').remove();
        });
    });
}


function update_cart(added, notify){
    var curr_count = Number(window.sessionStorage.getItem('product_count'));
    if(curr_count === null){
        var new_count = 1;
    }
    else{
        if(!added){
            var new_count = (curr_count === 0) ? curr_count : Number(curr_count) - 1;
        }
        else{
            var new_count = Number(curr_count) + 1;
        }
    }
    window.sessionStorage.setItem('product_count', new_count);
    if(notify){
        swal({
          title: "Success!",
          text: "Your item is added to the cart!",
          icon: "success",
          button: "OK",
        });
    }
    modify_count_display();
}


function display_content(){
    var new_title = domain_name + ' | ' + page_name;
    $('title').html(new_title);
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