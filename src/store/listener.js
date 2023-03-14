import { createListenerMiddleware } from "@reduxjs/toolkit";
import reducers from "./reducers";

const listener = createListenerMiddleware();

// listener.startListening()

export default listener.middleware;