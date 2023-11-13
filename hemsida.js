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

