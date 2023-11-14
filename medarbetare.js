document.addEventListener('DOMContentLoaded', function () {
    const medarbetareSection = document.getElementById('medarbetareSection');

    function loadCSV() {
        fetch('medarbetare.csv')
            .then(response => response.text())
            .then(data => {
                const rows = data.split('\n');
                const headers = rows[0].split(',').map(header => header.trim());

                for (let i = 1; i < rows.length; i++) {
                    const currentRow = rows[i].split(',');
                    if (currentRow.length === headers.length) {
                        const medarbetare = {};
                        for (let j = 0; j < headers.length; j++) {
                            medarbetare[headers[j]] = currentRow[j].trim();
                        }
                        createMedarbetareCard(medarbetare);
                    }
                }
            })
            .catch(error => {
                console.error('Det gick inte att läsa in medarbetarfilen', error);
            });
    }

    function createMedarbetareCard(medarbetare) {
        const card = document.createElement('div');
        card.classList.add('medarbetare-card');

        const avatar = document.createElement('div');
        avatar.classList.add('medarbetare-avatar');
        // Här kan du lägga till en bild eller ikon för varje medarbetare om du har sådana.

        const info = document.createElement('div');
        info.classList.add('medarbetare-info');
        const namn = document.createElement('h3');
        namn.textContent = medarbetare.Namn;
        const roll = document.createElement('p');
        roll.textContent = `Roll: ${medarbetare.Roll}`;
        const kontakt = document.createElement('p');
        kontakt.textContent = `Kontakt: ${medarbetare.Kontakt}`;

        info.appendChild(namn);
        info.appendChild(roll);
        info.appendChild(kontakt);

        card.appendChild(avatar);
        card.appendChild(info);

        medarbetareSection.appendChild(card);
        data.forEach(employee => {
            const container = document.createElement('div');
            container.classList.add('employee-card');

            const nameText = document.createElement('p');
            nameText.textContent = `Namn: ${employee.Namn}`;
            container.appendChild(nameText);

            const roleText = document.createElement('p');
            roleText.textContent = `Roll: ${employee.Roll}`;
            container.appendChild(roleText);

            const contactLink = document.createElement('p');
            const contactInfo = employee.Kontakt.split(' / '); // Dela upp telefonnummer och e-post
            const phoneLink = `<a href="tel:${contactInfo[0]}">${contactInfo[0]}</a>`;
            const emailLink = `<a href="mailto:${contactInfo[1]}">${contactInfo[1]}</a>`;
            contactLink.innerHTML = `Kontakt: ${phoneLink} / ${emailLink}`;
            container.appendChild(contactLink);

            document.getElementById('employeeDisplay').appendChild(container);
        });
    }

    loadCSV();
});
