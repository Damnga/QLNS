import { createContext} from "react";
import { useState } from "react";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    const [token,setToken]=useState("");
    const [data, setData] = useState([]);

    const contextValue = {
        token,
        setToken,
        data,
        setData
        
    };
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
