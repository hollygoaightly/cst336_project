window.onload = function(){
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