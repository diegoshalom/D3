function updateGraph(GraficoSeleccionado,container){


$.getJSON(GraficoSeleccionado, function (data) {

    var titulo = [];    
    var ylabel = [];

    switch (GraficoSeleccionado) {
        case "CuentasAcumuladasPorDia.json":
            titulo = "Number of operations uploaded to our servers"
            ylabel = "# operations"
            break;
        case "CuentasPorDia.json":
            titulo = "Number of operations per day"
            ylabel = "# operations / day"
            break;    
        case "UsuariosActivosPorDia.json":
            titulo = "Active users per day"
            ylabel = "# Userrs"    
            break;    
        default:
            break;
    }


    Highcharts.chart(container, {
        chart: {
            zoomType: 'x',
            //borderWidth: 1,
            resetZoomButton: {
                position: {
                    align: 'left', // by default
                    // verticalAlign: 'top', // by default
                    //x: -10,
                    //y: 10
                },
                //relativeTo: 'chart'
            }            
        },
        title: {
            text: titulo
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: ylabel
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            //type: 'area',
            type: 'areaspline',
            fillOpacity: 0.5, 
            //name: 'USD to EUR',
            data: data
        }]
    });
});
}