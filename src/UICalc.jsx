import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import holdemStore, { globalStore } from "./Stores";
import "./UICalc.css";

export const UICalc = observer(({ idx, initVal }) => {
	const [cashVal, setCashVal] = useState(initVal);
	const inputKey = (v) => {
		if (v == -1) {
			setCashVal(0);
		} else if (cashVal == 0) {
			setCashVal(v);
		} else {
			setCashVal(Number(`${cashVal}${v}`));
		}
	};

	const topMargin = 68;

	return (
		<>
			<div
				className="calc-absolute"
				onClick={(e) => {
					holdemStore.setCash(globalStore.selectedPlayerIdx, cashVal);
					globalStore.isCalcOpen = false;
				}}>
				<div className="content p-2 position-relative" onClick={(e) => e.stopPropagation()}>
					<div className="h1">{cashVal}</div>
					{Array(9)
						.fill(1)
						.map((v, i) => {
							const val = i + 1;
							return (
								<button key={i} className={`btn btn-outline-success position-absolute btn-calc`} style={{ left: 10 + (i % 3) * 90, top: topMargin + Math.floor(i / 3) * 90 }} onClick={(e) => inputKey(val)}>
									{val}
								</button>
							);
						})}
					<button className="btn btn-outline-success position-absolute btn-calc" style={{ left: 10 + 1 * 90, top: topMargin + 3 * 90 }} onClick={(e) => inputKey(0)}>
						0
					</button>

					<button className="btn btn-outline-success position-absolute btn-calc" style={{ left: 10 + 2 * 90, top: topMargin + 3 * 90 }} onClick={(e) => inputKey(-1)}>
						AC
					</button>
				</div>
			</div>
		</>
	);
});
