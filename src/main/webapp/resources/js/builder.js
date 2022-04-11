var questionId = 0; //{last id + 1}
var carouselPage = 0;
var pageCount = 2;

$(window).on('load',function(){
    $('#myTrigger').click(function (){
        $('#myModal').modal('show');
    });
});

$(document).ready(function(){
    Sortable.create(demo1, {
        animation: 100,
        group: 'list-1',
        draggable: '.list-group-item',
        handle: '.list-group-item',
        sort: true,
        filter: '.sortable-disabled',
        chosenClass: 'active'
    });
    // Rating Initialization
    //$('#rateMe2').mdbRate();
    // Activate Carousel
    $("#carouselExampleSlidesOnly").carousel();

    // Enable Carousel Indicators
    $(".item1").click(function(){
        $("#carouselExampleSlidesOnly").carousel(0);
        carouselPage = 0;
    });
    $(".item2").click(function(){
        $("#carouselExampleSlidesOnly").carousel(1);
        carouselPage = 1;
    });

    // Enable Carousel Controls
    /*$(".left").click(function(){
        if(carouselPage > 0){
            carouselPage--;
        }else{
            carouselPage = pageCount - 1;
        }
        $("#carouselExampleSlidesOnly").carousel(carouselPage);
    });*/

    /*$(".right").click(function(){
        if(carouselPage < (pageCount - 1)){
            carouselPage++;
        }else{
            carouselPage = 0;
        }
        $("#carouselExampleSlidesOnly").carousel(carouselPage);
    });*/

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

function newQuestion() {
    $('#newQuestionTriggerId_' + carouselPage).addClass("d-none");
    $('#selectQuestionType_' + carouselPage).removeClass("d-none");
}
function typeSelected(typeName){
    $('#newQuestionTriggerId_' + carouselPage).removeClass("d-none");
    $('#selectQuestionType_' + carouselPage).addClass("d-none");
    if(typeName === "SINGLE"){
        $('#exampleModalLabel').text("Одиночный выбор");
    }else if(typeName === "MULTI"){
        $('#exampleModalLabel').text("Множественный выбор");
    }

    $('#addModalQuestionId').attr("qType", typeName);
    $('#myModal').modal('show');
}
function createSelectedType(element){
    var newQuestion = buildQuestion(element);
    var selectQuestionTypeContainer = $('#selectQuestionType_' + carouselPage);
    $(newQuestion).insertBefore(selectQuestionTypeContainer);

    var questions = $('.choose-question');
    for(var i = 0; i < questions.length; i++){
        questions[i].value = '';
    }
    $('#newTitleInputId').val('');
    $('#myModal').modal('hide');

    var createStarContainer = $('#create-star-container-id').get();
    $( createStarContainer ).empty();
    createStar(createStarContainer, 0);
    createStar(createStarContainer, 1);
}
function buildQuestion(element){
    var questionTitle = $('#newTitleInputId').val();
    var questions = [];
    var questions = $('.choose-question');

    const node1 = document.createElement("div");
    node1.className += "row py-2 border-top border-bottom d-flex justify-content-center question-block";
    node1.setAttribute("qType", $(element).attr("qType"));
    node1.id = "q_" + questionId;
    questionId++;
    const node2 = document.createElement("div");
    node2.className += "col-5 d-flex justify-content-center flex-column add-item-cell";

    addQuestionTitle(node2, 1, questionTitle);

    for(var i = 0; i < questions.length; i++){
        addChooseRow(node2, 1, questions[i].value);
    }

    node1.appendChild(node2);

    return node1;
}

function addChooseRow(parent, id, text){
    const node1 = document.createElement("div");
    node1.className += "row py-2";
    const node2 = document.createElement("div");
    node2.className += "col";
    const node3 = document.createElement("input");
    node3.type = "text";
    node3.value = text;
    node3.classList.add("form-control");
    node3.setAttribute("disabled", "true");
    node3.setAttribute("readonly", "true");
    node3.setAttribute("name", "suggestion");

    node2.appendChild(node3);
    node1.appendChild(node2);
    parent.appendChild(node1);
}

function addQuestionTitle(parent, id, text){
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

function addSuggestion(){
    var insertBeforeElement = $('#addAnswerContainerId');
    var answersContainer = $('#answersContainerId');
    var questions = $('.choose-question');
    var n = questions.length;
    var inputId = 'selectQ_' + (n + 1);
    const node1 = document.createElement("div");
    node1.className += "row py-2";

    const node2 = document.createElement("div");
    node2.className += "col";

    const node3 = document.createElement("label");
    node3.setAttribute('for', inputId);
    const textNode1 = document.createTextNode('Ответ ' + (n + 1));

    const node4 = document.createElement("input");
    node4.type = 'text';
    node4.id = inputId;
    node4.className = 'form-control choose-question';
    node4.value = '';

    node3.appendChild(textNode1);
    node2.appendChild(node3);
    node2.appendChild(node4);
    node1.appendChild(node2);


    $(node1).insertBefore(insertBeforeElement);
}

function addCarouselItem(){
    pageCount++;
    carouselPage = (pageCount - 1);
    var newItem = $( '.pattern-item' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-item').addClass("questionsPage");
    $( newItem ).find( '.page-name' ).first().text('Page ' + carouselPage);
    $( newItem ).find( '.select-question-type' ).first().attr('id', 'selectQuestionType_' + carouselPage);
    $( newItem ).find( '.new-question-trigger' ).first().attr('id', 'newQuestionTriggerId_' + carouselPage);
    $('#carouselItemsContainerId').append(newItem);
    $('#carouselExampleSlidesOnly').carousel(carouselPage);

    var newPageButton = $( '.pattern-button' ).first().clone();
    $( newPageButton ).removeClass("d-none").removeClass('pattern-button').addClass('item' + (carouselPage + 1));
    $( newPageButton ).find( 'button' ).first().text('Страница ' + carouselPage);
    $( newPageButton ).attr('page', carouselPage);
    $( newPageButton ).click(function(){
        $("#carouselExampleSlidesOnly").carousel(parseInt($(this).attr('page')));
        carouselPage = $(this).attr('page');
    });
    $( newPageButton ).insertBefore($('#newPageButtonContainerId'));

}

function publish(){
    var questionBlocks = $('.question-block');
    var questionnairePages = $('.questionsPage');

    var currentdate = new Date();
    var datetime = currentdate.getUTCFullYear() + "-"
        + ("0" + (currentdate.getUTCMonth()+1)).slice(-2)  + "-"
        + ("0" + currentdate.getUTCDate()).slice(-2) + "T"
        + ("0" + currentdate.getUTCHours()).slice(-2) + ":"
        + ("0" + currentdate.getUTCMinutes()).slice(-2) + ":"
        + ("0" + currentdate.getUTCSeconds()).slice(-2);

    var page = {"number" : 1, "questions" : []};
    var question = {};
    var questionnaire = {
        "questionnairePages" : [],
        "title" : "Some title",
        "date" : datetime,
        "creatorName" : "Some name",
        "creatorID" : 1,
        "questionnaireType" : "QUESTION",
        "status" : "PUBLISHED"
    };

    var suggestion;

    for(var count = 0; count < questionnairePages.length; count++){
        questionBlocks = $(questionnairePages[count]).find('.question-block');

        page["orderNum"] = count;
        page["questions"] = [];

        for(var i = 0; i < questionBlocks.length; i++){
            var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();
            var suggestionsList = $( questionBlocks[i] ).find( "[name='suggestion']" );

            question["questionType"] = $( questionBlocks[i] ).attr("qType");
            question["title"] = title;
            question["orderNum"] = i;
            question["suggestions"] = [];

            for(var j = 0; j < suggestionsList.length; j++){
                suggestion = { text : suggestionsList[j].value, orderNum : j };
                question["suggestions"].push(suggestion);
            }

            page["questions"].push(question);
            question = {}
        }

        questionnaire["questionnairePages"].push(page);
        page = {};
    }

    $.ajax({
        type: "POST",
        url: "/questionnaire/build",
        data: JSON.stringify(questionnaire),
        success: function() {
            alert("success");
        },
        contentType: "application/json"
    });
}

function addStar(){
    var createStarContainer = $('#create-star-container-id').get();
    var stars = $(createStarContainer).find("[name='rating']");

    if(stars.length < 15){
        createStar(createStarContainer, stars.length);
    }
}
function createStar(createStarContainer, count){
    const input = document.createElement("input");
    input.name = "rating";
    input.type = "radio";
    input.setAttribute("value", count + 1);
    input.id = count + 1;
    const label = document.createElement("label");
    label.setAttribute("for", count + 1);
    const textNode1 = document.createTextNode('☆');

    label.appendChild(textNode1);

    $(createStarContainer).append(input);
    $(createStarContainer).append(label);
}
function beforeCloseModal(){
    var createStarContainer = $('#create-star-container-id').get();
    $( createStarContainer ).empty();
    createStar(createStarContainer, 0);
    createStar(createStarContainer, 1);
}