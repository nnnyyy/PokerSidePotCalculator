import { makeObservable, observable, computed, action } from "mobx";

const STATE_FOLD = 0;
const STATE_PLAY = 1;

export class HoldemStore {
    players = [
        { name: "A", allinCash: 1200, state: STATE_PLAY, rank: 4 },
        { name: "B", allinCash: 0, state: STATE_FOLD, rank: 4 },
        { name: "C", allinCash: 0, state: STATE_FOLD, rank: 1 },
        { name: "D", allinCash: 0, state: STATE_FOLD, rank: 7 },
        { name: "E", allinCash: 500, state: STATE_PLAY, rank: 1 },
        { name: "F", allinCash: 1500, state: STATE_PLAY, rank: 1 },
        { name: "G", allinCash: 700, state: STATE_PLAY, rank: 2 },
        { name: "H", allinCash: 0, state: STATE_FOLD, rank: 1 },
        { name: "I", allinCash: 2200, state: STATE_PLAY, rank: 3 },
        { name: "J", allinCash: 0, state: STATE_FOLD, rank: 8 },
    ];

    constructor() {
        makeObservable(this, {
            players: observable,
            playable: computed,
            setCash: action,
        });
    }

    get playable() {
        return this.players;
    }

    setCash(idx, allinCash) {
        //console.log(this.players[idx].allinCash);
        //this.players[idx].allinCash = allinCash;
        this.players = [];
        //console.log(this.players[idx].allinCash);
    }
}

/*
let playingUsers = [...players.filter((p) => p.state == STATE_PLAY)];

playingUsers = playingUsers.map((p) => {
    return { ...p, cacheCash: p.allinCash, totalEarn: 0 };
});

const pots = [];
while (playingUsers.filter((p) => p.allinCash > 0).length > 0) {
    const playables = playingUsers.filter((p) => p.allinCash > 0);
    playables.sort((a, b) => (a.allinCash > b.allinCash ? 1 : -1));
    const minBet = playables[0].allinCash;
    const pot = minBet * playables.length;
    const playerForPot = playables;
    pots.push({ pot, playerForPot });
    playables.forEach((p) => (p.allinCash -= minBet));
}

let round = 1;
for (const potInfo of pots) {
    const { playerForPot, pot } = potInfo;
    playerForPot.sort((a, b) => (a.rank > b.rank ? 1 : -1));
    const winRank = playerForPot[0].rank;
    const winners = playerForPot.filter((p) => p.rank <= winRank);
    const winCash = pot / winners.length;
    winners.forEach((winner) => (winner.totalEarn += winCash));
    round++;
}
*/
