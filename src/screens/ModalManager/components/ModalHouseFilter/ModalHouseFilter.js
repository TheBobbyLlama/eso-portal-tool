import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { townActions, townSelectors } from "../../../../store/townSlice.js";
import { modalActions, modalKey } from "../../../../store/modalSlice.js";

import { zoneData } from "../../../../data/zoneData.js"

import "./ModalHouseFilter.css"

function ModalHouseFilter() {
	const [filter, setFilters] = useState(useSelector(townSelectors.filter));
	const containerRef = useRef(null);
	const dispatch = useDispatch();

	const filterOptions = zoneData.map(zone => zone.style).filter((value, index, array) => array.indexOf(value) === index).sort();

	const clickLabel = (e) => {
		containerRef.current.querySelector(`input[value='${e.target.dataset.key}']`).click();
	}

	const updateFilters = () => {
		const newFilters = [];

		containerRef.current.querySelectorAll("input[type='checkbox'").forEach((checkbox) => {
			if (checkbox.checked) {
				newFilters.push(checkbox.value);
			}
		});

		setFilters(newFilters);
	}

	const saveFilters = () => {
		dispatch(townActions.setLocationFilter(filter));
		dispatch(modalActions.showModal({ key: modalKey.clear }));
	}

	const cancelFilters = () => {
		dispatch(modalActions.showModal({ key: modalKey.clear }));
	}

	return <section>
		<h2>Filters</h2>
		<div ref={containerRef} id="filterList">
			{filterOptions.map((curFilter) => {
				return <div key={curFilter} className="formGroup">
						<input type="checkbox" value={curFilter} checked={filter.indexOf(curFilter) > -1} onChange={updateFilters} />
						<label data-key={curFilter} onClick={clickLabel}>{curFilter}</label>
					</div>;
			})}
		</div>
		<div>
			<button onClick={saveFilters}>Ok</button>
			<button onClick={cancelFilters}>Cancel</button>
		</div>
	</section>
}

export default ModalHouseFilter;