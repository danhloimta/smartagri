$(function() {
    var data, options;

    // visits trend charts
    data = {
        labels: [0, ,2 , ,4 , ,6 , ,8 , ,10 , ,12 , ,14 , ,16 , ,18 , ,20 , , ,23],
        series: [{
            name: 'series-real',
            data: [200, 380, 350, 320, 410, 450, 570, 400, 555, 620, 750, 900, 700, 400, 300, 500, 590, 790, 500, 600, 700, 800, 400, 500],
        }]
    };

    options = {
        fullWidth: true,
        lineSmooth: false,
        height: "270px",
        low: 0,
        high: 'auto',
        series: {
            'series-real': {
                showArea: true,
                showPoint: false,
                showLine: true
            },
        },
        axisX: {
            showGrid: true,

        },
        axisY: {
            showGrid: false,
            onlyInteger: true,
            offset: 0,
        },
        chartPadding: {
            left: 20,
            right: 20
        }
    };

    new Chartist.Line('#visits-trends-chart', data, options);
    new Chartist.Line('#visits-trends-chart2', data, options);
    new Chartist.Line('#visits-trends-chart3', data, options);
    new Chartist.Line('#visits-trends-chart4', data, options);

    // visits chart
    data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
            [6384, 6342, 5437, 2764, 3958, 5068, 7654]
        ]
    };

    options = {
        height: 300,
        axisX: {
            showGrid: false
        },
    };

    // new Chartist.Bar('#visits-chart', data, options);


    // real-time pie chart
    // var sysLoad = $('#system-load').easyPieChart({
    //  size: 130,
    //  barColor: function(percent) {
    //      return "rgb(" + Math.round(200 * percent / 100) + ", " + Math.round(200 * (1.1 - percent / 100)) + ", 0)";
    //  },
    //  trackColor: 'rgba(245, 245, 245, 0.8)',
    //  scaleColor: false,
    //  lineWidth: 5,
    //  lineCap: "square",
    //  animate: 800
    // });

    var updateInterval = 3000; // in milliseconds

    // setInterval(function() {
    //  var randomVal;
    //  randomVal = getRandomInt(0, 100);

    //  sysLoad.data('easyPieChart').update(randomVal);
    //  sysLoad.find('.percent').text(randomVal);
    // }, updateInterval);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var path = window.location.pathname;
    var active = path.substring(6);
    switch(active) {
      case 'kvA':
        // code block
        $('.kvA').addClass('active');
        break;
      case 'kvB':
        // code block
        $('.kvB').addClass('active');
        break;
      default:
        // code block
        $('.kvC').addClass('active');
    }
});