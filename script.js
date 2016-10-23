var names =[];
var carrers =[];

function slideUp(){
    if($("#input").val() != ""){
    $("#text").css("opacity","0");
    $("#text").css("top","-20%");
    $("#stats").css("margin-top","40vh");  
    
    var indexNum = -1; /*http://isthisagoodcareer.com/wp-content/themes/ITAGC/js/*/
        $.getJSON("blsooh.json",function(data){
            for(var i = 0; i < data["occupation"].length; i++){
                if($("#input").val() == data["occupation"][i]["name"]){
                    indexNum = i;
                }
            }
            if(indexNum < 0){
                for(var i = 0; i < data["occupation"].length; i++){
                    if($("#list").children().eq(0).text() == data["occupation"][i]["name"]){
                        indexNum = i;
                    }
                }            
            }
            var name  = data["occupation"][indexNum]["name"];
            var salery = data["occupation"][indexNum]["salery"];
            var education = data["occupation"][indexNum]["entry Level Education"];
            var numbOfJobs = data["occupation"][indexNum]["number Of Jobs"];
            var growth = data["occupation"][indexNum]["growth rate"];
            
            
            if(growth > 6){
                $("#yesOrNo").text("yes");
                $("#isOrisnt").html('Yes, <span class="jobName">job</span> is a good career');
            }else if(growth > 0){
                if(salery > 43000){
                   $("#yesOrNo").text("Kinda");
                    $("#isOrisnt").html('<span class="jobName">job</span> is a decent career');                 
                }
                else{
                    $("#yesOrNo").text("no");    
                }
                
            }else if(growth < 0){
                $("#yesOrNo").text("no");
            }
            
            $(".jobName").text(name);
            $("#pay").text("$"+salery);
            $("#education").text(education);
            $("#jobs").text(numbOfJobs);
            $("#growth").text(growth+"%");
            });
    
    }
}
function slideUpTwo(){
    $("#logo").css("opacity","0");
    $("#logo").css("top","-20%");
    $("#stats").css("margin-top","-65vh");
    $("#backToTop").css("display","block");
    $("#list").css("transform","translateY(-50%) scaleY(0)");
    
}
function slideDown(){
    $("#text").css("opacity","1");
    $("#stats").css("margin-top","100vh");
    $("#backToTop").css("display","none");
    $("#logo").css("opacity","1");
    if($( document ).width() > 750){
            $("#text").css("top","35%");
    }
    else{
            $("#text").css("top","20%");
    }
    $("#logo").css("top","0");
    $("#input").val("");
}

function setText(num){
    var careerSelected = $("#list").children().eq(num).text();
    $("#input").val(careerSelected);
    $("#list").css("transform","translateY(-50%) scaleY(0)");
}

 
$(document).ready(function(){
        $.getJSON("blsooh.json",function(data){
            for(var i = 0; i < data["occupation"].length; i++){
                names.push(data["occupation"][i]["name"]);    
            }
            
            });

    $('#input').keyup(function(event) {
        var listName = [];
        var ListFirstLet = [];
        var text =$(this).val(); 
        var textBox = $("#dropDown:input");
        for(j = 0; j < names.length;j++){
            
            var tempString = names[j];
            var n = tempString.search(text);
            /*if(n >= 0){
               listName.unshift(names[j]);
            }*/
            if(text.charAt(0).toLocaleLowerCase() == tempString.charAt(0).toString().toLocaleLowerCase()){
                ListFirstLet.push(names[j]);
                listName.push(names[j]);
            }
            
        }
         for(i = 0; i < text.length;i++){
            for(t = 0; t < ListFirstLet.length;t++){
                if(ListFirstLet[t].charAt(i).toLocaleLowerCase() == text.charAt(i).toLocaleLowerCase()){
                    if(ListFirstLet[0] != listName[0]){
                        listName.unshift(ListFirstLet[t]);    
                    }
                    
                }
                else{
                    ListFirstLet.splice(t,1);
                }
                
            }
             
         }
            if(text.length > 10){
             $("#input").css("font-size","100%");   
            }
       
        if(text != ""){
            $("#list").css("transform","translateY(0%) scaleY(1)");
        }else{
            $("#list").css("transform","translateY(-50%) scaleY(0)");
        }
        
        for(t =0; t < 5;t++){
            $("#list").children().eq(t).text(listName[t]);
        }

    });
});

