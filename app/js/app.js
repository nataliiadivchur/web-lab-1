let Data;
let CardNumber;
let AccountName;
let CardStatus;
let Deposit;
let Expense;
let Payable;
let Msale;
let Ysale;
let DateAccount;
let Percent;

async function GetChartData() {
    const response = await fetch('/getChartData');
    if (response.ok) {
        Data = await response.json();
        //Card&Cash info
        CardNumber = Data['CardInfo'][0]['cardNumber'];
        AccountName = Data['CardInfo'][0]['accountName'];
        CardStatus = Data['CardInfo'][0]['cardStatus'];
        DateAccount = Data['CardInfo'][0]['date-account'];
        Deposit = Data['CashInfo'][0]['deposit'];
        Expense = Data['CashInfo'][0]['expense'];
        Payable = Data['CashInfo'][0]['payable'];
        Msale = Data['Sales'][0]['monthly'];
        Ysale = Data['Sales'][0]['yearly'];
        Percent = (parseInt(Deposit.replace(/\s+/g, ''), 10) * 100) / (100000000) + "%";
        Deposit = "$" + Deposit;
        document.querySelector('.cardNumber').innerHTML = CardNumber;
        document.querySelector('.accountName').innerHTML = AccountName;
        document.querySelector('.cardStatus').innerHTML = CardStatus;
        document.querySelector('.deposit').innerHTML = Deposit;
        document.querySelector('.expense').innerHTML = Expense;
        document.querySelector('.payable').innerHTML = Payable;
        document.querySelector('.Msale').innerHTML = Msale;
        document.querySelector('.Ysale').innerHTML = Ysale;
        document.querySelector('.card-subtitle').innerHTML = CardNumber;
        document.querySelector('.date-account').innerHTML = DateAccount;
        document.querySelector('.percent-num').innerHTML = Percent;
        document.getElementById("per-circle").style.strokeDashoffset = (450 - (400 * parseInt(Percent)) / 100);
    }
}
/*
//Calendar
const date = new Date();
const renderCalendar = () => {
    date.setDate(1);
    const monthDays = document.querySelector('.days');
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.querySelector('.date h6').innerHTML = months[date.getMonth()];
    document.querySelector('.current-date').innerHTML = new Date().toDateString();
    let days = "";
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }
    for (let i = 1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
}

//Chart
const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            borderColor: "rgb(255,90,40)",
            data: [200, 130, 140, 200, 250, 250, 200, 160, 140, 140, 180, 300],
            backgroundColor: "rgba(255,130,40,0.05)",
            hoverBackgroundColor: "rgb(255,255,255)",
            pointBackgroundColor: "rgb(255,90,40)",
            pointHoverBorderWidth: 2,
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 100,
                    min: 0,
                    max: 500,
                    fontColor: "#1a1e21"
                }
            }],
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                },
            }]
        },
        legend: {
            display: false
        },
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            fontColor: "#b1b5b8",
            titleFontColor: "#b1b5b8",
            bodyFontColor: "#b1b5b8",
            bodyFontStyle: "bold",
            displayColors: false,
        }

    }
});
function renderChart(ChartData) {
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ChartData.labels,
            datasets: [{
                borderColor: "rgb(255,90,40)",
                data: ChartData.data,
                backgroundColor: "rgba(255,130,40,0.05)",
                hoverBackgroundColor: "rgb(255,255,255)",
                pointBackgroundColor: "rgb(255,90,40)",
                pointHoverBorderWidth: 2,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: ChartData.step,
                        min: 0,
                        max: ChartData.max,
                        fontColor: "#1a1e21"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                fontColor: "#b1b5b8",
                titleFontColor: "#b1b5b8",
                bodyFontColor: "#b1b5b8",
                bodyFontStyle: "bold",
                displayColors: false,
            }

        }
    });
}
function updateChart(value) {
    if (value === "2021") {
        renderChart(Data['ChartData'][3]);
        document.getElementById("years").selectedIndex = 0;
    }
    if (value === "2020") {
        renderChart(Data['ChartData'][2]);
        document.getElementById("YearOrMonth").selectedIndex = 0;
    }
    if (value === "2019") {
        renderChart(Data['ChartData'][1]);
        document.getElementById("YearOrMonth").selectedIndex = 0;
    }
    if (value === "2018") {
        renderChart(Data['ChartData'][0]);
        document.getElementById("YearOrMonth").selectedIndex = 0;
    }
    if (value === "month") {
        document.getElementById("years").selectedIndex = 0;
        renderChart(Data['ChartData'][3]);
    }
    if (value === "year") {
        renderChart(Data['ChartData'][4]);
    }
}
//on load
window.onload = function () {
    GetChartData();
    document.querySelector('.prev').addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    })
    document.querySelector('.next').addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    })
    renderCalendar();
}
*/

//Calendar
const date = new Date();
const renderCalendar = () => { //jquery
    date.setDate(1);
    const monthDays = $('.days');
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $('.date h6').html( months[date.getMonth()]);
    $('.current-date').html(new Date().toDateString());
    let days = "";
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }
    for (let i = 1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.html(days);
    }
}
//Chart
const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            borderColor: "rgb(255,90,40)",
            data: [200, 130, 140, 200, 250, 250, 200, 160, 140, 140, 180, 300],
            backgroundColor: "rgba(255,130,40,0.05)",
            hoverBackgroundColor: "rgb(255,255,255)",
            pointBackgroundColor: "rgb(255,90,40)",
            pointHoverBorderWidth: 2,
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 100,
                    min: 0,
                    max: 500,
                    fontColor: "#1a1e21"
                }
            }],
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                },
            }]
        },
        legend: {
            display: false
        },
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            fontColor: "#b1b5b8",
            titleFontColor: "#b1b5b8",
            bodyFontColor: "#b1b5b8",
            bodyFontStyle: "bold",
            displayColors: false,
        }

    }
});
function renderChart(ChartData) {
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ChartData.labels,
            datasets: [{
                borderColor: "rgb(255,90,40)",
                data: ChartData.data,
                backgroundColor: "rgba(255,130,40,0.05)",
                hoverBackgroundColor: "rgb(255,255,255)",
                pointBackgroundColor: "rgb(255,90,40)",
                pointHoverBorderWidth: 2,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: ChartData.step,
                        min: 0,
                        max: ChartData.max,
                        fontColor: "#1a1e21"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    },
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                fontColor: "#b1b5b8",
                titleFontColor: "#b1b5b8",
                bodyFontColor: "#b1b5b8",
                bodyFontStyle: "bold",
                displayColors: false,
            }

        }
    });
}
function updateChart(value) {
    if (value === "2021") {
        renderChart(Data['ChartData'][3]);
        $("#years").selectedIndex = 0;
    }
    if (value === "2020") {
        renderChart(Data['ChartData'][2]);
        $("#YearOrMonth").selectedIndex = 0;
    }
    if (value === "2019") {
        renderChart(Data['ChartData'][1]);
        $("#YearOrMonth").selectedIndex = 0;
    }
    if (value === "2018") {
        renderChart(Data['ChartData'][0]);
        $("#YearOrMonth").selectedIndex = 0;
    }
    if (value === "month") {
        $("#years").selectedIndex = 0;
        renderChart(Data['ChartData'][3]);
    }
    if (value === "year") {
        renderChart(Data['ChartData'][4]);
    }
} //jquery

$( document ).ready(function() {
    console.log( "ready!" );
    GetChartData();
    $('.prev').click(() => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    })
    $('.next').click(() => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    })
    renderCalendar();
});
