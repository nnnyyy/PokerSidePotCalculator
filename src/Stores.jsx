import { makeAutoObservable, observable, computed, action } from "mobx";

export const STATE_FOLD = 0;
export const STATE_PLAY = 1;

export class HoldemStore {
    players = [
        { name: "A", allinCash: 1200, state: STATE_PLAY, rank: 4, cacheCash: 0, totalEarn: 0 },
        { name: "B", allinCash: 0, state: STATE_FOLD, rank: 4, cacheCash: 0, totalEarn: 0 },
        { name: "C", allinCash: 0, state: STATE_FOLD, rank: 1, cacheCash: 0, totalEarn: 0 },
        { name: "D", allinCash: 0, state: STATE_FOLD, rank: 7, cacheCash: 0, totalEarn: 0 },
        { name: "E", allinCash: 500, state: STATE_PLAY, rank: 1, cacheCash: 0, totalEarn: 0 },
        { name: "F", allinCash: 1500, state: STATE_PLAY, rank: 1, cacheCash: 0, totalEarn: 0 },
        { name: "G", allinCash: 700, state: STATE_PLAY, rank: 2, cacheCash: 0, totalEarn: 0 },
        { name: "H", allinCash: 0, state: STATE_FOLD, rank: 1, cacheCash: 0, totalEarn: 0 },
        { name: "I", allinCash: 2200, state: STATE_PLAY, rank: 3, cacheCash: 0, totalEarn: 0 },
        { name: "J", allinCash: 0, state: STATE_FOLD, rank: 8, cacheCash: 0, totalEarn: 0 },
    ];

    constructor() {
        makeAutoObservable(this);
        this.recalc();
    }

    setCash(idx, allinCash) {
        this.players[idx].allinCash = Number(allinCash);
        this.recalc();
    }

    setState(idx, state) {
        this.players[idx].state = state;
        if (state == STATE_FOLD) {
            this.players[idx].allinCash = 0;
            this.players[idx].cacheCash = 0;
            this.players[idx].rank = 10;
        } else {
            this.players[idx].allinCash = 100;
            this.players[idx].cacheCash = 0;
        }
        this.recalc();
    }

    setRank(idx, rank) {
        this.players[idx].rank = rank;
        this.recalc();
    }

    recalc() {
        let playingUsers = this.players.filter((p) => p.state == STATE_PLAY);
        this.players.forEach((p) => {
            p.cacheCash = p.allinCash;
            p.totalEarn = 0;
        });

        const pots = [];
        while (playingUsers.filter((p) => p.cacheCash > 0).length > 0) {
            const playables = playingUsers.filter((p) => p.cacheCash > 0);
            playables.sort((a, b) => (Number(a.cacheCash) > Number(b.cacheCash) ? 1 : -1));
            const minBet = playables[0].cacheCash;
            const pot = minBet * playables.length;
            const playerForPot = playables;
            pots.push({ pot, playerForPot });
            playables.forEach((p) => (p.cacheCash -= minBet));
        }

        console.log(pots);

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
    }
}

export default new HoldemStore();

/*

*/
