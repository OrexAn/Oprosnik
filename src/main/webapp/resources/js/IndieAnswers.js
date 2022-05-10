var staticGridOptions;
var staticGrid;

$(document).ready(function(){
    initIndieAnswers();
});

function initIndieAnswers(){
    setStaticHomeTable();
}

function setStaticHomeTable(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    // specify the data
    const rowData = [];
    $.get("/questionnaire/answers/" + questionnaireId, function(data, status){
        if(data.errorMessage){
            console.log(data.errorMessage);
        }else{
            var row;
            for(var i = 0; i < data.dates.length; i++){
                row = {"#": "", "Дата": "", "Ответы": ""};
                row["#"] = i + 1;
                row["Дата"] = data.dates[i];
                row["Ответы"] = data.answers[i];
                rowData.push(row);
            }

            const columnDefs = [
                { field: "#", width: 80, sortable: true, resizable: true, suppressSizeToFit: true },
                { field: "Дата", width: 250, sortable: true, resizable: true, cellStyle: { 'text-align': 'left' } },
                { field: "Ответы", width: 250, sortable: true, resizable: true, cellStyle: { 'text-align': 'left' } }
            ];
            // let the grid know which columns and what data to use
            staticGridOptions = {
                columnDefs: columnDefs,
                rowData: rowData,
                onGridReady: fitStaticHomeGridCols
            };

            const gridDiv = document.querySelector('#indieAnswersListTableId');
            staticGrid = new agGrid.Grid(gridDiv, staticGridOptions);
        }
    });
}

function fitStaticHomeGridCols() {
    staticGridOptions.api.sizeColumnsToFit();
}