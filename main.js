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
    let myPlay = new Player(position, points, twoPercent, threePercent);
    let playrss = yield ApiGetPlayers(myPlay);
    console.log(playrss);
    // AddToTable(playrss);
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
function TestPost() {
    return __awaiter(this, void 0, void 0, function* () {
        let myPlay = new Player("PG", 2, 2, 10);
        let playrss = yield ApiGetPlayers(myPlay);
        console.log(playrss);
    });
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
