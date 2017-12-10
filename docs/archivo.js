function updateGraph(GraficoSeleccionado,container){


$.getJSON(GraficoSeleccionado, function (data) {

    var titulo = [];    
    var ylabel = [];
    var xlabel = [];
    var xaxistype = [];

    switch (GraficoSeleccionado) {
        case "CuentasAcumuladasPorDia.json":
            titulo = "Number of operations uploaded to our servers"
            ylabel = "# operations"
            xlabel = 'Date'
            xaxistype = 'datetime'
            break;
        case "CuentasPorDia.json":
            titulo = "Number of operations per day"
            ylabel = "# operations / day"
            xlabel = 'Date'
            xaxistype = 'datetime'
            break;    
        case "UsuariosActivosPorDia.json":
            titulo = "Active users per day"
            ylabel = "# Users"    
            xlabel = 'Date'
            xaxistype = 'datetime'
            break;    
        case "UsuariosActivosPorSemana.json":
            titulo = "Active users per Week"
            ylabel = "# Users"    
            xlabel = 'Date'
            xaxistype = 'datetime'
            break;    
        case "UsuariosActivosPorMes.json":
            titulo = "Active users per Month"
            ylabel = "# Users"    
            xlabel = 'Date'
            xaxistype = 'datetime'
            break;    
        case "TiempoActivoPorUsuario.json":
            titulo = "Active time in days"
            ylabel = "# Users"    
            xlabel = 'Time [days]'
            xaxistype = ''
            break;    
        case "UsuriosPorNivel.json":
            titulo = "Users per level"
            ylabel = "# Users"    
            xlabel = 'Level'
            xaxistype = ''
            break;    
        case "UsuriosAcumuladosPorNivel.json":
            titulo = "Cumulative Users per level"
            ylabel = "# Users"    
            xlabel = 'Level'
            xaxistype = ''
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
            type: xaxistype,
            title: {
                text: xlabel
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