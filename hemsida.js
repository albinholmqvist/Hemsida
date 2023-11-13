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

// Läser in datan
const ordersData = [
        { ordernummer: "A123", adress: "123 Apple Street, Orange City", kund: "Alice Andersson" },
        { ordernummer: "B456", adress: "456 Banana Avenue, Lemon Town", kund: "Bob Bengtsson" },
        { ordernummer: "C789", adress: "789 Cherry Lane, Grapeville", kund: "Clara Carlsson" },
        { ordernummer: "D101", adress: "101 Date Road, Figsville", kund: "David Dahl" },
        { ordernummer: "E121", adress: "121 Elderberry Boulevard, Raspberry Heights", kund: "Elsa Eriksson" },
        { ordernummer: "F314", adress: "314 Figtree Street, Olive Town", kund: "Fredrik Fredriksson" },
        { ordernummer: "G516", adress: "516 Grapevine Lane, Plum City", kund: "Greta Gustafsson" },
        { ordernummer: "H718", adress: "718 Honeydew Avenue, Kiwi Village", kund: "Hans Hansson" },
        { ordernummer: "I920", adress: "920 Ice Cream Street, Watermelon Falls", kund: "Ida Isaksson" },
        { ordernummer: "J112", adress: "112 Jackfruit Road, Tangerine Springs", kund: "Johan Johansson" },
        { ordernummer: "K131", adress: "131 Kiwifruit Lane, Lychee Harbor", kund: "Klara Karlsson" },
        { ordernummer: "L415", adress: "415 Lime Street, Papaya Village", kund: "Ludvig Larsson" },
        { ordernummer: "M517", adress: "517 Mango Avenue, Nectarine Town", kund: "Maria Mårtensson" },
        { ordernummer: "N719", adress: "719 Nashi Road, Persimmon City", kund: "Nils Nilsson" },
        { ordernummer: "O921", adress: "921 Orange Blossom Lane, Pineapple Falls", kund: "Olivia Olofsson" }
    ];
    
    
    const orderButtonsContainer = document.getElementById('orderButtons');
    const searchInput = document.getElementById('searchInput');
    
    function createOrderButtons(data) {
        orderButtonsContainer.innerHTML = '';
    
        data.forEach(order => {
            const button = document.createElement('button');
            button.textContent = `Ordernummer: ${order.ordernummer}\nKund: ${order.kund}\nAdress: ${order.adress}`;
            orderButtonsContainer.appendChild(button);
    
            button.addEventListener('click', () => {
                // Här kan du göra något när knappen klickas, t.ex. visa mer information om ordern
                console.log(`Vald order: ${order.ordernummer}`);
            });
        });
    }
    
    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
    
        const filteredOrders = ordersData.filter(order =>
            order.ordernummer.toLowerCase().includes(searchValue) ||
            order.adress.toLowerCase().includes(searchValue) ||
            order.kund.toLowerCase().includes(searchValue)
        );
    
        createOrderButtons(filteredOrders);
    });
    
    createOrderButtons(ordersData);
    