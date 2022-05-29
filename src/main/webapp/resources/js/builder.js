var questionId = 0; //{last id + 1}
var carouselPage = 0;
var pageCount = 2;
var pointsQuantity = 3;

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
    checkQuestionnaire();

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
    $('.btn-close').first().on('click', beforeCloseModal);
    $('#newQuestionTriggerId_' + carouselPage).removeClass("d-none");
    $('#selectQuestionType_' + carouselPage).addClass("d-none");
    if(typeName === "SINGLE"){
        $('#exampleModalLabel').text("Одиночный выбор");
        $('#simpleSelectContainerID').removeClass('d-none');
        $('#addElementButtonId').on( "click", addSuggestion );
    }else if(typeName === "MULTI"){
        $('#exampleModalLabel').text("Множественный выбор");
        $('#simpleSelectContainerID').removeClass('d-none');
        $('#addElementButtonId').on( "click", addSuggestion );
    }else if(typeName === "RATING"){
        $('#exampleModalLabel').text("Рейтинг");
        $('#ratingContainerID').removeClass('d-none');
        $('#addElementButtonId').on( "click", addStar );
    }else if(typeName === "SORTED"){
        $('#exampleModalLabel').text("Ранжирование");
        $('#sortItemsContainerID').removeClass('d-none');
        $('#addElementButtonId').on( "click", createNewSortedItem );
    }else if(typeName === "SEMANTIC"){
        $('#exampleModalLabel').text("Дифференцированный выбор");
        $('#semanticContainerID').removeClass('d-none');
        $('#addElementButtonId').on( "click", addNewSemantic );
    }else if(typeName === "DISTRIBUTE"){
        $('#exampleModalLabel').text("Распределение значений");
        $('#distributeContainerId').removeClass('d-none');
        $('#addElementButtonId').on( "click", addNewDistribute );
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

    beforeCloseModal();
}
function buildQuestion(element){
    var qType = $(element).attr("qType");
    const node1 = document.createElement("div");

    if(qType === "SINGLE" || qType === "MULTI"){
        var questionTitle = $('#newTitleInputId').val();
        var questions = [];
        var questions = $('.choose-question');

        node1.className += "row py-2 border-top border-bottom d-flex justify-content-center question-block";
        node1.setAttribute("qType", qType);
        node1.id = "q_" + questionId;
        questionId++;
        const node2 = document.createElement("div");
        node2.className += "col-7 d-flex justify-content-center flex-column add-item-cell";

        addQuestionTitle(node2, 1, questionTitle);

        for(var i = 0; i < questions.length; i++){
            addChooseRow(node2, 1, questions[i].value);
        }

        node1.appendChild(node2);
    }
    else if(qType === "RATING"){
        var questionTitle = $('#newTitleInputId').val();
        var starsList = $('#createNewQ').find( "[name='rating']" );

        node1.className += "row py-2 border-top border-bottom d-flex justify-content-center question-block";
        node1.setAttribute("qType", qType);
        node1.id = "q_" + questionId;
        questionId++;
        const node2 = document.createElement("div");
        node2.className += "col-7 d-flex justify-content-center flex-column add-item-cell";

        addQuestionTitle(node2, 1, questionTitle);

        const node3 = document.createElement("div");
        node3.className += "row py-2";
        const node4 = document.createElement("div");
        node4.className += "col";
        const node5 = document.createElement("div");
        node5.className += "container border-top border-bottom";
        const node6 = document.createElement("div");
        node6.className += "rating";

        for(var i = 0; i < starsList.length; i++){
            createStar(node6, i);
        }

        node5.appendChild(node6);
        node4.appendChild(node5);
        node3.appendChild(node4);
        node2.appendChild(node3);
        node1.appendChild(node2);
    }
    else if(qType === "SORTED"){
        var questionTitle = $('#newTitleInputId').val();
        var sortedItemsList = $('#sortItemsContainerID').find( "[name='suggestion']" );

        node1.className += "row py-2 border-top border-bottom d-flex justify-content-center question-block";
        node1.setAttribute("qType", qType);
        node1.id = "q_" + questionId;
        questionId++;
        const node2 = document.createElement("div");
        node2.className += "col-7 d-flex justify-content-center flex-column add-item-cell";

        addQuestionTitle(node2, 1, questionTitle);

        const node3 = document.createElement("div");
        node3.className += "row py-2";
        const node4 = document.createElement("div");
        node4.className += "col sort-item-container";
        node4.id = "sortItemContainer_" + (questionId-1);

        for (var i = 0; i < sortedItemsList.length; i++) {
            createSortedItem(node4, $(sortedItemsList[i]).val());
        }

        node3.appendChild(node4);
        node2.appendChild(node3);
        node1.appendChild(node2);
    }
    else if(qType === "SEMANTIC"){
        var questionTitle = $('#newTitleInputId').val();

        node1.className += "row py-2 border-top border-bottom d-flex justify-content-center question-block";
        node1.setAttribute("qType", qType);
        node1.id = "q_" + questionId;
        questionId++;
        const node2 = document.createElement("div");
        node2.className += "col-7 d-flex justify-content-center flex-column add-item-cell";

        addQuestionTitle(node2, 1, questionTitle);

        var semanticNumbersList = $( "[name='newAvailablePointsContainer']" ).find("span");

        addPoints(node2, semanticNumbersList.length);

        var semanticSuggestionsList = $( "[name='newSemanticSuggestion']" );
        var leftText;
        var rightText;

        for(var i = 0; i < semanticSuggestionsList.length; i++){
            leftText = $( semanticSuggestionsList[i] ).find("[name='newLeftText']").val();
            rightText = $( semanticSuggestionsList[i] ).find("[name='newRightText']").val();

            addSemantic(node2, leftText, rightText);
        }

        node1.appendChild(node2);
    }
    else if(qType === "DISTRIBUTE"){
        var questionTitle = $('#newTitleInputId').val();
        var distributeItemsList = $( "[name='newDistributeRow']" );

        node1.className += "row py-2 border-top border-bottom d-flex justify-content-center question-block";
        node1.setAttribute("qType", qType);
        node1.id = "q_" + questionId;
        questionId++;
        const node2 = document.createElement("div");
        node2.className += "col-7 d-flex justify-content-center flex-column add-item-cell";

        addQuestionTitle(node2, 1, questionTitle);

        var distributePoints = $( "[name='newDistributePoints']" );

        addDistributePoints(node2, $(distributePoints).val());

        var distributeRowText;

        for(var i = 0; i < distributeItemsList.length; i++){
            distributeRowText = $( distributeItemsList[i] ).find("[name='distributeRowText']").val();

            addDistribute(node2, distributeRowText);
        }

        node1.appendChild(node2);
    }


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
    var parent = $('#simpleSelectRowsContainerId');
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


    $(parent).append(node1)
}

function addCarouselItem(){
    pageCount++;
    carouselPage = (pageCount - 1);
    var newItem = $( '.pattern-item' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-item').addClass("questionsPage");
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
function updateQuestionnaire(){
    publish("обновлено");
}

function publish(text){
    var questionBlocks = $('.question-block');
    var questionnairePages = $('.questionsPage');
    var questionnaireId = $("[name='questionnaireId']").first().val();
    var questionnaireTitle = $('#questionnaireTitleId').text();

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
        "id" : questionnaireId,
        "questionnairePages" : [],
        "title" : questionnaireTitle,
        "date" : datetime,
        "questionnaireType" : "QUESTION",
        "status" : "PUBLISHED"
    };

    var suggestion;

    for(var count = 0; count < questionnairePages.length; count++){ //итерация по номеру страницы
        questionBlocks = $(questionnairePages[count]).find('.question-block');

        page["orderNum"] = count;
        page["questions"] = [];

        for(var i = 0; i < questionBlocks.length; i++){  //итерация по номеру блока с вопросом

            var qType = $( questionBlocks[i] ).attr("qType");
            if( qType === "SINGLE" || qType === "MULTI" || qType === "SORTED"){
                //Этот блок только для SINGLE и MULTI
                //---------------------------------------------------------------------------
                var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();
                var suggestionsList = $( questionBlocks[i] ).find( "[name='suggestion']" );

                question["questionType"] = qType;
                question["title"] = title;
                question["orderNum"] = i;
                question["suggestions"] = [];

                for(var j = 0; j < suggestionsList.length; j++){   //итерации по каждой строке-предложении в SINGLE, MULTI или SORTED блоке
                    suggestion = { text : suggestionsList[j].value, orderNum : j };
                    question["suggestions"].push(suggestion);
                }

                page["questions"].push(question);
                question = {}
                //---------------------------------------------------------------------------
            }
            else if(qType === "RATING"){
                //for Rating
                var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();
                var starsList = $( questionBlocks[i] ).find("[name='rating']");
                question["questionType"] = $( questionBlocks[i] ).attr("qType");
                question["title"] = title;
                question["orderNum"] = i;
                question["suggestions"] = [];

                suggestion = { text : starsList.length, orderNum : 0 };
                question["suggestions"].push(suggestion);

                page["questions"].push(question);
                question = {}
                //---------------------------------------------------------------------------
            }
            else if(qType === "SEMANTIC"){
                //for semantic
                var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();

                var suggestionsList = $( questionBlocks[i] ).find( "[name='semanticSuggestion']" );

                var leftText;
                var rightText;

                question["questionType"] = $( questionBlocks[i] ).attr("qType");
                question["title"] = title;
                question["orderNum"] = i;
                question["suggestions"] = [];

                var pointsList = $( questionBlocks[i] ).find( "[name='availablePointsContainer']" ).find("span");

                for(var j = 0; j < suggestionsList.length; j++){   //итерации по каждой строке-предложении SEMANTIC
                    leftText = $(suggestionsList[j]).find("[name='leftText']").first().val();
                    rightText = $(suggestionsList[j]).find("[name='rightText']").first().val();
                    suggestion = { text : leftText + "|" + pointsList.length + "|" + rightText, orderNum : j };
                    question["suggestions"].push(suggestion);
                }

                page["questions"].push(question);
                question = {}
                //---------------------------------------------------------------------------
            }
            else if(qType === "DISTRIBUTE"){
                //for distribute
                var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();
                var maxPoints = $( questionBlocks[i] ).find( "[name='distributePointsValue']" ).first().text();
                var suggestionsList = $( questionBlocks[i] ).find( "[name='distributeRowText']" );

                question["questionType"] = $( questionBlocks[i] ).attr("qType");
                question["title"] = title;
                question["orderNum"] = i;
                question["suggestions"] = [];

                for(var j = 0; j < suggestionsList.length; j++){   //итерации по каждой строке-предложении DISTRIBUTE
                    suggestion = { text : $(suggestionsList[j]).val() + "|" + maxPoints, orderNum : j };
                    question["suggestions"].push(suggestion);
                }

                page["questions"].push(question);
                question = {}
                //---------------------------------------------------------------------------
            }
        }

        questionnaire["questionnairePages"].push(page);
        page = {};
    }

    $.ajax({
        type: "PUT",
        url: "/questionnaire/public",
        data: JSON.stringify(questionnaire),
        success: function() {
            successPublic(text);
        },
        contentType: "application/json"
    });
}

function successPublic(text){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    var qaLink = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/questionnaire/" + questionnaireId;
    if(text){
        $('#alertSpanId').html("Успешно " + text + "<br>" + "Ссылка для прохождения опроса: <br>" + qaLink);
        $('#alertModal').modal('show');
    }else{
        $('#alertSpanId').html("Успешно" + "<br>" + "Ссылка для прохождения опроса:<br>" + qaLink);
        $('#alertModal').modal('show');
    }

    $('#alertButtonId').unbind();
    $('#alertButtonId').on('click', function (){
        var questionnaireId = $("[name='questionnaireId']").first().val();
        window.location.href = "/" + "questionnaire/builder/" + questionnaireId;
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

function createNewSortedItem(){
    var sortItemContainer = $('#demo1');

    var node = $('.pattern-sorted-item').first().clone().get();
    $( node ).removeClass("d-none").removeClass('pattern-sorted-item');

    $(sortItemContainer).append(node);
}
function createSortedItem(createSortedItemContainer, text){
    var node = $('.pattern-sorted-item').first().clone().get();
    $( node ).removeClass("d-none").removeClass('pattern-sorted-item');

    var sortItem = $( node ).find("[name='suggestion']").first();
    $( sortItem ).val(text);
    $( sortItem ).attr("disabled", "true");

    $(createSortedItemContainer).append(node);
}

function addPoints(parent, length){
    var node = $('.semantic-pattern').first().clone().get();
    $( node ).removeClass("d-none").removeClass('semantic-pattern');

    var semanticPointsContainer = $( node ).find("span").first().parent();
    $( semanticPointsContainer ).empty();

    var maxPointValue = parseInt(length/2);

    var node3;
    var textNode1;

    for(var i = 0; i < length; i++){
        node3 = document.createElement("span");
        textNode1 = document.createTextNode(((maxPointValue - i) * (-1)) + "");
        if((maxPointValue - i) > 0){
            $(node3).css('margin-left', -6 + 'px');
        }
        node3.appendChild(textNode1);
        $(semanticPointsContainer).append(node3);
    }

    $(parent).append(node);
}
function addNewPoints(){
    if(pointsQuantity <= 5){
        pointsQuantity += 2;
        var parent = $("[name='newAvailablePointsContainer']");
        $(parent).empty();

        var maxPointValue = parseInt(pointsQuantity/2);

        var node3;
        var textNode1;

        for(var i = 0; i < pointsQuantity; i++){
            node3 = document.createElement("span");
            textNode1 = document.createTextNode(((maxPointValue - i) * (-1)) + "");
            if((maxPointValue - i) > 0){
                $(node3).css('margin-left', -6 + 'px');
            }
            node3.appendChild(textNode1);
            $(parent).append(node3);
        }
    }
}

function removeNewPoints(){
    if(pointsQuantity > 3){
        pointsQuantity -= 2;
        var parent = $("[name='newAvailablePointsContainer']");
        $(parent).empty();

        var maxPointValue = parseInt(pointsQuantity/2);

        var node3;
        var textNode1;

        for(var i = 0; i < pointsQuantity; i++){
            node3 = document.createElement("span");
            textNode1 = document.createTextNode(((maxPointValue - i) * (-1)) + "");
            if((maxPointValue - i) > 0){
                $(node3).css('margin-left', -6 + 'px');
            }
            node3.appendChild(textNode1);
            $(parent).append(node3);
        }
    }
}

function addNewSemantic(){
    var parent = $("[name='newSemanticRowsContainer']");
    var node = $('.semantic-element-pattern').first().clone().get();
    $( node ).removeClass("d-none").removeClass('semantic-element-pattern');
    $( node ).attr("name", "newSemanticSuggestion");

    $(parent).append(node);
}

function addSemantic(parent, leftText, rightText){
    var node = $('.semantic-element-pattern').first().clone().get();
    $( node ).removeClass("d-none").removeClass('semantic-element-pattern');
    $( node ).attr("name", "semanticSuggestion");

    var leftTextNode = $( node ).find("[name='newLeftText']").first();
    $( leftTextNode ).attr("name", "leftText");
    $(leftTextNode).attr("disabled", "true");
    $(leftTextNode).val(leftText);
    var rightTextNode = $( node ).find("[name='newRightText']").first();
    $( rightTextNode ).attr("name", "rightText");
    $(rightTextNode).attr("disabled", "true");
    $(rightTextNode).val(rightText);
    $(parent).append(node);
}

function addNewDistribute(){
    var parent = $("[name='newDistributeRowsContainer']");
    var node = $('.distribute-row-pattern').first().clone().get();
    $( node ).removeClass("d-none").removeClass('distribute-row-pattern');
    $( node ).attr("name", "newDistributeRow");

    $(parent).append(node);
}

function addDistribute(parent, text){
    var node = $('.distribute-row-pattern').first().clone().get();
    $( node ).removeClass("d-none").removeClass('distribute-row-pattern');
    $( node ).attr("name", "distributeRow");

    var distributeRowText = $( node ).find("[name='distributeRowText']").first();
    $(distributeRowText).attr("disabled", "true");
    $(distributeRowText).val(text);

    $(parent).append(node);
}

function addDistributePoints(parent, text){
    const node1 = document.createElement("div");
    node1.className += "row py-2";

    const node2 = document.createElement("div");
    node2.className += "col-5 d-flex justify-content-start";

    const node21 = document.createElement("span");
    node21.setAttribute("name", "distributePointsTitle");

    const textNode21 = document.createTextNode("Осталось распределить:");

    const node3 = document.createElement("div");
    node3.className += "col d-flex justify-content-start";

    const node31 = document.createElement("span");
    node31.setAttribute("name", "distributePointsValue");

    const textNode31 = document.createTextNode(text);

    node21.appendChild(textNode21);
    node2.appendChild(node21);

    node31.appendChild(textNode31);
    node3.appendChild(node31);

    node1.appendChild(node2);
    node1.appendChild(node3);

    parent.appendChild(node1);
}

function toResultsPage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/" + "results/" + questionnaireId;
}

function toSharePage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/share/" + questionnaireId;
}

function toPreferencesPage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/preferences/" + questionnaireId;
}

function goToEditor(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/builder/" + questionnaireId;
}

function beforeCloseModal(){
    $('#addElementButtonId').unbind('click');
    $('.btn-close').unbind('click');
    var createStarContainer = $('#create-star-container-id').get();
    $( createStarContainer ).empty();
    createStar(createStarContainer, 0);
    createStar(createStarContainer, 1);

    $('#simpleSelectContainerID').addClass('d-none');
    $('#simpleSelectContainerID').addClass('d-none');
    $('#ratingContainerID').addClass('d-none');
    $('#sortItemsContainerID').addClass('d-none');
    $('#semanticContainerID').addClass('d-none');
    $('#distributeContainerId').addClass('d-none');
}

function checkQuestionnaire(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    $.get("/questionnaire/load/" + questionnaireId, function(data, status){
        if(data.errorMessage){
            console.log(data.errorMessage);
        }else{
            if(data.status === "published"){
                $('#updateButtonId').parent().removeClass('d-none');
                $('#publishButtonId').parent().addClass('d-none');

                $('#sharePageBtnId').removeAttr("disabled");
                $('#resultsPageBtnId').removeAttr("disabled");
            }
            var pages = $(".carousel-item");
            var questionsBlocks;
            var suggestions;
            var title;
            var page

            for(var counter = 0; counter < data.pages.length; counter++){
                page = data.pages[counter];
                if(counter === 0){
                    //var questionBlockContainer = $('#qBlockContainer_0');
                    var selectQuestionTypeContainer = $('#selectQuestionType_' + (counter+1));

                    var questionBlock;
                    for(var i = 0; i < page.questions.length; i++){
                        questionBlock = buildQuestionBlock(page.questions[i]);
                        $(questionBlock).insertBefore(selectQuestionTypeContainer);
                    }
                }
                else{
                    addNewCarouselItem(page);
                }
            }
        }
    });
}

function buildQuestionBlock(question){
    var questionTitle = question.title;
    var suggestions = question.suggestions;
    var qType = question.type;

    const node1 = document.createElement("div");
    node1.className += "row py-2 border-top border-bottom d-flex justify-content-center question-block";
    node1.id = "q_" + questionId;
    $(node1).attr('qType', qType);
    questionId++;
    const node2 = document.createElement("div");
    node2.className += "col-7 d-flex justify-content-center flex-column";

    addQuestionTitle(node2, 1, questionTitle);
    /*addQuestionBlockTitle(node2, questionTitle);*/

    if(qType === "SINGLE" || qType === "MULTI"){
        for(var i = 0; i < suggestions.length; i++){
            addSimpleSuggestion(node2, suggestions[i].text, qType);
        }
    }
    else if(qType === "RATING"){
        addRating(node2, suggestions[0].text);
    }
    else if(qType === "SORTED"){
        addSorting(node2, suggestions);
    }
    else if(qType === "SEMANTIC"){
        addPointsFromLoad(node2, suggestions[0].text);
        for(var i = 0; i < suggestions.length; i++){
            addSemanticFromLoad(node2, suggestions[i].text);
        }
    }
    else if(qType === "DISTRIBUTE"){
        addDistributePointsFromLoad(node2, suggestions[0].text);
        for(var i = 0; i < suggestions.length; i++){
            addDistributeFromLoad(node2, suggestions[i].text);
        }
    }

    node1.appendChild(node2);

    return node1;
}

function addNewCarouselItem(page){
    pageCount++;
    carouselPage = (pageCount - 1);
    var newItem = $( '.pattern-item' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-item').addClass("questionsPage");
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

    var selectQuestionTypeContainer = $('#selectQuestionType_' + carouselPage);
    var questionBlock;
    for(var i = 0; i < page.questions.length; i++){
        questionBlock = buildQuestionBlock(page.questions[i]);
        $(questionBlock).insertBefore(selectQuestionTypeContainer);
    }

}

function addSimpleSuggestion(parent, text, questionType){
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

    node2.appendChild(node3);
    node1.appendChild(node2);
    parent.appendChild(node1);
}

function addRating(parent, text){
    const node1= document.createElement("div");
    node1.className += "row py-2";
    const node2 = document.createElement("div");
    node2.className += "col";
    const node3 = document.createElement("div");
    node3.className += "container border-top border-bottom";
    const node4 = document.createElement("div");
    node4.className += "rating";

    var starsCount = parseInt(text);

    for(var i = 0; i < starsCount; i++){
        createStarFromLoad(node4, i);
    }

    node3.appendChild(node4);
    node2.appendChild(node3);
    node1.appendChild(node2);
    parent.appendChild(node1);
}

function createStarFromLoad(createStarContainer, count){
    const input = document.createElement("input");
    input.name = "rating";
    input.type = "radio";
    input.setAttribute("value", count + 1);
    input.id = count + 1;
    const label = document.createElement("label");
    label.setAttribute("for", count + 1);
    $(label).on("click", markStar)
    const textNode1 = document.createTextNode('☆');

    label.appendChild(textNode1);

    $(createStarContainer).append(input);
    $(createStarContainer).append(label);
}

function markStar(){
    $(this).parent().find("label").removeClass("star-selected");
    $(this).addClass("star-selected");
}

function addSorting(parent, suggestions){
    Sortable.create(parent, {
        animation: 100,
        group: 'list-1',
        draggable: '.list-group-item',
        handle: '.list-group-item',
        sort: true,
        filter: '.sortable-disabled',
        chosenClass: 'active'
    });
    for(var i = 0; i < suggestions.length; i++){
        createSortedItemFromLoad(parent, suggestions[i].text, i);
    }
}

function createSortedItemFromLoad(createSortedItemContainer, text, baseOrderNum){
    var node = $('.pattern-sorted-item').first().clone().get();
    $( node ).removeClass("d-none").removeClass('pattern-sorted-item');
    $( node ).attr('base-order', baseOrderNum);

    var sortItem = $( node ).find("[name='suggestion']").first();
    $( sortItem ).val(text);
    $( sortItem ).attr("disabled", "true");

    $(createSortedItemContainer).append(node);
}

function addPointsFromLoad(parent, text){
    const myArray = text.split("|");
    var length = myArray[1];
    var node = $('.semantic-pattern').first().clone().get();
    $( node ).removeClass("d-none").removeClass('semantic-pattern');

    var semanticPointsContainer = $( node ).find("span").first().parent();
    $( semanticPointsContainer ).empty();

    var maxPointValue = parseInt(length/2);

    var node3;
    var textNode1;

    for(var i = 0; i < length; i++){
        node3 = document.createElement("span");
        textNode1 = document.createTextNode(((maxPointValue - i) * (-1)) + "");
        if((maxPointValue - i) > 0){
            $(node3).css('margin-left', -6 + 'px');
        }
        node3.appendChild(textNode1);
        $(semanticPointsContainer).append(node3);
    }

    $(parent).append(node);
}

function addSemanticFromLoad(parent, text){
    const myArray = text.split("|");
    var leftText = myArray[0];
    var length = myArray[1];
    var rightText = myArray[2];
    var maxPointValue = parseInt(length/2);

    var node = $('.semantic-element-pattern').first().clone().get();
    $( node ).removeClass("d-none").removeClass('semantic-element-pattern');
    $( node ).attr("name", "semanticChoice");

    var range = $( node ).find("[name='range']");
    $(range).attr("min", (maxPointValue * (-1)));
    $(range).attr("max", maxPointValue);
    $(range).attr("value", 0);

    var leftTextNode = $( node ).find("[name='newLeftText']").first();
    $( leftTextNode ).attr("name", "leftText");
    $(leftTextNode).attr("disabled", "true");
    $(leftTextNode).val(leftText);
    var rightTextNode = $( node ).find("[name='newRightText']").first();
    $( rightTextNode ).attr("name", "rightText");
    $(rightTextNode).attr("disabled", "true");
    $(rightTextNode).val(rightText);
    $(parent).append(node);
}

function addDistributePointsFromLoad(parent, text){
    const myArray = text.split("|");
    var pointsValueText = myArray[1];

    const node1 = document.createElement("div");
    node1.className += "row py-2";

    const node2 = document.createElement("div");
    node2.className += "col-5 d-flex justify-content-start";

    const node21 = document.createElement("span");
    node21.setAttribute("name", "distributePointsTitle");

    const textNode21 = document.createTextNode("Осталось распределить:");

    const node3 = document.createElement("div");
    node3.className += "col d-flex justify-content-start";

    const node31 = document.createElement("span");
    node31.setAttribute("name", "distributePointsValue");

    const textNode31 = document.createTextNode(pointsValueText);

    node21.appendChild(textNode21);
    node2.appendChild(node21);

    node31.appendChild(textNode31);
    node3.appendChild(node31);

    node1.appendChild(node2);
    node1.appendChild(node3);

    parent.appendChild(node1);
}

function addDistributeFromLoad(parent, text){
    const myArray = text.split("|");
    var distributeText = myArray[0];
    var maxValue = myArray[1];
    var node = $('.distribute-row-pattern').first().clone().get();
    $( node ).removeClass("d-none").removeClass('distribute-row-pattern');
    $( node ).attr("name", "distributeRow");

    $( node ).find("[name='constMaxValue']").val(maxValue);


    var customRange = $( node ).find("[name='customRange']");
    $(customRange).attr("min", 0);
    $(customRange).attr("max", maxValue);
    $(customRange).attr("value", 0);
    $(customRange).on("input", function (event){
        updateDistribute(this, event);
    });

    var distributeRowText = $( node ).find("[name='distributeRowText']").first();
    $(distributeRowText).attr("disabled", "true");
    $(distributeRowText).val(distributeText);

    $(parent).append(node);
}

function updateDistribute(element, event){
    $(element).addClass("current");
    var rangesList = $(element).closest(".question-block").find("[name='customRange']");

    var sum = parseInt(0);
    for(var i = 0; i < rangesList.length; i++){
        sum += parseInt($(rangesList[i]).val());
    }

    var constMaxValueText = $( element ).parent().find("[name='constMaxValue']").val();
    var constMaxValue = parseInt(constMaxValueText);

    if((constMaxValue - sum) <= 0){
        var leftRangesList = $(element).closest(".question-block").find("[name='customRange']:not(.current)");
        var sum2 = parseInt(0);
        for(var i = 0; i < leftRangesList.length; i++){
            sum2 += parseInt($(leftRangesList[i]).val());
        }
        $(element).val((constMaxValue - sum2));
        $(element).closest("[name='customRangeContainer']").find("span").text($(element).val());
        var distributePointsValueElement = $(element).closest(".question-block").find("[name='distributePointsValue']").first().text("0");
    }else{
        var distributePointsValueElement = $(element).closest(".question-block").find("[name='distributePointsValue']").first();
        $(distributePointsValueElement).text((constMaxValue - sum));
        $(element).closest("[name='customRangeContainer']").find("span").text($(element).val());
    }
    $(element).removeClass("current");
}

function suggestionSelected(element){
    $(element).blur();
    if($(element).hasClass("selected")){
        $(element).removeClass("selected");
    }else{
        var qType = $(element).attr("qType");
        if(qType === "SINGLE"){
            var questionsInBlock = $(element).closest('.question-block').find("[name='suggestion']");
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