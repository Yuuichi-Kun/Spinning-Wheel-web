/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");

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
    rotation: 0, // Initialize rotation
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
/* --------------- Spinning Code --------------------- */
let isSpinning = false;
spinBtn.addEventListener("click", () => {
  if (isSpinning) return;
  
  spinBtn.disabled = true;
  isSpinning = true;

  // Select a random prize index
  const prizeIndex = Math.floor(Math.random() * spinValues.length);
  const selectedPrize = spinValues[prizeIndex];
  
  // Calculate the target degree (middle of the prize range)
  let prizeCenter = (selectedPrize.minDegree + selectedPrize.maxDegree) / 2;
  
  // The pointer is at visual top, which corresponds to chart position 270deg (due to CSS 270deg rotation)
  // Chart.js rotation R moves segments clockwise: segment at position P moves to (P + R) mod 360
  // To align prize center with pointer: (prizeCenter + targetRotation) mod 360 = 270
  // Therefore: targetRotation = (270 - prizeCenter + 360) % 360
  let targetRotation = (270 - prizeCenter + 360) % 360;
  
  // Add multiple full rotations (5-8 full spins) for dramatic effect
  const minSpins = 5;
  const maxSpins = 8;
  const fullSpins = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;
  const totalRotation = (fullSpins * 360) + targetRotation;
  
  // Current rotation state
  let currentRotation = spinChart.options.rotation || 0;
  const startRotation = currentRotation;
  const endRotation = startRotation + totalRotation;
  
  // Animation parameters
  let progress = 0;
  const duration = 3000; // 3 seconds
  const startTime = Date.now();
  
  // Easing function for smooth deceleration
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    progress = Math.min(elapsed / duration, 1);
    
    // Apply easing
    const easedProgress = easeOutCubic(progress);
    
    // Calculate current rotation
    currentRotation = startRotation + (endRotation - startRotation) * easedProgress;
    
    // Normalize rotation to 0-360 range
    spinChart.options.rotation = currentRotation % 360;
    spinChart.update();
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Animation complete
      spinBtn.disabled = false;
      isSpinning = false;
    }
  };
  
  animate();
});
/* --------------- End Spin Wheel  --------------------- */