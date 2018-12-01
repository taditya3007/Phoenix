var page_name;
var dynamic_content_selector = '.cmn_display_cls'

function display_content(){
    for(var i=0; i<$(dynamic_content_selector).length;i++){
        if(!$($(dynamic_content_selector)[i]).hasClass(page_name+'_display')){
            $($(dynamic_content_selector)[i]).fadeOut(300);
        }
    }
    $('.'+page_name+'_display').fadeIn(700);
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
    page_name = page_type
    add_active();
    display_content();
    if(state_change){
        history_state_change(false);
    }
}

$(window).on('popstate',function(){
    state_obj = history.state;
    page_name = state_obj.page_type;
    navigation(page_name, false);
})

$(document).ready(function(){
    page_name = (location.hash === '') ? 'homepage' : location.hash.split('#')[1];
    if($('.'+page_name+'_display').length == 0){
        page_name = 'homepage'
    }
    add_active();
    display_content();
    history_state_change(true);
});