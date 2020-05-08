import {createStore} from "redux";
import{Reducer, initialState} from "./reducer";

export default ConfigureStore = () => {
    const store = CreateStore(
        Reducer,
        initialState
    );
    return store;
}