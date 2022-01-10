// Code goes here

var ctx = $("#chart");

var months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
var orcDatas = [
    8500, 6367, 7000, 6900, 8000,
    6367, 11240, 7000, 5000, 6000,
    7000, 0
];
var percentDatas = [
    80, 79, 78, 90, 120,
    83, 81, 80, 78, 83, 
    81, 0
];

var myChart = new Chart(ctx, {
  type : 'bar',
  data: {
    labels: months,
    datasets: [{
      type: 'bar',
      label: 'ORC',  
      yAxisID: 'ORC',  // sacles의 yAxes.id 와 연결
      borderColor: 'white',
      backgroundColor: 'rgba(137, 191, 255, 0.5)',
      data: orcDatas, 
    },{
      type: 'line',
      label: 'OpRWA 증감률',
      yAxisID: 'OpRWA', // sacles의 yAxes.id 와 연결
      borderColor: 'red',
      backgroundColor: 'white',
      data: percentDatas,
      fill: false 
    }]
  }, // End of data tag
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
      }], // End of xAxes 
      yAxes: [{ 
        id: 'ORC',
        position: 'left',
        scaleLabel: { // 좌측 y 축 라벨 이름
            display: true,
            labelString: '(억원)',
        },
        gridLines : { 
            display : false // y축 ORC의 grid 라인 안 보이게
        },
        ticks: {
          min: 0,
          max: 20000,
          stepSize: 5000,
          //fontColor: '#ffbaa2',
          callback: function(value, index, values) {
            return value + '억 원';
          }
        }
      }, // End Of yAxes ID ORC
      {
        id: 'OpRWA',
        type: 'linear',
        position: 'right',
        scaleLabel: { // 좌측 y 축 라벨 이름
          display: true,
          labelString: '(%)',
        },
        ticks: {
          min: 0,
          //max: 100,
          stepSize: 25,
          //fontColor: '#c881d2',
          callback: function(value, index, values) {
            return value + "%";
          }
        }
      }] // End Of yAxes ID OpRWA
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
    }, // End of elements 
    hover : {
      animationDuration : 0 // 0으로 하면 hover 하지 않아도 계속 보이게
    },
    animation : {
      duration : 1,
      onComplete : function(){
            var chartInstance = this.chart;
            ctx = chartInstance.ctx;

            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillStyle = "black";

            this.data.datasets.forEach(function(dataset, i){
            var meta = chartInstance.controller.getDatasetMeta(i);

            console.log(dataset);

            meta.data.forEach(function(bar, index){
            var data = dataset.data[index];
                      
            // line bar이면
            if (dataset.type == "line"){ 
              data = data + "%"; // 뒤에 % 표시
            }
            
            // data가 0이거나 0%이면 data를 공백으로
            if (data == 0 || data == "0%"){
              data = "";
            }

            ctx.fillText(data, bar._model.x, bar._model.y -5); // bar에 값 표시
          }); // End of this.data.datasets for loop
        });
      } // End of onComplete function
    } // End of animation
  } // End of options 
});
