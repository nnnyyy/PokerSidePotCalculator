import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import holdemStore, { STATE_FOLD, STATE_PLAY } from "./Stores";

const App = observer(() => {
    return (
        <div className="App">
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>이름</td>
                            <td>상태</td>
                            <td>올인 금액</td>
                            <td>순위</td>
                            <td>
                                순위 설정 <button onClick={(e) => holdemStore.players.forEach((p) => (p.rank = 4))}>reset</button>
                            </td>
                            <td>결과</td>
                        </tr>
                    </thead>
                    <tbody>
                        {holdemStore.players.map((p, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{p.name}</td>
                                    <td>
                                        <div style={{ cursor: "pointer" }} onClick={(e) => holdemStore.setState(idx, p.state == STATE_PLAY ? STATE_FOLD : STATE_PLAY)}>
                                            {p.state == STATE_PLAY ? "플레이" : "폴드"}
                                        </div>
                                    </td>
                                    <td>
                                        <input disabled={p.state == STATE_FOLD} value={p.allinCash} onChange={(e) => holdemStore.setCash(idx, e.target.value)} />
                                    </td>
                                    <td>{p.state == STATE_FOLD ? "-" : p.rank}</td>
                                    <td>
                                        <button disabled={p.state == STATE_FOLD} onClick={(e) => holdemStore.setRank(idx, 1)}>
                                            1
                                        </button>
                                        <button disabled={p.state == STATE_FOLD} onClick={(e) => holdemStore.setRank(idx, 2)}>
                                            2
                                        </button>
                                        <button disabled={p.state == STATE_FOLD} onClick={(e) => holdemStore.setRank(idx, 3)}>
                                            3
                                        </button>
                                        <button disabled={p.state == STATE_FOLD} onClick={(e) => holdemStore.setRank(idx, 4)}>
                                            4
                                        </button>
                                    </td>
                                    <td>
                                        {p.totalEarn > 0 ? "+" : ""}
                                        {p.totalEarn} ({" "}
                                        <span style={{ color: p.totalEarn - p.allinCash > 0 ? "green" : "inherit" }}>
                                            {p.totalEarn - p.allinCash > 0 ? "+" : ""}
                                            {p.totalEarn - p.allinCash}{" "}
                                        </span>
                                        )
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default App;
