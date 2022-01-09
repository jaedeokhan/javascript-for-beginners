// Code goes here

var ctx = $("#chart");

var months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
var orcDatas = [
    8500, 6367, 7000, 6900, 8000,
    6367, 11240, 7000, 5000, 6000,
    7000, 12000
];
var percentDatas = [
    80, 79, 78, 90, 100,
    83, 81, 80, 78, 83, 
    81, 100
];

var myChart = new Chart(ctx, {
  type : 'bar',
  data: {
    labels: months,
    datasets: [{
      type: 'bar',
      label: 'ORC', // sacles의 yAxes.id 와 연결
      yAxisID: 'ORC',
      borderColor: 'white',
      backgroundColor: 'rgba(137, 191, 255, 0.5)',
      data: orcDatas,
    },{
      type: 'line',
      label: 'OpRWA 증감률',
      yAxisID: 'OpRWA',
      borderColor: 'red',
      backgroundColor: 'white',
      data: percentDatas,
      fill: false
    }]
  },
  options: {
    legend : {
        position : "bottom"
    },
    tooltips: {
      mode: 'index'
    },
    scales: {
      xAxes : [{
        gridLines : {
            display : false // x축의 grid 라인 안 보이게
        }
      }],
      yAxes: [{
        scaleLabel: {
            display: true,
            labelString: '(억원)',
        },
        gridLines : { 
            display : false // y축 ORC의 grid 라인 안 보이게
        },
        id: 'ORC',
        position: 'left',
        ticks: {
          min: 0,
          //max: 100,
          stepSize: 5000,
          //fontColor: '#ffbaa2',
          callback: function(value, index, values) {
            return value + '억 원';
          }
        }
      }, {
        id: 'OpRWA',
        type: 'linear',
        position: 'right',
        ticks: {
          min: 0,
          max: 100,
          stepSize: 25,
          //fontColor: '#c881d2',
          callback: function(value, index, values) {
            return value + "%";
          }
        }
      }]
    },
    elements: {
      line: {
        tension: 0, // disables bezier curves
      },
      point: {
        radius: 1,
        borderWidth: 1,
        //pointStyle: 'circle'
      }, 
    }

  }
});
