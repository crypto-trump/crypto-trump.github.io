export async function fetchBinanceData() {
  const response = await fetch(
    'https://api.binance.com/api/v3/klines?symbol=TRUMPUSDT&interval=1m'
  )
  const data = await response.json()
  return data.map((candle) => ({
    time: new Date(candle[0]).toLocaleTimeString(),
    price: parseFloat(candle[4]),
  }))
}

export async function renderChart() {
  const data = await fetchBinanceData()
  const ctx = document.getElementById('btcChart').getContext('2d')

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array(data.length).fill(''),
      datasets: [
        {
          label: 'Price',
          data: data.map((d) => d.price),
          borderColor: 'rgb(255, 174, 0)',
          borderWidth: 2,
          fill: true,
          backgroundColor: 'rgb(255, 174, 0, 0.3)',
          pointRadius: 0,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
      },
      interaction: {
        mode: null,
        events: [],
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          title: { display: false },
        },
      },
      tooltip: { enabled: true },
    },
  })
}

renderChart()
