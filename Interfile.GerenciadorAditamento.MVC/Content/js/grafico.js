var data = {
    labels: [
        "Aplicação",
        "Rendimento"
    ],
    datasets: [
        {
            data: [10000, 1200],
            backgroundColor: [
                "#6edfd1",
                "#e6842c"
            ],
            hoverBackgroundColor: [
                "#6edfd1",
                "#e6842c"
            ]
        }]
};

var options = {
  legend: {
    display: false
  },
  cutoutPercentage: 85
};

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});


var ctx2 = document.getElementById("myChart2");
var myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: data,
    options: options
});


var ctx3 = document.getElementById("myChart3");
var myChart3 = new Chart(ctx3, {
    type: 'doughnut',
    data: data,
    options: options
});


var ctx4 = document.getElementById("myChart4");
var myChart4 = new Chart(ctx4, {
    type: 'doughnut',
    data: data,
    options: options
});
