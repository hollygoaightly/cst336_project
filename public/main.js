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
    
    $(".option").on("click", function(){
        const id = $(this).attr("id").split(";", 6);
        addToYourPlants(id);
    });
};

async function addToYourPlants(id){
   let url = `/api/insertPlant?id=${id[0]}&image_url=${id[1]}&genus=${id[2]}&scientific_name=${id[3]}&family=${id[4]}&common_name=${id[5]}`;
   await fetch(url);
   let url2 = `/api/insertLoginPlant?id=${id[0]}`;
   //await fetch(url2);
   let url3 = "/yourPlants";
   await fetch(url3);
}