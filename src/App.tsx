import { useEffect } from "react";
import "./App.css";
import Route from "./router/route";
import { getAccessToken } from "./utils/local-storage";
import { useAppDispatch } from "./store/store";
import { GetToken } from "./store/Slice/authSlice";

function App() {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    const token = getAccessToken()
      if(token){
        dispatch(GetToken(token))
      }
  },[])
    
  return <Route />;
}

export default App;
