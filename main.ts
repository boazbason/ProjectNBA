let table = document.getElementById("table-of-players") as HTMLTableElement;

const ListOfPlayers: Player[] = [];
const form = document.getElementById("form")!;
form.addEventListener('submit', function(event) {
    event.preventDefault();
});
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const position = (document.getElementById('Position-input') as HTMLSelectElement).value;
    const points = Number((document.getElementById('Points-input') as HTMLInputElement).value);
    const twoPercent = Number((document.getElementById('FG-input') as HTMLInputElement).value);
    const threePercent = Number((document.getElementById('3P-input') as HTMLInputElement).value);

    let myPlay: Player = new Player(position, points, twoPercent, threePercent);
    let playrss: Player[] = await ApiGetPlayers(myPlay);
    console.log(playrss);

    AddToTable(playrss);
    
   
});



const baseUrl: string = "https://nbaserver-q21u.onrender.com/api/filter"

class Player{

    playerName?: string;
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;

    constructor(positi: string, two: number, three: number, point: number){
        this.position = positi;
        this.twoPercent = two;
        this.threePercent = three;
        this.points = point;
    }
}

function AddToTable(Arrplayers: Player[]): void{
    table.innerHTML = `<tr id="title-of-table">
        <th>Player</th>
        <th>Points</th>
        <th>Position</th>
        <th>FG%</th>
        <th>3P%</th>
        <th>Action</th>
    </tr>`;
    Arrplayers.forEach((ply)=>{
        


        let row = document.createElement("tr")

            let playerName = document.createElement("td");
            playerName.textContent = ply.playerName!;
            row.appendChild(playerName);

            let points = document.createElement("td");
            points.textContent = ply.points.toString();
            row.appendChild(points);

            let position = document.createElement("td");
            position.textContent = ply.position;
            row.appendChild(position);

            let threePercent = document.createElement("td");
            threePercent.textContent = ply.threePercent.toString();
            row.appendChild(threePercent);

            let twoPercent = document.createElement("td");
            twoPercent.textContent = ply.twoPercent.toString();
            row.appendChild(twoPercent);

            let button = document.createElement("button");
            button.textContent = `Add ${ply.playerName!.split(" ")[0]} to group`;
            button.addEventListener("click", ()=>{addToGroup(ply)})
            row.appendChild(button);
        
            table.appendChild(row)
    })
}


function addToGroup(plye: Player):void{
    let myDiv = document.getElementById(`div-${plye.position}`) as HTMLDivElement;
    myDiv.innerHTML = "";
    let textDiv = document.createElement("p");
    let textDiv1 = document.createElement("p");
    let textDiv2 = document.createElement("p");
    let textDiv3 = document.createElement("p");

    textDiv.textContent = plye.playerName!;
    myDiv.appendChild(textDiv);

    textDiv1.textContent = `Three present: ${plye.threePercent}`!;
    myDiv.appendChild(textDiv1);

    textDiv2.textContent = `two present: ${plye.twoPercent}`!;
    myDiv.appendChild(textDiv2);

    textDiv3.textContent = `poimts: ${plye.points}`!;
    
    myDiv.appendChild(textDiv3);
    
}




// post
async function ApiGetPlayers(player: Player): Promise<Player[]>{
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
    });
    const players: Player[] = await response.json();
    console.log(players);
    return players;
}