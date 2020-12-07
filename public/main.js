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
        $(this).disabled = true;
        addToYourPlants(id);
    });
};

async function addToYourPlants(id){
   let url = `/api/insertPlant?id=${id[0]}&image_url=${id[1]}&genus=${id[2]}&scientific_name=${id[3]}&family=${id[4]}&common_name=${id[5]}`;
   let response = await fetch(url);
   let data = await response.json();
   let PlantId = data[0].PlantId;
   let url2 = `/api/insertLoginPlant?id=${PlantId}`;
   let response2 = await fetch(url2);
   let text = await response2.text();
   alert(text);
}