import React, { useRef, useState } from "react";
import { HoldemStore } from "./Stores";

const UserList = ({ players, onChange }) => {
    return (
        <div>
            {players.map((p, idx) => {
                return (
                    <div key={idx}>
                        이름 : {p.name}
                        <input
                            type="text"
                            value={p.money}
                            onChange={(e) => onChange(idx, e)}
                        ></input>
                    </div>
                );
            })}
        </div>
    );
};

function App() {
    const [players, setPlayers] = useState([
        { name: "예식", money: 10000 },
        { name: "희대", money: 22000 },
    ]);

    const addPlayerInfo = () => {
        setPlayers([...players, { name: "동휘", money: 20000 }]);
    };

    const editPlayerInfo = () => {};

    const onChangePlayerMoney = (idx, e) => {
        players[idx].money = e.target.value;
        setPlayers([...players]);
    };

    return (
        <div className="App">
            <button onClick={addPlayerInfo}>추가</button>
            <button onClick={editPlayerInfo}>수정</button>
            <UserList players={players} onChange={onChangePlayerMoney} />
        </div>
    );
}

export default App;
