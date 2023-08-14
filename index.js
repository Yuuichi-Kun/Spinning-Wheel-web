/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");

// sudut dari html ?

/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 91, maxDegree: 120, value: "Masker" },
  { minDegree: 31, maxDegree: 60, value: "Sabun" },
  { minDegree: 0, maxDegree: 30, value: "T-Shirt" },
  { minDegree: 331, maxDegree: 360, value: "CCTV" },
  { minDegree: 301, maxDegree: 330, value: "Mug" },
  { minDegree: 271, maxDegree: 300, value: "Speaker" },
  { minDegree: 241, maxDegree: 270, value: "Voucher Foodcourt" },
  { minDegree: 211, maxDegree: 240, value: "Voucher Computer" },
  { minDegree: 181, maxDegree: 210, value: "Mouse" },
  { minDegree: 151, maxDegree: 180, value: "Pad Gel" },
  { minDegree: 121, maxDegree: 150, value: "Jam" },
  { minDegree: 61, maxDegree: 90, value: "Gelas" },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Congratulations, You Have Won ${i.value} ! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 91;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck!</p>`;

  // angle dapet dari sini
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    console.log(spinChart.options.rotation, randomDegree);
    // if (spinChart.options.rotation >= 360) {
    //     spinChart.options.rotation = 0;
    // } 
    // if (spinChart.options.rotation >= 359) {
    //     spinChart.options.rotation = 0;
    //     clearInterval(rotationInterval);
    // }
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 2 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 91;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */