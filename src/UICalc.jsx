import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import holdemStore from "./Stores";
import "./UICalc.css";

export const UICalc = observer(({ idx }) => {
	return (
		<>
			<div className="calc-absolute">
				<div className="content p-2">계산기 {holdemStore.players[idx].allinCash}</div>
			</div>
		</>
	);
});
