

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

    // AddToTable(playrss);
    
   
});



const baseUrl: string = "https://nbaserver-q21u.onrender.com/api/filter"

class Player{

// position: string;
// twoPercent: Number;
// threePercent: Number;
// points: Number;


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