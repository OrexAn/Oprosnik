var questionId = 0; //{last id + 1}
var carouselPage = 0;
var pageCount = 2;

$(window).on('load',function(){
    $('#myTrigger').click(function (){
        $('#myModal').modal('show');
    });
});

$(document).ready(function(){
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
    $('#exampleModalLabel').text(typeName);
    $('#myModal').modal('show');
}
function createSelectedType(){
    var newQuestion = buildQuestion();
    var selectQuestionTypeContainer = $('#selectQuestionType_' + carouselPage);
    $(newQuestion).insertBefore(selectQuestionTypeContainer);

    var questions = $('.choose-question');
    for(var i = 0; i < questions.length; i++){
        questions[i].value = '';
    }
    $('#newTitleInputId').val('');
    $('#myModal').modal('hide');
}
function buildQuestion(){
    var questionTitle = $('#newTitleInputId').val();
    var questions = [];


    var questions = $('.choose-question');

    const node1 = document.createElement("div");
    node1.className += "row py-2 border-top border-bottom d-flex justify-content-center";
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
    const textNode = document.createTextNode(text);

    node3.appendChild(textNode);
    node2.appendChild(node3);
    node1.appendChild(node2);
    parent.appendChild(node1);
}

function addAnswer(){
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
    $( newItem ).removeClass("d-none").removeClass('pattern-item');
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