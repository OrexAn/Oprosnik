var myTimeChart;
var myStatusChart;

function loadQuestionnaireStateStatistic(){
    $('#stateChartContainerId').empty();

    var questionnaireId = $("[name='questionnaireId']").first().val();
    $.get("/questionnaire/state/stat/load/" + questionnaireId, function(data, status){
        if(data.errorMessage){
            console.log(data.errorMessage);
        }else{
            newTimeChartBlock(data.timeRanges, data.timeSpendCount);
            newStatusChartBlock(data.finished, data.notFinished);
        }
    });
}

function newTimeChartBlock(timeRanges, timeSpendCount){
    if(myTimeChart){
        myTimeChart.destroy();
    }
    var newChartId = "chart_" + Date.now();
    var newTriggerId = Date.now() + 1;

    var chartContainer = $('#stateChartContainerId');

    var newItem = $( '.pattern-chart-block' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-chart-block');
    $( newItem ).find('.pattern-title-class').text("Время прохождения опроса");
    $( newItem ).find('#pattern-my-Chart-Id').attr("id", newChartId);

    ///////////////////////////////////////////////////

    $( newItem ).find('#pattern-my-trigger-id').attr("id", "trigger_" + newTriggerId).addClass("trigger-details d-none");

    $(chartContainer).append(newItem);

    var data4Chart = [];
    var labels = [];
    var backgroundColors = [];
    for(var i = 0; i < timeSpendCount.length; i++){
        labels.push("" + timeRanges[i]);
        data4Chart.push(timeSpendCount[i]);
        backgroundColors.push(getRandomColor());
    }

    var ctxB = document.getElementById(newChartId).getContext('2d');
    myTimeChart = new Chart(ctxB, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Кол-во анкет',
                data: data4Chart,
                backgroundColor: backgroundColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function newStatusChartBlock(finished, notFinished){
    if(myStatusChart){
        myStatusChart.destroy();
    }

    var newChartId = "chart_" + Date.now();
    var newTriggerId = Date.now() + 1;

    var chartContainer = $('#stateChartContainerId');

    var newItem = $( '.pattern-chart-block' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-chart-block');
    $( newItem ).find('.pattern-title-class').text('Статус анкет');
    $( newItem ).find('#pattern-my-Chart-Id').attr("id", newChartId);

    $( newItem ).find('#pattern-my-trigger-id').attr("id", "trigger_" + newTriggerId).addClass("trigger-details d-none");

    $(chartContainer).append(newItem);

    var data4Chart = [];
    var labels = [];
    var backgroundColors = [];

    labels.push("Завершено");
    data4Chart.push(finished);
    backgroundColors.push(getRandomColor());
    labels.push("Прервано");
    data4Chart.push(notFinished);
    backgroundColors.push(getRandomColor());


    const ctxP = document.getElementById(newChartId).getContext('2d');
    myStatusChart = new Chart(ctxP, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Кол-во анкет',
                data: data4Chart,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}