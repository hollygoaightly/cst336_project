/* global $ */
window.onload = function(){

    //mark active men item
    markActiveMenuItem(location.pathname);

//loads the menu and marks current page
    function markActiveMenuItem(menuItem) {
        //menu items
        for(let i = 0 ; i < $(".nav-link").length ; i++) {
            //add class for current page
            if($(".nav-link").eq(i).attr("href") == menuItem) {
                $(".nav-link").eq(i).addClass("currentPage");
            } //if
        } //for
    }//loadMenu
};