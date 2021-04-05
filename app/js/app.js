const date = new Date();
const renderCalendar = ()=>{
    date.setDate(1);
    const monthDays = document.querySelector('.days');
    const lastDay = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate();
    const prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(),date.getMonth() + 1,0).getDay();
    const nextDays = 7 - lastDayIndex -1;
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    document.querySelector('.date h6').innerHTML = months[date.getMonth()];
    document.querySelector('.current-date').innerHTML = new Date().toDateString();
    let days = "";
    for(let x = firstDayIndex;x > 0;x--){
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }
    for(let i = 1; i<=lastDay; i++){
        if(i === new Date().getDate()&&date.getMonth() === new Date().getMonth()){
            days += `<div class="today">${i}</div>`;
        }else {
            days += `<div>${i}</div>`;
        }
    }
    for(let j = 1; j<= nextDays;j++){
        days +=`<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
}
document.querySelector('.prev').addEventListener('click',()=>{
date.setMonth(date.getMonth() - 1);
renderCalendar();
})
document.querySelector('.next').addEventListener('click',()=>{
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
})

renderCalendar();

const ctx = document.getElementById('myChart').getContext('2d');
const Data2021 = [200,130,140,200,250,250,200,160,140,140,180,300];
const Data2020 = [100,130,190,120,100,120,90,100,110,190,150,200];
const Data2019 = [90,100,110,80,80,90,90,60,80,90,100,100];
const Data2018 = [70,70,80,90,90,100,60,50,80,70,80,90];
const labelsM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];
const labelsY =["2018","2019","2020","2021"];
const DataY = [930,1370,1600,2290]
const Max = 500;
const MaxY = 2500;
const Step =500;
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labelsM,
        datasets: [{
            borderColor: "rgb(255,90,40)",
            data: Data2021,
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
        tooltips:{
            backgroundColor: "rgb(255,255,255)",
            fontColor: "#b1b5b8",
            titleFontColor: "#b1b5b8",
            bodyFontColor: "#b1b5b8",
            bodyFontStyle: "bold",
            displayColors: false,
        }

    }
});

const renderChart = ( Data ,Labels, Step, Max)=>{
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Labels,
            datasets: [{
                borderColor: "rgb(255,90,40)",
                data: Data,
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
                        stepSize: Step,
                        min: 0,
                        max: Max,
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
            tooltips:{
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
function updateChart1(value){
    if(value === "2021"){
        renderChart(Data2021, labelsM, 100,500);
    }
    if(value === "2020"){
        renderChart(Data2020, labelsM, 100,500);
    }
    if(value === "2019"){
        renderChart(Data2019, labelsM, 100,500);
    }
    if(value === "2018"){
        renderChart(Data2018, labelsM, 100,500);
    }
}
function updateChart2(value){

    if(value === "month"){
        renderChart(Data2021, labelsM, 100,500);
    }
    if(value === "year"){
        renderChart(DataY, labelsY, 500,2500);
    }
}
