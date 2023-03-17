import { useSelector } from "react-redux";
import ModalGeneric from "./components/ModalGeneric/ModalGeneric";

import { modalKey, modalSelectors } from "../../store/modalSlice";

import "./ModalManager.css";

function ModalManager() {
	const currentKey = useSelector(modalSelectors.key);

	if (currentKey) {
		let ModalComponent;

		switch (currentKey) {
			case modalKey.generic:
				ModalComponent = ModalGeneric;
				break;
			default:
				ModalComponent = null;
		}

		console.log(ModalComponent);

		if (ModalComponent) {
			return <div id="modalBG">
				<ModalComponent />
			</div>;
		}
	}
	
	return null;
}

export default ModalManager;