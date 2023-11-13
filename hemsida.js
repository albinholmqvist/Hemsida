window.onload = () => {
    const orderDisplay = document.getElementById('orderDisplay');
    const searchInput = document.getElementById('searchInput');
    const csvDataDiv = document.getElementById('csvData');

    let ordersData = [];
    let isSearchActive = false;

    function loadCSV() {
        fetch('ordrar.csv')
            .then(response => response.text())
            .then(data => {
                const rows = data.split('\n');
                const headers = rows[0].split(',').map(header => header.trim()); 
                
                for (let i = 1; i < rows.length; i++) {
                    const currentRow = rows[i].split(',');
                    if (currentRow.length === headers.length) {
                        const order = {};
                        for (let j = 0; j < headers.length; j++) {
                            order[headers[j]] = currentRow[j].trim();
                        }
                        ordersData.push(order);
                    }
                }
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

            button.addEventListener('click', () => {
                console.log(`Vald order: ${order.Ordernummer}`);
            });
        });
    }

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
        
        if (searchValue.length > 0) {
            isSearchActive = true;
            const filteredOrders = ordersData.filter(order =>
                order.Ordernummer.includes(searchValue) ||
                order.Adress.toLowerCase().includes(searchValue) ||
                order.Kund.toLowerCase().includes(searchValue)
            );
            createOrderButtons(filteredOrders);
        } else {
            isSearchActive = false;
            orderDisplay.innerHTML = '';
        }
    });

    loadCSV();
};
