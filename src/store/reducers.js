import authReducer from "./authSlice";
import townReducer from "./townSlice";
import modalReducer from "./modalSlice";

const exportList = {
	auth: authReducer,
	town: townReducer,
	modal: modalReducer,
};

export default exportList;