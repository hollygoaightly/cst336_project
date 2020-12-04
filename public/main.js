/* global $ */
window.onload = function(){

    //menu related vars
    const menuNames = ["Home","Your Plants","API Testing - index.html","Sign In","Register"];
    const menuHref = ["/","/yourPlants","/test","/signIn","/register"];
    //load menu
    loadMenu(location.pathname);

    //loads the menu and marks current page
    function loadMenu(menuItem) {
        //the branding    
        $(".navbar").append(`<span class="navbar-brand"><img src="img/Branch2_3.png" height="30" alt="leaf" />Green House</span>`);
        //menu items
        for(let i = 0 ; i < menuNames.length ; i++) {
            if(menuItem == menuHref[i]) { 
                if(i == 1) { 
                    $(".navbar").append(`<a class='nav-link mr-auto currentPage' href='${menuHref[i]}'>${menuNames[i]}</a>`); 
                } else { 
                    $(".navbar").append(`<a class='nav-link currentPage' href='${menuHref[i]}'>${menuNames[i]}</a>`);
                } //inner if else
            } else {
                if(i == 1) { 
                    $(".navbar").append(`<a class='nav-link mr-auto' href='${menuHref[i]}'>${menuNames[i]}</a>`);
                } else {
                    $(".navbar").append(`<a class='nav-link' href='${menuHref[i]}'>${menuNames[i]}</a>`);        
                } //inner if else
            }  //if else
        } //for
    }//loadMenu

    $(".option").on("click", doSomething);
};

function doSomething(){
    alert("testing");
}

/*
async function fetchData(){
   let url = "/api/trefle";  
   let response = await fetch(url);    
   let data = await response.json();
   data = data.data;
   var output = "";
    for(let i = 0; i < data.length; i++){
        output += `<img src='${data[i].image_url}' width='200' height='200'/>` + '<br><i>' + data[i].scientific_name +'</i><br/><b>' + data[i].common_name + '</b><br/><br/>';
    }
    $("#data").html(output);
}
*/