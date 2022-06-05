var modalChart;
$(window).on('load',function(){
    /*$('.trigger-details').click(function (){
        $('#myModal').modal('show');
    });*/
});
$(document).ready(function(){

    loadAnswersStatistic();



    /*-----------------------------------------------*/
    /*const ctx = document.getElementById(newChartId).getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: data4Chart,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        min: 0
                    }
                }],
                y: {
                    beginAtZero: true
                }
            }
        }
    });*/
    /*

    //polar-----------------------------------
    var ctxPA = document.getElementById("polarChart").getContext('2d');
    var myPolarChart = new Chart(ctxPA, {
        type: 'polarArea',
        data: {
            labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
            datasets: [{
                data: [300, 50, 100, 40, 120],
                backgroundColor: ["rgba(219, 0, 0, 0.1)", "rgba(0, 165, 2, 0.1)", "rgba(255, 195, 15, 0.2)",
                    "rgba(55, 59, 66, 0.1)", "rgba(0, 0, 0, 0.3)"
                ],
                hoverBackgroundColor: ["rgba(219, 0, 0, 0.2)", "rgba(0, 165, 2, 0.2)",
                    "rgba(255, 195, 15, 0.3)", "rgba(55, 59, 66, 0.1)", "rgba(0, 0, 0, 0.4)"
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
    //---------------------------------------------------------------------------
    //doughnut

    //-----------------------------------------
    //

    //-----------------------------------------
    //---------------------
    const ctx7 = document.getElementById('myChart7').getContext('2d');
    const myChart7 = new Chart(ctx7, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    //-----------------------------------------------
    //-----------------------------------------------
    //pie
    */
});

function goToEditor(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/builder/" + questionnaireId;
}

function toSharePage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/share/" + questionnaireId;
}

function toPreferencesPage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/preferences/" + questionnaireId;
}

function toResultsPage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/" + "results/" + questionnaireId;
}

function toIndieAnswersSection(number){
    var analyticsElement = $("#analyticsId").first();
    var answersElement = $("#answersId").first();
    var stateElement = $("#stateId").first();

    $(analyticsElement).addClass("d-none");
    $(answersElement).addClass("d-none");
    $(stateElement).addClass("d-none");

    switch (number){
        case 0:
            $(analyticsElement).removeClass("d-none");
            break;
        case 1:
            $(answersElement).removeClass("d-none");
            //setStaticHomeTable();
            fitStaticHomeGridCols();
            break;
        case 2:
            $(stateElement).removeClass("d-none");
            loadQuestionnaireStateStatistic();
            break;
    }
}

function loadAnswersStatistic(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    $.get("/questionnaire/answers/stat/load/" + questionnaireId, function(data, status){
        if(data.errorMessage){
            console.log(data.errorMessage);
        }else{
            for(var i = 0; i < data.answersStat.length; i++){ //итерация по каждому блоку-ответу
                if(data.answersTypes[i] === 'single'){
                    newSingleChartBlock(data.answersStat[i], data.answersTitles[i], data.answersVariants[i]);
                }else if(data.answersTypes[i] === 'multi'){
                    newMultiChartBlock(data.answersStat[i], data.answersTitles[i], data.answersVariants[i]);
                }else if(data.answersTypes[i] === 'rating'){
                    newRatingChartBlock(data.answersStat[i], data.answersTitles[i], data.answersVariants[i]);
                }else if(data.answersTypes[i] === 'sorted'){
                    newSortedChartBlock(data.answersStat[i], data.answersTitles[i], data.answersVariants[i]);
                }else if(data.answersTypes[i] === 'semantic'){
                    newSemanticChartBlock(data.answersStat[i], data.answersTitles[i], data.answersVariants[i]);
                }else if(data.answersTypes[i] === 'distribute'){
                    newDistributeChartBlock(data.answersStat[i], data.answersTitles[i], data.answersVariants[i]);
                }
            }
            $('#acceptFilterButtonId').on('click', function (){ return false; });
        }
    });
}

function newSingleChartBlock(data, title, variants){
    var newChartId = "chart_" + Date.now();
    var newTriggerId = Date.now() + 1;

    var chartContainer = $('#chartContainerId');

    var newItem = $( '.pattern-chart-block' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-chart-block');
    $( newItem ).find('.pattern-title-class').text(title);
    $( newItem ).find('#pattern-my-Chart-Id').attr("id", newChartId);



    $( newItem ).find('#pattern-my-trigger-id').attr("id", "trigger_" + newTriggerId).addClass("trigger-details");
    $( newItem ).find("#trigger_" + newTriggerId).on("click", function (){
        var containers = $('.filter-container');
        for(var s = 0; s < containers.length; s++){
            $(containers[s]).addClass('d-none');
        }
        $('#singleFilterOptionsContainerId').removeClass("d-none");
        /////////////////////////////////////////////////////////////////////////
        $('#acceptFilterButtonId').unbind('click');
        $('#acceptFilterButtonId').on('click', function (){
            var text = $('#singleFilterOptionsContainerId').find('input').val();
            /////////////////////////////////////////////////////////////////
            $('#modalChart').empty();
            if(modalChart){
                modalChart.destroy();
            }
            var data4Chart3 = [];
            var labels3 = [];
            var backgroundColors3 = [];
            var wholeNumber = 0;
            for(var i = 0; i < data.length; i++){
                wholeNumber += data[i];
            }
            var flo = parseFloat(text) / 100;
            var a = wholeNumber * flo;

            for(var i = 0; i < data.length; i++){
                if(data[i] > a){
                    labels3.push("" + i);
                    data4Chart3.push(data[i] / wholeNumber * 100);
                    backgroundColors3.push(getRandomColor());
                }
            }

            const ctx3 = document.getElementById('modalChart').getContext('2d');
            modalChart = new Chart(ctx3, {
                type: 'horizontalBar',
                data: {
                    labels: labels3,
                    datasets: [{
                        label: '% of Votes',
                        data: data4Chart3,
                        backgroundColor: backgroundColors3,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                min: 0,
                                callback: function(value, index, ticks) {
                                    return value + "%";
                                }
                            }
                        }],
                        y: {
                            beginAtZero: true
                        }
                    },
                    tooltips: {
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return variants[tooltipItem[0].index];
                            },
                        }
                    }
                }
            });
            $('#myModal').modal('show');
            /////////////////////////////////////////////////////////////////
        });
        /////////////////////////////////////////////////////////////////////////

        $('#topicId').find('h4').text(title);
        $('#modalChart').empty();
        if(modalChart){
            modalChart.destroy();
        }
        var data4Chart2 = [];
        var labels2 = [];
        var backgroundColors2 = [];
        for(var i = 0; i < data.length; i++){
            labels2.push("" + i);
            data4Chart2.push(data[i]);
            backgroundColors2.push(getRandomColor());
        }
        const ctx2 = document.getElementById('modalChart').getContext('2d');
        modalChart = new Chart(ctx2, {
            type: 'horizontalBar',
            data: {
                labels: labels2,
                datasets: [{
                    label: '# of Votes',
                    data: data4Chart2,
                    backgroundColor: backgroundColors2,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            min: 0
                        }
                    }],
                    y: {
                        beginAtZero: true
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return variants[tooltipItem[0].index];
                        },
                    }
                }
            }
        });
        $('#myModal').modal('show');
    });

    $(chartContainer).append(newItem);

    var data4Chart = [];
    var labels = [];
    var backgroundColors = [];
    for(var i = 0; i < data.length; i++){
        labels.push("" + i);
        data4Chart.push(data[i]);
        backgroundColors.push(getRandomColor());
    }
    const ctx = document.getElementById(newChartId).getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: data4Chart,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        min: 0
                    }
                }],
                y: {
                    beginAtZero: true
                }
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return variants[tooltipItem[0].index];
                    },
                }
            }
        }
    });
}

function newMultiChartBlock(data, title, variants){
    var newChartId = "chart_" + Date.now();
    var newTriggerId = Date.now() + 1;

    var chartContainer = $('#chartContainerId');

    var newItem = $( '.pattern-chart-block' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-chart-block');
    $( newItem ).find('.pattern-title-class').text(title);
    $( newItem ).find('#pattern-my-Chart-Id').attr("id", newChartId);



    $( newItem ).find('#pattern-my-trigger-id').attr("id", "trigger_" + newTriggerId).addClass("trigger-details");
    $( newItem ).find("#trigger_" + newTriggerId).on("click", function (){
        ///////////////////////////////////////////////////
        var containers = $('.filter-container');
        for(var s = 0; s < containers.length; s++){
            $(containers[s]).addClass('d-none');
        }
        $('#multiFilterOptionsContainerId').removeClass("d-none");
        /////////////////////////////////////////////////////////////////////////////////////////
        $('#acceptFilterButtonId').unbind('click');
        $('#acceptFilterButtonId').on('click', function (){
            var text = $('#multiFilterOptionsContainerId').find('input').val();
            /////////////////////////////////////////////////////////////////
            $('#modalChart').empty();
            if(modalChart){
                modalChart.destroy();
            }
            var data4Chart3 = [];
            var labels3 = [];
            var backgroundColors3 = [];
            var wholeNumber = 0;
            for(var i = 0; i < data.length; i++){
                wholeNumber += data[i];
            }
            var flo = parseFloat(text) / 100;
            var a = wholeNumber * flo;

            for(var i = 0; i < data.length; i++){
                if(data[i] > a){
                    labels3.push("" + i);
                    data4Chart3.push(data[i] / wholeNumber * 100);
                    backgroundColors3.push(getRandomColor());
                }
            }
            var ctxPA3 = document.getElementById('modalChart').getContext('2d');
            modalChart = new Chart(ctxPA3, {
                type: 'polarArea',
                data: {
                    labels: labels3,
                    datasets: [{
                        data: data4Chart3,
                        backgroundColor: backgroundColors3,
                        hoverBackgroundColor: ["rgba(219, 0, 0, 0.2)", "rgba(0, 165, 2, 0.2)",
                            "rgba(255, 195, 15, 0.3)", "rgba(55, 59, 66, 0.1)", "rgba(0, 0, 0, 0.4)"
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    scale: {
                        ticks: {
                            callback: function(value, index, ticks) {
                                return value + "%";
                            }
                        }
                    },
                    tooltips: {
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return variants[tooltipItem[0].index];
                            },
                        }
                    }
                }
            });
            $('#myModal').modal('show');
            /////////////////////////////////////////////////////////////////
        });
        ///////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////
        $('#topicId').find('h4').text(title);
        $('#modalChart').empty();
        if(modalChart){
            modalChart.destroy();
        }
        var data4Chart2 = [];
        var labels2 = [];
        var backgroundColors2 = [];
        for(var i = 0; i < data.length; i++){
            labels2.push("" + i);
            data4Chart2.push(data[i]);
            backgroundColors2.push(getRandomColor());
        }
        var ctxPA2 = document.getElementById('modalChart').getContext('2d');
        modalChart = new Chart(ctxPA2, {
            type: 'polarArea',
            data: {
                labels: labels2,
                datasets: [{
                    data: data4Chart2,
                    backgroundColor: backgroundColors2,
                    hoverBackgroundColor: ["rgba(219, 0, 0, 0.2)", "rgba(0, 165, 2, 0.2)",
                        "rgba(255, 195, 15, 0.3)", "rgba(55, 59, 66, 0.1)", "rgba(0, 0, 0, 0.4)"
                    ]
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return variants[tooltipItem[0].index];
                        },
                    }
                }
            }
        });

        $('#myModal').modal('show');
    });

    $(chartContainer).append(newItem);

    var data4Chart = [];
    var labels = [];
    var backgroundColors = [];
    for(var i = 0; i < data.length; i++){
        labels.push("" + i);
        data4Chart.push(data[i]);
        backgroundColors.push(getRandomColor());
    }
    var ctxPA = document.getElementById(newChartId).getContext('2d');
    var myPolarChart = new Chart(ctxPA, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                data: data4Chart,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: ["rgba(219, 0, 0, 0.2)", "rgba(0, 165, 2, 0.2)",
                    "rgba(255, 195, 15, 0.3)", "rgba(55, 59, 66, 0.1)", "rgba(0, 0, 0, 0.4)"
                ]
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return variants[tooltipItem[0].index];
                    },
                }
            }
        }
    });
}

function newRatingChartBlock(data, title, variants){
    var newChartId = "chart_" + Date.now();
    var newTriggerId = Date.now() + 1;

    var chartContainer = $('#chartContainerId');

    var newItem = $( '.pattern-chart-block' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-chart-block');
    $( newItem ).find('.pattern-title-class').text(title);
    $( newItem ).find('#pattern-my-Chart-Id').attr("id", newChartId);




    $( newItem ).find('#pattern-my-trigger-id').attr("id", "trigger_" + newTriggerId).addClass("trigger-details");
    $( newItem ).find("#trigger_" + newTriggerId).on("click", function (){
        ///////////////////////////////////////////////////
        var containers = $('.filter-container');
        for(var s = 0; s < containers.length; s++){
            $(containers[s]).addClass('d-none');
        }
        $('#ratingFilterOptionsContainerId').removeClass("d-none");

        $('#ratingFilterOptionsSelectId').empty();
        for(var tt = 0; tt < data.length - 2; tt++){
            var node = document.createElement("option");
            $(node).text(tt + 1);
            $(node).val(tt + 1);
            $('#ratingFilterOptionsSelectId').append(node);
        }
        /////////////////////////////////////////////////////////////////////////////////////////
        $('#acceptFilterButtonId').unbind('click');
        $('#acceptFilterButtonId').on('click', function (){
            var text = $('#ratingFilterOptionsSelectId').val();
            /////////////////////////////////////////////////////////////////
            $('#modalChart').empty();
            if(modalChart){
                modalChart.destroy();
            }
            var data4Chart3 = [];
            var labels3 = [];
            var backgroundColors3 = [];
            for(var i = parseInt(text); i < data.length; i++){
                labels3.push("" + (i + 1));
                data4Chart3.push(data[i]);
                backgroundColors3.push(getRandomColor());
            }
            var ctxD3 = document.getElementById('modalChart').getContext('2d');
            modalChart = new Chart(ctxD3, {
                type: 'doughnut',
                data: {
                    labels: labels3,
                    datasets: [{
                        data: data4Chart3,
                        backgroundColor: backgroundColors3,
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                    }]
                },
                options: {
                    responsive: true,
                    tooltips: {
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return variants[tooltipItem[0].index];
                            },
                        }
                    }
                }
            });
            $('#myModal').modal('show');
            /////////////////////////////////////////////////////////////////
        });
        ///////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////

        $('#topicId').find('h4').text(title);
        $('#modalChart').empty();
        if(modalChart){
            modalChart.destroy();
        }
        var data4Chart2 = [];
        var labels2 = [];
        var backgroundColors2 = [];
        for(var i = 0; i < data.length; i++){
            labels2.push("" + (i + 1));
            data4Chart2.push(data[i]);
            backgroundColors2.push(getRandomColor());
        }
        var ctxD2 = document.getElementById('modalChart').getContext('2d');
        modalChart = new Chart(ctxD2, {
            type: 'doughnut',
            data: {
                labels: labels2,
                datasets: [{
                    data: data4Chart2,
                    backgroundColor: backgroundColors2,
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return variants[tooltipItem[0].index];
                        },
                    }
                }
            }
        });

        $('#myModal').modal('show');
    });

    $(chartContainer).append(newItem);

    var data4Chart = [];
    var labels = [];
    var backgroundColors = [];
    for(var i = 0; i < data.length; i++){
        labels.push("" + (i + 1));
        data4Chart.push(data[i]);
        backgroundColors.push(getRandomColor());
    }
    var ctxD = document.getElementById(newChartId).getContext('2d');
    var myLineChart = new Chart(ctxD, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data4Chart,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return variants[tooltipItem[0].index];
                    },
                }
            }
        }
    });
}

function newSortedChartBlock(data, title, variants){
    var newChartId = "chart_" + Date.now();
    var newTriggerId = Date.now() + 1;

    var chartContainer = $('#chartContainerId');

    var newItem = $( '.pattern-chart-block' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-chart-block');
    $( newItem ).find('.pattern-title-class').text(title);
    $( newItem ).find('#pattern-my-Chart-Id').attr("id", newChartId);



    $( newItem ).find('#pattern-my-trigger-id').attr("id", "trigger_" + newTriggerId).addClass("trigger-details");
    $( newItem ).find("#trigger_" + newTriggerId).on("click", function (){
///////////////////////////////////////////////////
        var containers = $('.filter-container');
        for(var s = 0; s < containers.length; s++){
            $(containers[s]).addClass('d-none');
        }
        $('#sortedFilterOptionsContainerId').removeClass("d-none");
        /////////////////////////////////////////////////////////////////////////////////////////
        $('#acceptFilterButtonId').unbind('click');
        $('#acceptFilterButtonId').on('click', function (){
            var text = $('#sortedFilterOptionsContainerId').find('input').val();
            /////////////////////////////////////////////////////////////////
            $('#modalChart').empty();
            if(modalChart){
                modalChart.destroy();
            }

            var labels3 = [];
            var datasets3 = [];


            var dataset3;
            var data4Chart3;

            for(var j = 0; j < data.length; j++){
                dataset3 = {label: '' + (j+1), backgroundColor: getRandomColor(), data: '', stack: 'Stack ' + j};
                data4Chart3 = [];
                labels3.push("" + j);
/////////////////////////////////////////////////////////////////////////////
                var wholeNumber = 0;
                for(var i = 0; i < data.length; i++){
                    wholeNumber += data[j][i];
                }
                var flo = parseFloat(text) / 100;
                var a = wholeNumber * flo;

                for(var i = 0; i < data.length; i++){
                    if(data[i][j] > a){
                        data4Chart3.push(data[i][j] / wholeNumber * 100);
                    }else{
                        data4Chart3.push(0);
                    }
                }
///////////////////////////////////////////////////////////////////////////////////////////

                dataset3.data = data4Chart3;
                datasets3.push(dataset3);
            }

            var ctx3 = document.getElementById('modalChart').getContext('2d');
            modalChart = new Chart(ctx3, {
                type: 'bar',
                data: {
                    labels: labels3,
                    datasets: datasets3,
                },
                options: {
                    tooltips: {
                        displayColors: true,
                        callbacks:{
                            mode: 'x',
                            title: function(tooltipItem, data) {
                                return variants[tooltipItem[0].index];
                            }
                        },
                    },
                    scales: {
                        xAxes: [{
                            stacked: true,
                            gridLines: {
                                display: false,
                            }
                        }],
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true,
                                callback: function(value, index, ticks) {
                                    return value + "%";
                                }
                            },
                            type: 'linear',
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { position: 'bottom' },
                }
            });
            $('#myModal').modal('show');
            /////////////////////////////////////////////////////////////////
        });
        ///////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////

        $('#topicId').find('h4').text(title);
        $('#modalChart').empty();
        if(modalChart){
            modalChart.destroy();
        }
        var labels2 = [];
        var datasets2 = [];


        var dataset2;
        var data4Chart2;

        for(var j = 0; j < data.length; j++){
            dataset2 = {label: '' + (j+1), backgroundColor: getRandomColor(), data: '', stack: 'Stack ' + j};
            labels2.push("" + j);
            data4Chart2 = [];

            for(var i = 0; i < data.length; i++){
                data4Chart2.push(data[i][j]);
            }

            dataset2.data = data4Chart2;
            datasets2.push(dataset2);
        }

        var ctx2 = document.getElementById('modalChart').getContext('2d');
        modalChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: labels2,
                datasets: datasets2,
            },
            options: {
                tooltips: {
                    displayColors: true,
                    callbacks:{
                        mode: 'x',
                        title: function(tooltipItem, data) {
                            return variants[tooltipItem[0].index];
                        }
                    },
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false,
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                        },
                        type: 'linear',
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: { position: 'bottom' },
            }
        });

        $('#myModal').modal('show');
    });

    $(chartContainer).append(newItem);

    var labels = [];
    var datasets = [];


    var dataset;
    var data4Chart;

    for(var j = 0; j < data.length; j++){
        dataset = {label: '' + (j+1), backgroundColor: getRandomColor(), data: '', stack: 'Stack ' + j};
        labels.push("" + j);
        data4Chart = [];

        for(var i = 0; i < data.length; i++){
            data4Chart.push(data[i][j]);
        }

        dataset.data = data4Chart;
        datasets.push(dataset);
    }

    var ctx = document.getElementById(newChartId).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            tooltips: {
                displayColors: true,
                callbacks:{
                    mode: 'x',
                    title: function(tooltipItem, data) {
                        return variants[tooltipItem[0].index];
                    }
                },
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                    },
                    type: 'linear',
                }]
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: { position: 'bottom' },
        }
    });
}

function newSemanticChartBlock(data, title, variants){
    var newChartId = "chart_" + Date.now();
    var newTriggerId = Date.now() + 1;

    var chartContainer = $('#chartContainerId');

    var newItem = $( '.pattern-chart-block' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-chart-block');
    $( newItem ).find('.pattern-title-class').text(title);
    $( newItem ).find('#pattern-my-Chart-Id').attr("id", newChartId);



    $( newItem ).find('#pattern-my-trigger-id').attr("id", "trigger_" + newTriggerId).addClass("trigger-details");
    $( newItem ).find("#trigger_" + newTriggerId).on("click", function (){
///////////////////////////////////////////////////
        var containers = $('.filter-container');
        for(var s = 0; s < containers.length; s++){
            $(containers[s]).addClass('d-none');
        }
        $('#semanticFilterOptionsContainerId').removeClass("d-none");
        /////////////////////////////////////////////////////////////////////////////////////////
        $('#acceptFilterButtonId').unbind('click');
        $('#acceptFilterButtonId').on('click', function (){
            var text = $('#semanticFilterOptionsSelectId').text();
            var val = $('#semanticFilterOptionsSelectId').val();
            /////////////////////////////////////////////////////////////////
            $('#modalChart').empty();
            if(modalChart){
                modalChart.destroy();
            }
            var data4Chart3 = [];
            var labels3 = [];
            var backgroundColors3 = [];
            for(var i = 0; i < data.length; i++){
                if(parseInt(val) > 0 && data[i] > parseInt(val)){
                    labels3.push("" + i);
                    data4Chart3.push(data[i]);
                    backgroundColors3.push(getRandomColor());
                }else if(parseInt(val) < 0 && data[i] < 0){
                    labels3.push("" + i);
                    data4Chart3.push(data[i]);
                    backgroundColors3.push(getRandomColor());
                }
            }

            var ctx53 = document.getElementById('modalChart').getContext('2d');
            modalChart = new Chart(ctx53, {
                type: 'horizontalBar',
                data: {
                    labels: labels3,
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: backgroundColors3,
                        borderColor: 'rgb(255, 99, 132)',
                        data: data4Chart3,
                        stack: 'a'
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true,
                            ticks: {
                            }
                        }],
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                // Include a dollar sign in the ticks
                                callback: function(value, index, values) {
                                    return value < 0 ? -value : value;
                                }
                            }
                        }],
                        responsive: true,
                        maintainAspectRatio: false
                    },
                    tooltips: {
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return variants[tooltipItem[0].index];
                            },
                        }
                    }
                }
            });
            $('#myModal').modal('show');
            /////////////////////////////////////////////////////////////////
        });
        ///////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////

        $('#topicId').find('h4').text(title);
        $('#modalChart').empty();
        if(modalChart){
            modalChart.destroy();
        }
        var data4Chart2 = [];
        var labels2 = [];
        var backgroundColors2 = [];
        for(var i = 0; i < data.length; i++){
            labels2.push("" + i);
            data4Chart2.push(data[i]);
            backgroundColors2.push(getRandomColor());
        }

        var ctx52 = document.getElementById('modalChart').getContext('2d');
        ctx52.canvas.width = 350;
        ctx52.canvas.height = 350;
        modalChart = new Chart(ctx52, {
            type: 'horizontalBar',
            data: {
                labels: labels2,
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: backgroundColors2,
                    borderColor: 'rgb(255, 99, 132)',
                    data: data4Chart2,
                    stack: 'a'
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true,
                        ticks: {
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                return value < 0 ? -value : value;
                            }
                        }
                    }],
                    responsive: true,
                    maintainAspectRatio: false
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return variants[tooltipItem[0].index];
                        }
                    }
                }
            }
        });

        $('#myModal').modal('show');
    });

    $(chartContainer).append(newItem);

    var data4Chart = [];
    var labels = [];
    var backgroundColors = [];
    for(var i = 0; i < data.length; i++){
        labels.push("" + i);
        data4Chart.push(data[i]);
        backgroundColors.push(getRandomColor());
    }

    var ctx5 = document.getElementById(newChartId).getContext('2d');
    ctx5.canvas.width = 350;
    ctx5.canvas.height = 350;
    var chart = new Chart(ctx5, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: "My First dataset",
                backgroundColor: backgroundColors,
                borderColor: 'rgb(255, 99, 132)',
                data: data4Chart,
                stack: 'a'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return value < 0 ? -value : value;
                        }
                    }
                }],
                responsive: true,
                maintainAspectRatio: false
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return variants[tooltipItem[0].index];
                    }
                }
            }
        }
    });
}

function newDistributeChartBlock(data, title, variants){
    var newChartId = "chart_" + Date.now();
    var newTriggerId = Date.now() + 1;

    var chartContainer = $('#chartContainerId');

    var newItem = $( '.pattern-chart-block' ).first().clone();
    $( newItem ).removeClass("d-none").removeClass('pattern-chart-block');
    $( newItem ).find('.pattern-title-class').text(title);
    $( newItem ).find('#pattern-my-Chart-Id').attr("id", newChartId);



    $( newItem ).find('#pattern-my-trigger-id').attr("id", "trigger_" + newTriggerId).addClass("trigger-details");
    $( newItem ).find("#trigger_" + newTriggerId).on("click", function (){
        ///////////////////////////////////////////////////
        var containers = $('.filter-container');
        for(var s = 0; s < containers.length; s++){
            $(containers[s]).addClass('d-none');
        }
        $('#distributeFilterOptionsContainerId').removeClass("d-none");

        /////////////////////////////////////////////////////////////////////////
        $('#acceptFilterButtonId').unbind('click');
        $('#acceptFilterButtonId').on('click', function (){
            var text = $('#distributeFilterOptionsContainerId').find('input').val();
            /////////////////////////////////////////////////////////////////
            $('#modalChart').empty();
            if(modalChart){
                modalChart.destroy();
            }
            var data4Chart3 = [];
            var labels3 = [];
            var backgroundColors3 = [];

            var wholeNumber = 0;
            for(var i = 0; i < data.length; i++){
                wholeNumber += data[i];
            }
            var flo = parseFloat(text) / 100;
            var a = wholeNumber * flo;

            for(var i = 0; i < data.length; i++){
                if(data[i] > a){
                    labels3.push("" + i);
                    data4Chart3.push(data[i] / wholeNumber * 100);
                    backgroundColors3.push(getRandomColor());
                }
            }

            var ctxP3 = document.getElementById('modalChart').getContext('2d');
            modalChart = new Chart(ctxP3, {
                type: 'pie',
                data: {
                    labels: labels3,
                    datasets: [{
                        data: data4Chart3,
                        backgroundColor: backgroundColors3,
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                    }]
                },
                options: {
                    responsive: true,
                    tooltips: {
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return data['labels'][tooltipItem[0]['index']];
                            },
                            label: function(tooltipItem, data) {
                                var dataset = data['datasets'][0];
                                var percent = dataset['data'][tooltipItem['index']]
                                return percent + '% от полного количества';
                            }
                        },
                        backgroundColor: '#FFF',
                        titleFontSize: 16,
                        titleFontColor: '#0066ff',
                        bodyFontColor: '#000',
                        bodyFontSize: 14,
                        displayColors: false
                    }
                }
            });
            $('#myModal').modal('show');
            /////////////////////////////////////////////////////////////////
        });
        /////////////////////////////////////////////////////////////////////////

        $('#topicId').find('h4').text(title);
        $('#modalChart').empty();
        if(modalChart){
            modalChart.destroy();
        }
        var data4Chart2 = [];
        var labels2 = [];
        var backgroundColors2 = [];
        for(var i = 0; i < data.length; i++){
            labels2.push("" + i);
            data4Chart2.push(data[i]);
            backgroundColors2.push(getRandomColor());
        }

        var ctxP2 = document.getElementById('modalChart').getContext('2d');
        modalChart = new Chart(ctxP2, {
            type: 'pie',
            data: {
                labels: labels2,
                datasets: [{
                    data: data4Chart2,
                    backgroundColor: backgroundColors2,
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                }]
            },
            options: {
                responsive: true
            }
        });

        $('#myModal').modal('show');
    });

    $(chartContainer).append(newItem);

    var data4Chart = [];
    var labels = [];
    var backgroundColors = [];
    for(var i = 0; i < data.length; i++){
        labels.push("" + i);
        data4Chart.push(data[i]);
        backgroundColors.push(getRandomColor());
    }

    var ctxP = document.getElementById(newChartId).getContext('2d');
    var myPieChart = new Chart(ctxP, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data4Chart,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return variants[tooltipItem[0].index];
                    },
                }
            }
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