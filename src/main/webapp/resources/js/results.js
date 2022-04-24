$(window).on('load',function(){
    $('#myTrigger').click(function (){
        $('#myModal').modal('show');
    });
});
$(document).ready(function(){

    loadAnswersStatistic();


    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'horizontalBar',
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
    /*-----------------------------------------------*/
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const myChart2 = new Chart(ctx2, {
        type: 'horizontalBar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Число голосов',
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
    var ctxD = document.getElementById("doughnutChart").getContext('2d');
    var myLineChart = new Chart(ctxD, {
        type: 'doughnut',
        data: {
            labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
            datasets: [{
                data: [300, 50, 100, 40, 120],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }]
        },
        options: {
            responsive: true
        }
    });
    //-----------------------------------------
    //
    var ctx5 = document.getElementById('wrapper').getContext('2d');
    ctx5.canvas.width = 350;
    ctx5.canvas.height = 350;
    var chart = new Chart(ctx5, {
        type: 'horizontalBar',
        data: {
            labels: ["January", "February", "March", "April"],
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 1, 2, -2],
                stack: 'a'
            }, {
                label: "My Second dataset",
                backgroundColor: 'rgb(2, 99, 132)',
                borderColor: 'rgb(2, 99, 132)',
                data: [-2, -1, -1, 1],
                stack: 'b'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        min: -3,
                        max: 3
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
            }
        }
    });
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
    var ctxP = document.getElementById("pieChart").getContext('2d');
    var myPieChart = new Chart(ctxP, {
        type: 'pie',
        data: {
            labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
            datasets: [{
                data: [300, 50, 100, 40, 120],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }]
        },
        options: {
            responsive: true
        }
    });
});

function goToEditor(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.replace("/" + "questionnaire/builder/" + questionnaireId);
}

function toSharePage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.replace("/questionnaire/share/" + questionnaireId);
}

function toPreferencesPage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.replace("/questionnaire/preferences/" + questionnaireId);
}

function toResultsPage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.replace("/questionnaire/" + "results/" + questionnaireId);
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
            break;
        case 2:
            $(stateElement).removeClass("d-none");
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

            }
        }
    });
}