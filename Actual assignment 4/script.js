/* ── DATA ── */
const CITIES = {
  Delhi: { country:'India', color:'#e24b4a', aqi:198, pm25:142, pm10:218, no2:64, cat:'Unhealthy', catColor:'#e24b4a', catBg:'rgba(226,75,74,0.15)', pct:1.00, trend:'▲' },
  Beijing: { country:'China', color:'#d85a30', aqi:156, pm25:102, pm10:165, no2:48, cat:'Unhealthy', catColor:'#e24b4a', catBg:'rgba(226,75,74,0.15)', pct:0.79, trend:'▲' },
  Mumbai: { country:'India', color:'#3266ad', aqi:102, pm25:58, pm10:96, no2:27, cat:'Sensitive', catColor:'#d85a30', catBg:'rgba(216,90,48,0.15)', pct:0.52, trend:'▼' },
  London: { country:'UK', color:'#1d9e75', aqi:51, pm25:18, pm10:34, no2:12, cat:'Moderate', catColor:'#ba7517', catBg:'rgba(186,117,23,0.15)', pct:0.26, trend:'▲' },
  Tokyo: { country:'Japan', color:'#185fa5', aqi:38, pm25:11, pm10:22, no2:8, cat:'Good', catColor:'#639922', catBg:'rgba(99,153,34,0.15)', pct:0.19, trend:'▼' }
};

const HOURS = Array.from({length:24}, (_,i)=>`${String(i).padStart(2,'0')}:00`);

/* ── CHART.JS DEFAULTS ── */
Chart.defaults.font.family = "'DM Mono', monospace";
Chart.defaults.color = "#64748b";
Chart.defaults.scale.grid.color = "rgba(0, 0, 0, 0.05)";
Chart.defaults.plugins.tooltip.backgroundColor = "rgba(255, 255, 255, 0.95)";
Chart.defaults.plugins.tooltip.titleColor = "#0f172a";
Chart.defaults.plugins.tooltip.bodyColor = "#334155";
Chart.defaults.plugins.tooltip.borderColor = "rgba(0, 0, 0, 0.1)";
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.elements.bar.borderRadius = 6;
Chart.defaults.elements.line.borderWidth = 2;
Chart.defaults.elements.point.radius = 0;
Chart.defaults.elements.point.hoverRadius = 6;

/* ── TREND DATA ── */
function genTrend(base) {
  let v = base;
  return HOURS.map(() => {
    v = Math.max(10, v + (Math.random() - 0.5) * 10);
    return Math.round(v);
  });
}

const trendData = {};
Object.keys(CITIES).forEach(c => {
  trendData[c] = genTrend(CITIES[c].aqi);
});

/* ── TREND CHART ── */
let trendChart;

function buildTrendChart() {
  const datasets = Object.keys(CITIES).map(c => ({
    label: c,
    data: trendData[c],
    borderColor: CITIES[c].color,
    backgroundColor: CITIES[c].color + '20',
    tension: 0.4,
    fill: true
  }));

  trendChart = new Chart(document.getElementById('trendChart'), {
    type: 'line',
    data: {
      labels: HOURS,
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });
}

/* ── POLLUTANT CHART ── */
function buildPollutantChart() {
  new Chart(document.getElementById('pollutantChart'), {
    type: 'doughnut',
    data: {
      labels: ['PM2.5','PM10','NO2','O3'],
      datasets: [{
        data: [40,25,20,15],
        backgroundColor: ['#e24b4a','#d85a30','#ba7517','#3266ad']
      }]
    }
  });
}

/* ── MONTHLY CHART ── */
function buildMonthlyChart() {
  new Chart(document.getElementById('monthlyChart'), {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May'],
      datasets: [{
        data: [200,180,160,140,120],
        backgroundColor: '#e24b4a'
      }]
    }
  });
}

/* ── CATEGORY CHART ── */
function buildCategoryChart() {
  new Chart(document.getElementById('categoryChart'), {
    type: 'bar',
    data: {
      labels: ['Good','Moderate','Unhealthy'],
      datasets: [{
        data: [2,2,1],
        backgroundColor: ['#3b6d11','#ba7517','#e24b4a']
      }]
    },
    options: {
      indexAxis: 'y'
    }
  });
}

/* ── TABLE ── */
function buildTable() {
  const table = document.getElementById('city-table');
  table.innerHTML = Object.entries(CITIES).map(([name, d]) => `
    <tr>
      <td>${name}</td>
      <td>${d.country}</td>
      <td>${d.aqi}</td>
      <td>${d.pm25}</td>
      <td>${d.pm10}</td>
      <td>${d.no2}</td>
      <td><span style="background:${d.catBg}; color:${d.catColor}; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: bold;">${d.cat}</span></td>
      <td style="color:${d.trend === '▲' ? '#e24b4a' : '#639922'}; font-weight: bold;">${d.trend}</td>
    </tr>
  `).join('');
}

/* ── HIGHLIGHTS & RANKS ── */
function buildHighlights() {
  const sorted = Object.entries(CITIES).sort((a, b) => a[1].aqi - b[1].aqi);
  const cleanest = sorted[0];
  const mostPolluted = sorted[sorted.length - 1];

  if (cleanest) {
    const valEl = document.getElementById('cleanest-val');
    valEl.innerText = cleanest[0];
    valEl.style.color = cleanest[1].catColor;
    document.getElementById('cleanest-sub').innerText = `AQI ${cleanest[1].aqi} · ${cleanest[1].cat}`;
  }

  if (mostPolluted) {
    const valEl = document.getElementById('polluted-val');
    valEl.innerText = mostPolluted[0];
    valEl.style.color = mostPolluted[1].catColor;
    document.getElementById('polluted-sub').innerText = `AQI ${mostPolluted[1].aqi} · ${mostPolluted[1].cat}`;
  }
}

function buildCityRanks() {
  const container = document.getElementById('city-ranks');
  const sorted = Object.entries(CITIES).sort((a, b) => b[1].aqi - a[1].aqi);
  
  container.innerHTML = sorted.map(([name, data], idx) => `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 12px; border-bottom: 1px solid var(--border-dark);">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-weight: bold; color: var(--muted); width: 25px; font-size: 0.9rem;">#${idx + 1}</span>
        <span style="font-weight: 600; color: var(--text);">${name}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 15px;">
        <span style="font-size: 0.95rem; font-weight: bold; color: ${data.catColor}; width: 30px; text-align: right;">${data.aqi}</span>
        <div style="width: 80px; height: 6px; background: rgba(0,0,0,0.05); border-radius: 3px; overflow: hidden;">
          <div style="width: ${Math.min(100, (data.aqi / 300) * 100)}%; height: 100%; background: ${data.catColor}; border-radius: 3px;"></div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── INIT ── */
buildTrendChart();
buildPollutantChart();
buildMonthlyChart();
buildCategoryChart();
buildTable();
buildHighlights();
buildCityRanks();