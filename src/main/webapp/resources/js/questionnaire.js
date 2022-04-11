var questionId = 0; //{last id + 1}
var carouselPage = 0;
var pageCount = 1;

$(document).ready(function(){
    $.get("/questionnaire/load/1", function(data, status){
        var pages = $(".carousel-item");
        var questionsBlocks;
        var suggestions;
        var title;
        var page

        for(var counter = 0; counter < data.pages.length; counter++){
            page = data.pages[counter];
            if(counter === 0){
                var questionBlockContainer = $('#qBlockContainer_0');
                var questionBlock;
                for(var i = 0; i < page.questions.length; i++){
                    questionBlock = buildQuestionBlock(page.questions[i]);
                    $( questionBlockContainer ).append( questionBlock );
                }
            }
            else{
                addCarouselItem(page);
            }
            /*for(var i = 0; i < data.pages[counter].questions.length; i++){
                //create questionBlock
                //set questionBlock title
                title = $( pages[counter] ).find( "[name='title']" ).first().text(data.pages[counter].questions[i].title);
                suggestions = $(pages[counter]).find("[name='suggestion']");
                for (var j = 0; j < suggestions.length; j++){
                    //create, set suggestion
                    $(suggestions[j]).val(data.pages[counter].questions[i].suggestions[j].text);
                }
            }*/
        }
    });

    $("#carouselExampleSlidesOnly").carousel();
});

function prev(){
    if(carouselPage > 0){
        carouselPage--;
    }else{
        carouselPage = pageCount - 1;
    }
    $("#carouselExampleSlidesOnly").carousel(carouselPage);
}
function next(){
    if(carouselPage < (pageCount - 1)){
        carouselPage++;
    }else{
        carouselPage = 0;
    }
    $("#carouselExampleSlidesOnly").carousel(carouselPage);
}

function startQuestionnaire(){
    $("#startBlockId").addClass("d-none");
    $("#progressBlockId").removeClass("d-none");
}

function addCarouselItem(page){
    pageCount++;
    carouselPage = (pageCount - 1);
    var newItem = $( '.pattern-item' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-item').addClass("questionsPage").addClass("carousel-item");
    $( newItem ).attr('page', carouselPage);
    $('#carouselItemsContainerId').append(newItem);

    var questionBlockContainer = $('#qBlockContainer_n');
    questionBlockContainer.id = '#qBlockContainer_' + carouselPage;
    var questionBlock;
    for(var i = 0; i < page.questions.length; i++){
        questionBlock = buildQuestionBlock(page.questions[i]);
        $( questionBlockContainer ).append( questionBlock );
    }
}

function buildQuestionBlock(question){
    var questionTitle = question.title;

    var suggestions = question.suggestions;

    const node1 = document.createElement("div");
    node1.className += "row py-2 border-top border-bottom d-flex justify-content-center question-block";
    node1.id = "q_" + questionId;
    questionId++;
    const node2 = document.createElement("div");
    node2.className += "col-5 d-flex justify-content-center flex-column";

    addQuestionBlockTitle(node2, questionTitle);

    for(var i = 0; i < suggestions.length; i++){
        addSuggestion(node2, suggestions[i].text, node1.id, question.type);
    }

    node1.appendChild(node2);

    return node1;
}

function addQuestionBlockTitle(parent, text){
    const node1 = document.createElement("div");
    node1.className += "row py-2";
    const node2 = document.createElement("div");
    node2.className += "col d-flex justify-content-start";
    const node3 = document.createElement("a");
    node3.setAttribute("name", "title");
    const textNode = document.createTextNode(text);

    node3.appendChild(textNode);
    node2.appendChild(node3);
    node1.appendChild(node2);
    parent.appendChild(node1);
}

function addSuggestion(parent, text, questionBlockId, questionType){
    const node1 = document.createElement("div");
    node1.className += "row py-2";
    const node2 = document.createElement("div");
    node2.className += "col";
    const node3 = document.createElement("input");
    node3.type = "text";
    $(node3).click(function(){
        suggestionSelected(this);
    });
    node3.value = text;
    node3.style.cursor = "pointer";
    $(node3).addClass("form-control suggestion");
    node3.setAttribute("readonly", "true");
    node3.setAttribute("name", "suggestion");
    $(node3).attr("qType", questionType);
    $(node3).attr("questionBlockId", questionBlockId);

    node2.appendChild(node3);
    node1.appendChild(node2);
    parent.appendChild(node1);
}

function suggestionSelected(element){
    $(element).blur();
    if($(element).hasClass("selected")){
        $(element).removeClass("selected");
    }else{
        var qType = $(element).attr("qType");
        if(qType === "SINGLE"){
            var questionsInBlock = $("#" + $(element).attr("questionBlockId")).find("[name='suggestion']");
            for(var i = 0; i < questionsInBlock.length; i++){
                $(questionsInBlock[i]).removeClass("selected");
            }
            $(element).addClass("selected");
        }
        else if(qType === "MULTI"){
            $(element).addClass("selected");
        }
    }
}