const slides = Array.from(document.querySelectorAll(".slide"));
const prevButton = document.querySelector("#prevSlide");
const nextButton = document.querySelector("#nextSlide");
const slideCounter = document.querySelector("#slideCounter");
const backgroundCycle = document.querySelector(".background-cycle");
const sidePanel = document.querySelector(".side-panel");
const topicButtons = Array.from(document.querySelectorAll("[data-topic]"));

let currentSlide = 0;

const cycleImages = [
  "https://parents-together.org/wp-content/uploads/2020/07/Artem-Peretiatko-Getty-Images-family-holding-hands-at-dinner-table.png",
  "https://cdn.prod.website-files.com/63bd6bc4ed669ff4741d53d1/6479d34e197ac1fc71f4a930_shutterstock_235077271-1022x1024.jpg",
  "https://aimymh.org/wp-content/uploads/2023/08/traumaChildLasts-1143896921-770x533-1-1.jpeg",
];

const backgroundLayers = [];
let cycleIndex = 0;
let activeLayer = 0;

if (backgroundCycle) {
  for (let i = 0; i < 2; i += 1) {
    const layer = document.createElement("div");
    layer.className = "background-cycle-layer";

    if (i === 0) {
      layer.classList.add("active");
      layer.style.backgroundImage = `url('${cycleImages[0]}')`;
    }

    backgroundCycle.appendChild(layer);
    backgroundLayers.push(layer);
  }
}

const topicText = {
  government: {
    title: "The Government",
    text: "From the Mayor's office to the City Council and the Department of Education. They hold the levers needed to transform mental health access for young people. Mayor's Office of Community Mental Health oversees NYC's ThriveNYC framework and can direct funding toward schools, community centers, and provider pipelines in underserved neighborhoods.",
    list: [
        "Mandate mental health counselors in every public school, K12",
        "Increase funding for community-based mental health clinics in the South Bronx and Central Brooklyn",
        "Remove insurance and administrative barriers for youth seeking care",
        "Invest in culturally competent providers who reflect the communities they serve",
    ]
  },
  warning: {
    title: "Warning Signs",
    text: "Recognizing when someone may be struggling is the first step to getting them connected with help. Look for changes from their baseline, not just single behaviors.",
    list: [
      "Withdrawl",
        "Mood Shifts",
        "Changes in sleep / appetite",
        "Declining Performance",
        "Hopeless Talk",
        "Self Harm",
        "Risk-taking",
        "Giving things away"
    ]
  },
  resources: {
    title: "Available Resources",
    text: "Resources for mental health, services, hotlines and more.",
    list: [
        "988 Suicide & Crisis LifeLine: Call or text 988 (free 24/7, confidential",
        "Crisis Text Line: Text HOME to 741741 (free, 24/7)",
        "NYC Well: nyc.gov.nycwell or call 1-888-NYCWELL. Free mental health support in 200+ languages",
        "ThriveNYC: Mental health resources and provider navigator for NYC residents",
        "The Door (NYC): Comprehensive youth development and mental health services for ages 12-24",
        "Safe Horizon: Support for youth experiencing trauma or violence",
        "Born This Way Foundation: Crisis support and mental wellness resources for young people"
    ]
  }
};

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  if (backgroundCycle) {
    backgroundCycle.classList.toggle("active", currentSlide === 2);
  }

  slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
}

function moveSlide(direction) {
  showSlide(currentSlide + direction);
}

function flipCurrentSlide(button) {
  const slide = button.closest(".flip-slide");
  if (slide) {
    slide.classList.toggle("flipped");
  }
}

function openTopic(topic) {
  const content = topicText[topic];

  topicButtons.forEach((button) => {
    button.classList.toggle("active-topic", button.dataset.topic === topic);
  });

  sidePanel.innerHTML = `
    <button class="close-panel" type="button" data-close-panel aria-label="Close panel">&times;</button>
    <p class="eyebrow">Moving Forward</p>
    <h2>${content.title}</h2>
    <p>${content.text}</p>
    <ul>
      ${content.list.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function resetTopicPanel() {
  topicButtons.forEach((button) => button.classList.remove("active-topic"));
  sidePanel.innerHTML = `
    <button class="close-panel" type="button" data-close-panel aria-label="Close panel">&times;</button>
    <h2>Moving Forward</h2>
      <p>Mental Health issues start at a very young age. We believe mental health awareness should be integrated within the education system.</p>
      <p>As a community we should push towards 24/7 crisis response for students in danger (which would be in the authority of the Department of Education Chancellor)As well as increase the number of psychologists and school worker which would need to be funded by city councils.</p>
      <p>Student led mental health club and after school therapy programs (which would be in the authority of the NYC Department of Youth and Community Development)</p>
  `;
}

prevButton.addEventListener("click", () => moveSlide(-1));
nextButton.addEventListener("click", () => moveSlide(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    moveSlide(1);
  }

  if (event.key === "ArrowLeft") {
    moveSlide(-1);
  }
});

document.addEventListener("click", (event) => {
  const flipButton = event.target.closest("[data-flip]");
  const topicButton = event.target.closest("[data-topic]");
  const closeButton = event.target.closest("[data-close-panel]");

  if (flipButton) {
    flipCurrentSlide(flipButton);
  }

  if (topicButton) {
    openTopic(topicButton.dataset.topic);
  }

  if (closeButton) {
    resetTopicPanel();
  }
});

const advanceBackground = () => {
  if (!backgroundCycle || backgroundLayers.length < 2) {
    return;
  }

  const nextIndex = (cycleIndex + 1) % cycleImages.length;
  const nextLayer = backgroundLayers[1 - activeLayer];
  const currentLayer = backgroundLayers[activeLayer];

  nextLayer.style.backgroundImage = `url('${cycleImages[nextIndex]}')`;
  nextLayer.classList.add("active");
  currentLayer.classList.remove("active");

  activeLayer = 1 - activeLayer;
  cycleIndex = nextIndex;
};

setInterval(advanceBackground, 3800);

showSlide(0);

// Chart.js data initialization for Slide 4
const raceEthnicityData = {
  labels: ["2015", "2017", "2019", "2021", "2023"],
  datasets: [
    {
      label: "Hispanic/Latino",
      data: [31.21, 34.6, 39.2, 41.9, 41.2],
      borderColor: "#d96a5b",
      backgroundColor: "rgba(217, 106, 91, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Black/African American",
      data: [27.8, 30.1, 33.6, 41.2, 30.7],
      borderColor: "#1b263b",
      backgroundColor: "rgba(27, 38, 59, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "White (non-Hispanic)",
      data: [29.7, 29.4, 30.6, 29.9, 33],
      borderColor: "#f6b93b",
      backgroundColor: "rgba(246, 185, 59, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Asian (non-Hispanic)",
      data: [26.6, 28.2, 33.5, 33.4, 31.4],
      borderColor: "#3d8b6f",
      backgroundColor: "rgba(61, 139, 111, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
  ],
};

const genderData = {
  labels: ["2015", "2017", "2019", "2021", "2023"],
  datasets: [
    {
      label: "Female/Woman (Cisgender)",
      data: [37.7, 38.6, 43.7, 48.4, 44.5],
      borderColor: "#d96a5b",
      backgroundColor: "rgba(217, 106, 91, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Male/Man (Cisgender)",
      data: [21.2, 24.4, 28.2, 28.2, 23.9],
      borderColor: "#1b263b",
      backgroundColor: "rgba(27, 38, 59, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Transgender",
      data: [50.1, 45.3, 54.3, 71.1, null],
      borderColor: "#1f8ea3",
      backgroundColor: "rgba(31, 142, 163, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Non-binary",
      data: [null, null, null, null, 53.6],
      borderColor: "#d8a63f",
      backgroundColor: "rgba(216, 166, 63, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
  ],
};

const boroughData = {
  labels: ["2015", "2017", "2019", "2021", "2023"],
  datasets: [
    {
      label: "Bronx",
      data: [29.5, 34.8, 36.4, 40, 36.1],
      borderColor: "#d96a5b",
      backgroundColor: "rgba(217, 106, 91, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Brooklyn",
      data: [29.1, 32.3, 37.2, 37.7, 35.1],
      borderColor: "#1b263b",
      backgroundColor: "rgba(27, 38, 59, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Manhattan",
      data: [30.9, 29.6, 33.5, 42, 37.4],
      borderColor: "#f6b93b",
      backgroundColor: "rgba(246, 185, 59, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Queens",
      data: [29.4, 29.7, 34.4, 36.8, 34.8],
      borderColor: "#3d8b6f",
      backgroundColor: "rgba(61, 139, 111, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Staten Island",
      data: [25.9, 29.4, 37.1, 29.8, 32.5],
      borderColor: "#1f8ea3",
      backgroundColor: "rgba(31, 142, 163, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
  ],
};

const orientationData = {
  labels: ["2015", "2017", "2019", "2021", "2023"],
  datasets: [
    {
      label: "Bisexual",
      data: [54.7, 56.8, 64, 62.5, 52.9],
      borderColor: "#d96a5b",
      backgroundColor: "rgba(217, 106, 91, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Gay or Lesbian",
      data: [47.3, 44.8, 55.2, 58.9, 52.2],
      borderColor: "#1b263b",
      backgroundColor: "rgba(27, 38, 59, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Not Sure",
      data: [48.22, 35.8, 44.8, 48.4, 46.8],
      borderColor: "#3d8b6f",
      backgroundColor: "rgba(61, 139, 111, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Straight or heterosexual",
      data: [25.6, 27.9, 31.2, 32, 31.1],
      borderColor: "#f6b93b",
      backgroundColor: "rgba(246, 185, 59, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        font: { size: 12, weight: "500" },
        color: "#132027",
        padding: 12,
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    tooltip: {
      backgroundColor: "rgba(19, 32, 39, 0.9)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 1,
      titleFont: { size: 12, weight: "600" },
      bodyFont: { size: 11 },
      padding: 8,
      displayColors: true,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#5d6a71", font: { size: 11 } },
    },
    y: {
      min: 0,
      max: 80,
      grid: { color: "rgba(19, 32, 39, 0.08)" },
      ticks: { color: "#5d6a71", font: { size: 11 }, stepSize: 20 },
    },
  },
};

// Initialize charts when slide 4 becomes active
const initializeCharts = () => {
  if (currentSlide === 3) {
    const raceEthnicityCtx = document.getElementById("raceEthnicityChart");
    const genderCtx = document.getElementById("genderChart");
    const boroughCtx = document.getElementById("boroughChart");

    if (raceEthnicityCtx && !raceEthnicityCtx.chartInstance) {
      raceEthnicityCtx.chartInstance = new Chart(raceEthnicityCtx, {
        type: "line",
        data: raceEthnicityData,
        options: chartOptions,
      });
    }

    if (genderCtx && !genderCtx.chartInstance) {
      genderCtx.chartInstance = new Chart(genderCtx, {
        type: "line",
        data: genderData,
        options: chartOptions,
      });
    }

    if (boroughCtx && !boroughCtx.chartInstance) {
      boroughCtx.chartInstance = new Chart(boroughCtx, {
        type: "line",
        data: boroughData,
        options: chartOptions,
      });
    }

    const orientationCtx = document.getElementById("orientationChart");
    if (orientationCtx && !orientationCtx.chartInstance) {
      orientationCtx.chartInstance = new Chart(orientationCtx, {
        type: "line",
        data: orientationData,
        options: chartOptions,
      });
    }
  }
};

// Call initializeCharts after showing slide 4
const originalShowSlide = showSlide;
showSlide = function (index) {
  originalShowSlide(index);
  setTimeout(initializeCharts, 50);
};