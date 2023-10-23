// GroupContext.js

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const userAuthContext = createContext();

export function ApiContextProvider({ children }) {
  const [groupsList, setGroupsList] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isMemberLoggedIn, setIsMemberLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [loggedMemberId, setLoggedMemberId] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/all`)
      .then((response) => {
        setGroupsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [groupsList]);

  const adminLogin = async (username, password) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/add`, {
        username,
        password,
      });
      localStorage.setItem("isAdminLoggedIn", "true");
      setIsAdminLoggedIn(localStorage.getItem("isAdminLoggedIn"));
      router.push("/dashboard");
    } catch (err) {
      setError(true);
    }
  };
  // console.log("AdminLogged: " + isAdminLoggedIn);
  const memberLogin = (mobile, membersList) => {
    // console.log("mobile:" + mobile);
    if (!mobile) {
      setError("Please enter a mobile number.");
      return;
    }
    // console.log("Members: " + JSON.stringify(membersList));
    const matchingMember = membersList.find(
      (member) => member.mobile === parseInt(mobile)
    );
    // console.log("matchMember:" + JSON.stringify(matchingMember));
    if (matchingMember) {
      localStorage.setItem("isMemberLoggedIn", "true");
      setIsMemberLoggedIn(localStorage.getItem("isMemberLoggedIn"));
      setLoggedMemberId(matchingMember.memberId);
      if (!matchingMember.name) {
        router.push({
          pathname: "/updatemember",
          query: { id: id, memberId: matchingMember.memberId },
        });
      } else {
        router.push({
          pathname: "/membergrouppage",
          query: { id: id, memberId: matchingMember.memberId },
        });
      }
    } else {
      setError("Your mobile number is not registered.");
    }
  };
  // console.log("MemberLogin: " + isMemberLoggedIn);
  // console.log("loggedMember:" + loggedMemberId);

  const logout = () => {
    setIsAdminLoggedIn(false);
    setIsMemberLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("isMemberLoggedIn");
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminLoggedIn");
    const isMember = localStorage.getItem("isMemberLoggedIn");
    setIsAdminLoggedIn(isAdmin);
    setIsMemberLoggedIn(isMember);
  }, [isAdminLoggedIn, isMemberLoggedIn]);
  return (
    <userAuthContext.Provider
      value={{
        groupsList,
        isAdminLoggedIn,
        isMemberLoggedIn,
        adminLogin,
        memberLogin,
        logout,
        error,
        loggedMemberId,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
