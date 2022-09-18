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

            if (cellText.length === 3){
                const imgCell = document.createElement('td');
                let imgPoke = document.createElement("img");

                imgPoke.setAttribute("height", "80px");
                imgPoke.setAttribute("width", "80px");
                imgPoke.setAttribute("alt", row[1] + " sprite gif");
                imgPoke.setAttribute("src", "./sprites/" + row[2] + ".png");
                imgCell.appendChild(imgPoke);
                rowElement.replaceChild(imgCell, cellElement);
            }

        const typeCell = document.createElement('td');
            for (const type of cellText){
                if (type.includes("type")){
                    
                    let imgType = document.createElement("img");

                    imgType.setAttribute("height", "28px");
                    imgType.setAttribute("width", "64px");
                    imgType.setAttribute("alt", type + " png");
                    imgType.setAttribute("src", "./types/" + type + ".png");
                    typeCell.appendChild(imgType);
                    
                    cellElement.replaceWith(typeCell);  
                }
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