import authReducer from "./authSlice";
import townReducer from "./townSlice";

const exportList = {
	auth: authReducer,
	town: townReducer,
};

export default exportList;