function updateGraph(sort_criterio){

$.getJSON('data.json', function (data) {

    var nombres = [];
    var valores_correctos = [];
    var valores_incorrectos = [];
    var porcentaje = true;

    switch (sort_criterio) {
        case "correcto":
            data.sort(function(a,b){return a["correcto"]-b["correcto"]});    
            porcentaje = false;
            break;
        case "incorrecto":
            data.sort(function(a,b){return a["incorrecto"]-b["incorrecto"]});    
            porcentaje = false;
            break;    
        case "porcentajecorrecto":
            data.sort(function(a,b){return a["correcto"]  / (a["correcto"]+a["incorrecto"]) - b["correcto"] / (b["correcto"]+b["incorrecto"])});    
            break;    
        case "porcentajeincorrecto":
            data.sort(function(a,b){return a["incorrecto"]  / (a["correcto"]+a["incorrecto"]) - b["incorrecto"] / (b["correcto"]+b["incorrecto"])});    
            break;    
        default:
            break;
    }
    

    data.forEach(function(d) {
        nombres.push(d.name);
        valores_correctos.push(d.correcto);
        valores_incorrectos.push(d.incorrecto);
    }, this);



    Highcharts.chart('container', {
    chart: {
        zoomType: 'x',
        type: 'column'
    },
    title: {
        text: 'Rendimiento de los usuarios'
    },
    xAxis: {
        categories: nombres
    },
    yAxis: {
        min: 0,
        title: {
            text: porcentaje ? 'Porcentaje' : 'Cantidad' 
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        //pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true        
    },
    plotOptions: {
        column: {
            stacking: porcentaje ? 'percent' : 'normal',
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
    },
    series: [{
        name: 'Correctos',
        data: valores_correctos
    }, {
        name: 'Incorectos',
        data: valores_incorrectos
    }]    
})

})
};