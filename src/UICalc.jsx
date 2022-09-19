import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import holdemStore from "./Stores";
import "./UICalc.css";

export const UICalc = observer(({ idx }) => {
	return (
		<>
			<div className="calc-absolute">
				<div className="content p-2 position-relative">
					<button className="btn btn-outline-success position-absolute btn-calc num-1">1</button>
					<button className="btn btn-outline-success position-absolute btn-calc num-2">2</button>
					<button className="btn btn-outline-success position-absolute btn-calc num-3">3</button>
					<button className="btn btn-outline-success position-absolute btn-calc num-4">4</button>
					<button className="btn btn-outline-success position-absolute btn-calc num-5">5</button>
					<button className="btn btn-outline-success position-absolute btn-calc num-6">6</button>
					<button className="btn btn-outline-success position-absolute btn-calc num-7">7</button>
					<button className="btn btn-outline-success position-absolute btn-calc num-8">8</button>
					<button className="btn btn-outline-success position-absolute btn-calc num-9">9</button>
				</div>
			</div>
		</>
	);
});
