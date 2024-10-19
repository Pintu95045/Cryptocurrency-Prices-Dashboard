let cryptoData = [];

// Fetch data using async/await
async function fetchData() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        cryptoData = data;
        renderTable(cryptoData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Render data in the table
function renderTable(data) {
    const tbody = document.querySelector("#crypto-table tbody");
    tbody.innerHTML = "";
    data.forEach((item) => {
        // Set color for percentage change
        const percentageChangeColor = item.price_change_percentage_24h >= 0 ? 'green' : 'red';
        
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.symbol.toUpperCase()}</td>
                <td>$${item.current_price.toLocaleString()}</td>
                <td>$${item.market_cap.toLocaleString()}</td>
                <td style="color: ${percentageChangeColor}">${item.price_change_percentage_24h.toFixed(2)}%</td>
                <td>${item.total_volume.toLocaleString()}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Search functionality
document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filteredData = cryptoData.filter(
        (item) =>
            item.name.toLowerCase().includes(query) ||
            item.symbol.toLowerCase().includes(query)
    );
    renderTable(filteredData);
});

// Sort by Market Cap
document.getElementById("sort-market-cap").addEventListener("click", function () {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
});

// Sort by Percentage Change
document.getElementById("sort-percentage-change").addEventListener("click", function () {
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
});

// Initial fetch
fetchData();
