"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let table = document.getElementById("table-of-players");
const ListOfPlayers = [];
const form = document.getElementById("form");
form.addEventListener('submit', function (event) {
    event.preventDefault();
});
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const position = document.getElementById('Position-input').value;
    const points = Number(document.getElementById('Points-input').value);
    const twoPercent = Number(document.getElementById('FG-input').value);
    const threePercent = Number(document.getElementById('3P-input').value);
    let myPlay = new Player(position, twoPercent, threePercent, points);
    let playrss = yield ApiGetPlayers(myPlay);
    console.log(playrss);
    AddToTable(playrss);
}));
const baseUrl = "https://nbaserver-q21u.onrender.com/api/filter";
class Player {
    constructor(positi, two, three, point) {
        this.position = positi;
        this.twoPercent = two;
        this.threePercent = three;
        this.points = point;
    }
}
function AddToTable(Arrplayers) {
    table.innerHTML = `<tr id="title-of-table">
        <th>Player</th>
        <th>Points</th>
        <th>Position</th>
        <th>FG%</th>
        <th>3P%</th>
        <th>Action</th>
    </tr>`;
    Arrplayers.forEach((ply) => {
        let row = document.createElement("tr");
        let playerName = document.createElement("td");
        playerName.textContent = ply.playerName;
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
        button.textContent = `Add ${ply.playerName.split(" ")[0]} to group`;
        button.addEventListener("click", () => { addToGroup(ply); });
        row.appendChild(button);
        table.appendChild(row);
    });
}
function addToGroup(plye) {
    let myDiv = document.getElementById(`div-${plye.position}`);
    myDiv.innerHTML = "";
    let textDiv = document.createElement("p");
    let textDiv1 = document.createElement("p");
    let textDiv2 = document.createElement("p");
    let textDiv3 = document.createElement("p");
    textDiv.textContent = plye.playerName;
    myDiv.appendChild(textDiv);
    textDiv1.textContent = `Three present: ${plye.threePercent}`;
    myDiv.appendChild(textDiv1);
    textDiv2.textContent = `two present: ${plye.twoPercent}`;
    myDiv.appendChild(textDiv2);
    textDiv3.textContent = `poimts: ${plye.points}`;
    myDiv.appendChild(textDiv3);
}
// post
function ApiGetPlayers(player) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        });
        const players = yield response.json();
        console.log(players);
        return players;
    });
}
