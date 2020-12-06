/* global $ */
window.onload = function(){

    //menu related vars
    const menuNames = ["Home","Your Plants","Plant Talk","Find Plants","Sign In","Register"];
    const menuHref = ["/","/yourPlants","/plantTalk","/findPlants","/signIn","/register"];
    //load menu
    loadMenu(location.pathname);

    //loads the menu and marks current page
    function loadMenu(menuItem) {
        //the branding    
        $(".navbar").append(`<span class="navbar-brand"><img src="img/Branch2_3.png" height="30" alt="leaf" />Green House</span>`);
        //menu items
        for(let i = 0 ; i < menuNames.length ; i++) {
            if(menuItem == menuHref[i]) { 
                if(i == 2) { 
                    $(".navbar").append(`<a class='nav-link mr-auto currentPage' href='${menuHref[i]}'>${menuNames[i]}</a>`); 
                } else { 
                    $(".navbar").append(`<a class='nav-link currentPage' href='${menuHref[i]}'>${menuNames[i]}</a>`);
                } //inner if else
            } else {
                if(i == 2) { 
                    $(".navbar").append(`<a class='nav-link mr-auto' href='${menuHref[i]}'>${menuNames[i]}</a>`);
                } else {
                    $(".navbar").append(`<a class='nav-link' href='${menuHref[i]}'>${menuNames[i]}</a>`);        
                } //inner if else
            }  //if else
        } //for
    }//loadMenu
    
    $(".option").on("click", function(){
        const id = $(this).attr("id").split(";", 6);
        addToYourPlants(id);
    });
};

async function addToYourPlants(id){
   let url = `/api/addToYourPlants?plantId=${id[0]}&genus=${id[2]}&scienceName=${id[3]}&familyName=${id[4]}&commonName=${id[5]}`;
   await fetch(url);
}