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
    
    $('button[id=saveButton]').on("click", async () => {
        
        const pos = $('button[id=saveButton]').index($(event.target));
        
        //gather all data
        const hardiness = $('input:text[name=hardiness]').eq(pos).val();
        const waterFreq = $('input:text[name=waterFreq]').eq(pos).val();
        const soil = $('input:text[name=soil]').eq(pos).val();
        const temperature = $('input:text[name=temperature]').eq(pos).val();
        const lightExposure = $('input:text[name=lightExposure]').eq(pos).val();
        const description = $('textarea[name=description]').eq(pos).val();
        const LoginId = $('input:hidden[name=LoginId]').eq(pos).val();
        const PlantId = $('input:hidden[name=PlantId]').eq(pos).val();
        const fertilization = $('input:text[name=fertilization]').eq(pos).val(); 
        let url = `/updatePlantProperties`;
        let inputtedData = {
            hardiness:hardiness, waterFreq:waterFreq, soil:soil, 
            temperature:temperature, lightExposure:lightExposure,
            description:description, LoginId:LoginId, PlantId:PlantId,
            fertilization:fertilization
        }
        
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(inputtedData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        let response = await data.json();
        
        if(response == 1) {
            alert("Your plant data has been saved successfully!");
        }
        
    });
    
};