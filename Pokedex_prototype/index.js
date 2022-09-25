async function loadIntoSection(url, pokemon_info){
    const section = pokemon_info.querySelector('section');
    const response = await fetch(url);
    const  divs  = await response.json();
    
    /*
    const div_step1 = divs.find(element => element[0]);
    const div_step2 = div_step1.find(element => element[3]);
    */

    for (const div of divs){
        const divElement = document.createElement('div');


        for (const cellText of div){
            const cellElement = document.createElement('p');
            
            cellElement.textContent = cellText;
            divElement.appendChild(cellElement);
            
            if (cellText.length === 3){
                const imgCell = document.createElement('p');
                let imgPoke = document.createElement("img");

                imgPoke.setAttribute("height", "70px");
                imgPoke.setAttribute("width", "70px");
                imgPoke.setAttribute("alt", div[1] + " sprite gif");
                imgPoke.setAttribute("src", "./sprites/" + div[2] + ".png");
                imgCell.appendChild(imgPoke);
                divElement.replaceChild(imgCell, cellElement);
            }

            for (const type of cellText){
                if (type.includes("type")){
                    cellElement.remove(type);
                }
                
            }
            

            
        }
        
        document.getElementById('pokemon_info').appendChild(divElement)
        
       

    
    }

}


loadIntoSection('./pokson/gen1.json', document.querySelector('#pokemon_info'));

let cry = new Audio();

function playAudio(file){
    cry.pause();
    cry = new Audio(file);
    cry.play();
}


function lastMod() {
    let l = document.lastModified;
    document.getElementById("last_modified").innerHTML = l;
}

lastMod();