// Code goes here

var ctx = $("#chart");

var bsym = "2021";
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

var bicList = [
  10.403, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
]

var lcList = [4.695, 11, 10, 9, 8 ,7, 6, 5, 4, 3, 2, 1];

var orcList = [1114.299, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];

//=====================================================================

Chart.defaults.global.pointHitDetectionRadius = 1;
var b_customTooltips = function(tooltip) {
    // Tooltip Element
    var tooltipEl = document.getElementById('chartjs-tooltip');
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = "<table></table>"
        document.body.appendChild(tooltipEl);
    }
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }
    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }
    function getBody(bodyItem) {
        return bodyItem.lines;
    }
    // Set Text
    if (tooltip.body) {
        var titleLines = tooltip.title || [];
        var bodyLines = tooltip.body.map(getBody);
        //PUT CUSTOM HTML TOOLTIP CONTENT HERE (innerHTML)
        var innerHtml = '<thead>';
        titleLines.forEach(function(title) {
            title = "2021년" + title;
            innerHtml += '<tr><th>' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';
        bodyLines.forEach(function(body, i) {
            var colors = tooltip.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px'; 
            var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
            innerHtml += '<tr><td>' + span + body + '</td></tr>';
        });
        innerHtml += '</tbody>';
        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
    }
    var position = this._chart.canvas.getBoundingClientRect();
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = position.left + tooltip.caretX + 'px';
    tooltipEl.style.top = position.top + tooltip.caretY + 'px';
    tooltipEl.style.fontFamily = tooltip._fontFamily;
    tooltipEl.style.fontSize = tooltip.fontSize;
    tooltipEl.style.fontStyle = tooltip._fontStyle;
    tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};

//=====================================================================

var customTooltips = function(tooltip){
  // Tooltip Element
  let tooltipEl = document.getElementById('chartjs-tooltip');

  // Create element on first render
  if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.innerHTML = '<table></table>';
      document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  const tooltipModel = tooltip;
  if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
  }

  // Set caret Position (above, below,no-transform ).As I need above I don't delete that class
  tooltipEl.classList.remove('below', 'no-transform');


  // Set HTML & Data
  if (tooltipModel.body) {
      var titleLines = tooltipModel.title || [];

      const dataFromCurrentElement = tooltipModel.dataPoints[0];
      const currentIndex = dataFromCurrentElement.index;

      //const formattedValue = dataFromCurrentElement.formattedValue.trim();
      //const currentDataToShow = formattedValue.substr(1, formattedValue.length - 2).split(' ');
      const innerHtml = `
      <div style="border-collapse: separate; overflow: hidden; border-radius: 10px; box-shadow: 0 6px 12px rgba(0,0,0,.175);">

          <div style="text-align: center; background-color: #ECEFF1; padding-top: 5px; padding-bottom: 6px; padding-left: 7px; color: #000; font-family: 'Poppins'; font-size: 14px; border-bottom: solid 1px #DDD">
              ${bsym}년${titleLines[0]}
          </div>
          <div style="display: flex; padding: 1.2rem; background-color: white">
              <div style="display: flex;  flex-direction: column;  font-family: 'Poppins'; font-size: 14px">
                  <div>BIC : <span style="font-weight: 600">${bicList[currentIndex]}</span></div>
                  <div>LC  : <span style="font-weight: 600">${lcList[currentIndex]}</span></div>
                  <div>ORC : <span style="font-weight: 600">${orcList[currentIndex]}</span></div>
              </div>
          </div>
        </div>
      `;

      tooltipEl.querySelector('table').innerHTML = innerHtml;
  }

  var position = this._chart.canvas.getBoundingClientRect();

  // Display, position, and set styles for font
  tooltipEl.style.opacity = '1';
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
  tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
  tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
  tooltipEl.style.pointerEvents = 'none';
}

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
      //enabled: true,
      //mode: 'index',
      //position: 'nearest',
      // Disable the on-canvas tooltip
      enabled: false,
      custom : customTooltips
  
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
