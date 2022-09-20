import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import holdemStore, { STATE_FOLD, STATE_PLAY, globalStore } from "./Stores";
import { UICalc } from "./UICalc";

import "bootstrap/dist/css/bootstrap.min.css";

const App = observer(() => {
	let initVal = 0;
	const UICalcCheck = observer(() => {
		if (globalStore.isCalcOpen) {
			return <UICalc idx={globalStore.selectedPlayerIdx} initVal={initVal} />;
		}
	});
	return (
		<div className="App">
			<UICalcCheck />
			<div className="p-3">
				<div className="h2">사이드팟 계산</div>
				<button type="button" className="btn btn-outline-primary mt-3" onClick={(e) => holdemStore.players.forEach((p) => (p.rank = 4))}>
					순위 리셋
				</button>
				<table className="table table-bordered table-striped mt-3">
					<thead className="table-dark">
						<tr>
							<td style={{ width: "100px" }}>이름</td>
							<td style={{ width: "80px" }}>상태</td>
							<td style={{ width: "180px" }}>올인 금액</td>
							<td style={{ width: "80px" }}>순위</td>
							<td style={{ width: "160px" }}>순위 설정</td>
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
										<input style={{ width: "100px" }} disabled={p.state == STATE_FOLD} value={p.allinCash} onChange={(e) => holdemStore.setCash(idx, e.target.value)} />
										<button
											type="button"
											className="btn btn-outline-primary ms-1"
											onClick={(e) => {
												initVal = p.allinCash;
												globalStore.setOpen(true, idx);
											}}>
											UI
										</button>
									</td>
									<td>{p.state == STATE_FOLD ? "-" : p.rank}</td>
									<td>
										<button className="me-2" disabled={p.state == STATE_FOLD} onClick={(e) => holdemStore.setRank(idx, 1)}>
											1
										</button>
										<button className="me-2" disabled={p.state == STATE_FOLD} onClick={(e) => holdemStore.setRank(idx, 2)}>
											2
										</button>
										<button className="me-2" disabled={p.state == STATE_FOLD} onClick={(e) => holdemStore.setRank(idx, 3)}>
											3
										</button>
										<button className="me-2" disabled={p.state == STATE_FOLD} onClick={(e) => holdemStore.setRank(idx, 4)}>
											4
										</button>
									</td>
									<td>
										{p.totalEarn > 0 ? "+" : ""}
										{p.totalEarn} (
										<span style={{ color: p.totalEarn - p.allinCash > 0 ? "green" : "inherit" }}>
											{p.totalEarn - p.allinCash > 0 ? "+" : ""}
											{p.totalEarn - p.allinCash}
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
