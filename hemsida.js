const contentDiv = document.getElementById('content');

// Funktion för att ladda sidinnehåll via AJAX
function loadPage(url) {
    fetch(url)
        .then(response => {
            return response.text();
        })
        .then(data => {
            contentDiv.innerHTML = data;
        });
}

// Hantera klick på länkar i menyn
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Förhindra standard länkbeteende
        let url = this.getAttribute('href');
        loadPage(url);
    });
});
// Kolla skärmens bredd och höjd
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// Exempel: Anpassa layouten om skärmen är mindre än en viss storlek
if (screenWidth < 768) {
    // Gör anpassningar för mindre skärmar
    // Exempel: Ändra layout, dölj eller visa vissa element
} else {
    // Återställ till standardlayout för större skärmar
}



const orderDisplay = document.getElementById('orderDisplay');
const searchInput = document.getElementById('searchInput');
const csvDataDiv = document.getElementById('csvData');

let ordersData = [];

function loadCSV() {
    fetch('ordrar.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const headers = rows[0].split(',').map(header => header.trim()); // Använd trim() för att ta bort onödiga mellanslag
            for (let i = 1; i < rows.length; i++) {
                const currentRow = rows[i].split(',');
                if (currentRow.length === headers.length) {
                    const order = {};
                    for (let j = 0; j < headers.length; j++) {
                        order[headers[j]] = currentRow[j].trim(); // Använd trim() för att ta bort onödiga mellanslag
                    }
                    ordersData.push(order);
                }
            }
            createOrderButtons(ordersData);
        })
        .catch(error => {
            console.error('Det gick inte att läsa in CSV-filen', error);
        });
}

function createOrderButtons(data) {
    orderDisplay.innerHTML = '';

    data.forEach(order => {
        const button = document.createElement('button');
        button.textContent = `Order: ${order.Ordernummer}, Kund: ${order.Kund}, Adress: ${order.Adress}`;
        orderDisplay.appendChild(button);
    });
}

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();

    const filteredOrders = ordersData.filter(order =>
        order.Ordernummer.includes(searchValue) ||
        order.Adress.toLowerCase().includes(searchValue) ||
        order.Kund.toLowerCase().includes(searchValue)
    );

    createOrderButtons(filteredOrders);
});

loadCSV();

