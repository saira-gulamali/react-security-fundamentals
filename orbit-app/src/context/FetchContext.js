import React, { createContext, useEffect } from "react";
import axios from "axios";

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  // const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await authAxios.get("/csrf-token");
      console.log(data);
      authAxios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  // authAxios.interceptors.request.use(
  //   (config) => {
  //     // const { origin } = new URL(config.url);
  //     // const allowedOrigins = ["http://localhost:3002"];
  //     // if (allowedOrigins.includes(origin)) {}

  //     config.headers.Authorization = `Bearer ${authContext.authState.token}`;

  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
