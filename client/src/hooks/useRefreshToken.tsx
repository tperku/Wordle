import { useContext } from "react";

import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

export function useRefreshToken() {
  const { auth, setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const response = await axios.get("/user/token", {
      params: {
        username: auth.username,
      },
    });
    setAuth((prev: any) => {
      return {
        ...prev,
        username: response.data.username,
        role: response.data.role,
        accessToken: response.data.token,
      };
    });
    return response.data.token;
  };
  return refresh;
}
