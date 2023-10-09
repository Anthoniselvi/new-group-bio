import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const userAuthContext = createContext();

export function ApiContextProvider({ children }) {
  const [membersList, setMembersList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/all`)
      .then((response) => {
        setMembersList(response.data);
        console.log("membersList:" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [membersList]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/all`)
      .then((response) => {
        setGroupsList(response.data);
        console.log("groupsList:" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [groupsList]);
  return (
    <userAuthContext.Provider
      value={{
        membersList,
        groupsList,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
