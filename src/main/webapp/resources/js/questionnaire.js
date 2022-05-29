var questionId = 0; //{last id + 1}
var carouselPage = 0;
var pageCount = 1;
var questionnaireAId = -1;

var timeSpend = 0;

$(document).ready(function(){
    createAnswer();
    var questionnaireId = $("[name='questionnaireId']").first().val();
    $.get("/questionnaire/load/" + questionnaireId, function(data, status){
        var pages = $(".carousel-item");
        var questionsBlocks;
        var suggestions;
        var title = data.title;
        var page

        $('#titleId').text(title);

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
        }
    });

    $("#carouselExampleSlidesOnly").carousel();
});

function prev(){
    if(carouselPage > 0){
        carouselPage--;
        $("#finishButtonId").addClass("invisible");
    }else{
        carouselPage = pageCount - 1;
        $("#finishButtonId").removeClass("invisible");
    }
    $("#carouselExampleSlidesOnly").carousel(carouselPage);
}
function next(){
    if(carouselPage < (pageCount - 1)){
        carouselPage++;
        $("#finishButtonId").addClass("invisible");
    }else{
        carouselPage = 0;
        $("#finishButtonId").addClass("invisible");
    }
    if(carouselPage === (pageCount - 1)){
        $("#finishButtonId").removeClass("invisible");
    }
    $("#carouselExampleSlidesOnly").carousel(carouselPage);
}

function startQuestionnaire(){
    $("#startBlockId").addClass("d-none");
    $("#progressBlockId").removeClass("d-none");
    $("#buttonsBlockId").removeClass("invisible");
}

function addCarouselItem(page){
    pageCount++;
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
    var qType = question.type;

    const node1 = document.createElement("div");
    node1.className += "row py-2 border-top border-bottom d-flex justify-content-center question-block";
    node1.id = "q_" + questionId;
    $(node1).attr('qType', qType);
    questionId++;
    const node2 = document.createElement("div");
    node2.className += "col-7 d-flex justify-content-center flex-column";

    addQuestionBlockTitle(node2, questionTitle);

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
        addPoints(node2, suggestions[0].text);
        for(var i = 0; i < suggestions.length; i++){
            addSemantic(node2, suggestions[i].text);
        }
    }
    else if(qType === "DISTRIBUTE"){
        addDistributePoints(node2, suggestions[0].text);
        for(var i = 0; i < suggestions.length; i++){
            addDistribute(node2, suggestions[i].text);
        }
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
    node4.id = (Date.now() + 1) + '';

    var starsCount = parseInt(text);

    for(var i = 0; i < starsCount; i++){
        createStar(node4, i);
    }

    node3.appendChild(node4);
    node2.appendChild(node3);
    node1.appendChild(node2);
    parent.appendChild(node1);
}

function createStar(createStarContainer, count){
    const input = document.createElement("input");
    input.name = "rating";
    input.type = "radio";
    input.setAttribute("value", count + 1);
    input.id = createStarContainer.id + "_" + (count + 1);
    const label = document.createElement("label");
    label.setAttribute("for", createStarContainer.id + "_" + (count + 1));
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
        createSortedItem(parent, suggestions[i].text, i);
    }
}

function createSortedItem(createSortedItemContainer, text, baseOrderNum){
    var node = $('.pattern-sorted-item').first().clone().get();
    $( node ).removeClass("d-none").removeClass('pattern-sorted-item');
    $( node ).attr('base-order', baseOrderNum);

    var sortItem = $( node ).find("[name='suggestion']").first();
    $( sortItem ).val(text);
    $( sortItem ).attr("disabled", "true");

    $(createSortedItemContainer).append(node);
}

function addPoints(parent, text){
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

function addSemantic(parent, text){
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

function addDistributePoints(parent, text){
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

function addDistribute(parent, text){
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

/**/
function createAnswer(){
    timeSpend = Date.now() / 1000;
    var questionnaireQId = $("[name='questionnaireId']").first().val();
    var currentdate = new Date();
    var datetime = currentdate.getUTCFullYear() + "-"
        + ("0" + (currentdate.getUTCMonth()+1)).slice(-2)  + "-"
        + ("0" + currentdate.getUTCDate()).slice(-2) + "T"
        + ("0" + currentdate.getUTCHours()).slice(-2) + ":"
        + ("0" + currentdate.getUTCMinutes()).slice(-2) + ":"
        + ("0" + currentdate.getUTCSeconds()).slice(-2);
    var questionnaire = {
        "creatorID" : 1,
        "questionnaireType" : "ANSWER",
        "status" : "CREATED",
        "qQuestionId" : questionnaireQId,
        "date" : datetime
    };
    $.ajax({
        type: "POST",
        url: "/questionnaire/new/answer",
        data: JSON.stringify(questionnaire),
        success: createAnswerCallback,
        contentType: "application/json"
    });
}

function createAnswerCallback(data, status){
    $("[name='questionnaireAId']").first().val(data.newQuestionnaireId);
    questionnaireAId = data.newQuestionnaireId;
}

function finishAnswer(){
    timeSpend = (Date.now() / 1000) - timeSpend;
    var questionBlocks = $('.question-block');
    var questionnairePages = $('.questionsPage');
    var questionnaireQId = $("[name='questionnaireId']").first().val();

    var currentdate = new Date();
    var datetime = currentdate.getUTCFullYear() + "-"
        + ("0" + (currentdate.getUTCMonth()+1)).slice(-2)  + "-"
        + ("0" + currentdate.getUTCDate()).slice(-2) + "T"
        + ("0" + currentdate.getUTCHours()).slice(-2) + ":"
        + ("0" + currentdate.getUTCMinutes()).slice(-2) + ":"
        + ("0" + currentdate.getUTCSeconds()).slice(-2);


    var answer = {};
    var status = "PASSED"
    var questionnaire = {
        "id" : questionnaireAId,
        "qQuestionId" : questionnaireQId,
        "answers" : [],
        "creatorID" : 1,
        "date" : datetime,
        "questionnaireType" : "ANSWER",
        "timeSpend": timeSpend,
        "status" : status
    };

    for(var i = 0; i < questionBlocks.length; i++){  //итерация по номеру блока с вопросом

        var qType = $( questionBlocks[i] ).attr("qType");
        if( qType === "SINGLE" ){
            //---------------------------------------------------------------------------
            var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();
            var suggestionsList = $( questionBlocks[i] ).find( "[name='suggestion']" );

            answer["answerType"] = qType;
            answer["orderNum"] = i;
            answer["text"] = title + "~";

            for(var j = 0; j < suggestionsList.length; j++){   //итерации по каждой строке-предложении в SINGLE, MULTI или SORTED блоке
                if($(suggestionsList[j]).hasClass("selected")){
                    answer["text"] += j;
                    break;
                }
            }
            questionnaire["answers"].push(answer);
            answer = {}
            //---------------------------------------------------------------------------
        }
        else if( qType === "MULTI" ){
            //---------------------------------------------------------------------------
            var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();
            var suggestionsList = $( questionBlocks[i] ).find( "[name='suggestion']" );

            answer["answerType"] = qType;
            answer["orderNum"] = i;

            var selectedItems = $( questionBlocks[i] ).find(".selected");
            var isFirst = true;
            var hasSelected = false;

            for(var j = 0; j < suggestionsList.length; j++){   //итерации по каждой строке-предложении в SINGLE, MULTI или SORTED блоке
                hasSelected = $(suggestionsList[j]).hasClass("selected");
                if(hasSelected && isFirst){
                    isFirst = false;
                    answer["text"] = title + "~" + j;
                }
                else if(hasSelected){
                    answer["text"] += "|" + j;
                }
            }
            questionnaire["answers"].push(answer);
            answer = {}
            //---------------------------------------------------------------------------
        }
        else if(qType === "RATING"){
            //for Rating
            var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();
            var starsList = $( questionBlocks[i] ).find("[name='rating']");
            var selectedStar = $( questionBlocks[i] ).find(".star-selected").first();

            var inputId = $(selectedStar).attr("for");
            var value = $('#' + inputId).val();
            var ratingVal = starsList.length - parseInt(value) + 1;

            answer["answerType"] = $( questionBlocks[i] ).attr("qType");
            answer["orderNum"] = i;

            answer["text"] = title + "~" + ratingVal;
            questionnaire["answers"].push(answer);

            answer = {}
            //---------------------------------------------------------------------------
        }
        else if( qType === "SORTED"){
            //---------------------------------------------------------------------------
            var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();
            var suggestionsList = $( questionBlocks[i] ).find( "[name='suggestion']" );

            answer["answerType"] = qType;
            answer["orderNum"] = i;

            var isFirst = true;
            var baseOrderNum;

            for(var j = 0; j < suggestionsList.length; j++){
                baseOrderNum = $(suggestionsList[j]).closest(".list-group-item").attr("base-order");
                if(isFirst){
                    isFirst = false;
                    answer["text"] = title + "~" + baseOrderNum + ":" + j;
                }
                else{
                    answer["text"] += "|" + baseOrderNum + ":" + j;
                }
            }
            questionnaire["answers"].push(answer);
            answer = {}
            //---------------------------------------------------------------------------
        }
        else if(qType === "SEMANTIC"){
            //for semantic
            var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();

            var rangesList = $( questionBlocks[i] ).find( "[name='range']" );

            answer["answerType"] = $( questionBlocks[i] ).attr("qType");
            answer["orderNum"] = i;

            var isFirst = true;
            var rangeVal = false;

            for(var j = 0; j < rangesList.length; j++){   //итерации по каждой строке-предложении SEMANTIC
                var rangeVal = $(rangesList[j]).val();
                if(isFirst){
                    isFirst = false;
                    answer["text"] = title + "~" + j + ":" + rangeVal;
                }
                else{
                    answer["text"] += "|" + j + ":" + rangeVal;
                }
            }

            questionnaire["answers"].push(answer);
            answer = {}
            //---------------------------------------------------------------------------
        }
        else if(qType === "DISTRIBUTE"){
            var title = $( questionBlocks[i] ).find( "[name='title']" ).first().text();
            //for distribute
            var rangesList = $( questionBlocks[i] ).find( "[name='customRange']" );

            answer["answerType"] = $( questionBlocks[i] ).attr("qType");
            answer["orderNum"] = i;

            var isFirst = true;
            var rangeVal = false;

            for(var j = 0; j < rangesList.length; j++){   //итерации по каждой строке-предложении SEMANTIC
                var rangeVal = $(rangesList[j]).val();
                if(isFirst){
                    isFirst = false;
                    answer["text"] = title + "~" + j + ":" + rangeVal;
                }
                else{
                    answer["text"] += "|" + j + ":" + rangeVal;
                }
            }

            questionnaire["answers"].push(answer);
            answer = {}
            //---------------------------------------------------------------------------
        }
    }

    $.ajax({
        type: "PUT",
        url: "/questionnaire/update/answer",
        data: JSON.stringify(questionnaire),
        success: function() {
            window.location.href = "/" + "questionnaire/thanks";
        },
        contentType: "application/json"
    });
}