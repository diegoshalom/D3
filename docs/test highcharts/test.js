function updateGraph(){

        
    
        Highcharts.chart('container', {
            chart: {
                zoomType: 'x',
                //borderWidth: 1,
                resetZoomButton: {
                    position: {
                        align: 'left',
                    },
                    //relativeTo: 'chart'
                },
              type: 'line'
            },
            title: {
              text: 'Live Data (CSV)'
            },
            xAxis: {
                type: 'datetime',
            },
            subtitle: {
              text: 'Data input from a remote CSV file'
            },
          
            data: {
              csvURL: 'https://dl.dropbox.com/s/x1s4i8gtznll2dj/tempe_mientras.csv?dl=0', 
              //csvURL: 'https://dl.dropbox.com/s/844z5wp7nx2dkie/tempe_mientras.csv?dl=0',
              //csvURL: 'https://dl.dropbox.com/s/tvuk81w7z773ax1/test.csv?dl=0',
              enablePolling: true,
              dateFormat: "dd-mmm-yyyy-hh:mm",
              //parseDate: function(date, d) {
              //  return Date.parse(date);
              //},              
              complete: function(o) {
                o.series = [
                  o.series[6],
                  o.series[7],
                  o.series[8],
                ]
              }
            }

          });
          

        
    

    };