import { useDispatch, useSelector } from "react-redux";
import { modalActions, modalKey, modalSelectors } from "../../../../store/modalSlice";

function ModalGeneric() {
	const modalData = useSelector(modalSelectors.data);
	const dispatch = useDispatch();

	const doAction = () => {
		if (modalData.action) {
			dispatch(modalData.action);
		} else {
			dispatch(modalActions.showModal({ key: modalKey.clear }));
		}
	}

	return <section>
		<h2>{modalData.title}</h2>
		{ modalData.text.map ?
			modalData.text.map((item, index) => <p key={index}>{item}</p>) : <p>{modalData.text}</p>}
		<div>
			<button onClick={doAction}>{modalData.buttonLabel || "Ok"}</button>
		</div>
	</section>;
}

export default ModalGeneric;