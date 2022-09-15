async function loadIntoTable(url, table){
    const tableHead = table.querySelector('thead');
    const tableBody = table.querySelector('tbody');
    const response = await fetch(url);
    const { headers, rows } = await response.json();
    
    // Clear the table
    tableHead.innerHTML = '<tr></tr>';
    tableBody.innerHTML = '';

    //Populate the headers
    for (const headerText of headers){
        const headerElement = document.createElement('th');

        headerElement.textContent = headerText;
        tableHead.querySelector('tr').appendChild(headerElement)
    }

    //Populate the rows
    for (const row of rows) {
        const rowElement = document.createElement('tr');

        for (const cellText of row) {
            const cellElement = document.createElement('td');

            cellElement.textContent = cellText;
            rowElement.appendChild(cellElement);

            if (cellText.includes('2c')){
                const imgCell = document.createElement('td');
                let imgPoke = document.createElement("img");

                imgPoke.setAttribute("height", "80px")
                imgPoke.setAttribute("width", "80px")
                imgPoke.setAttribute("alt", row[1] + "pixel sprite animated gif")
                imgPoke.setAttribute("src", "https://archives.bulbagarden.net/media/upload/" + row[2]);
                imgCell.appendChild(imgPoke)
                rowElement.replaceChild(imgCell, cellElement);
            }
// https://archives.bulbagarden.net/media/upload/d/dc/GrassIC_FRLG.png
            if (cellText.includes()){
                const typeCell = document.createElement('td');
                let imgType = document.createElement("img");
            }
        }

        tableBody.appendChild(rowElement)
    }
    console.log(tableHead, tableBody)
}


loadIntoTable('./pokson/pokedex.json', document.querySelector('table'));

function lastMod() {
    let l = document.lastModified;
    document.getElementById("last_modified").innerHTML = l;
}

lastMod();