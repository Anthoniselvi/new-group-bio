import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const AddedMembers = () => {
  const router = useRouter();
  const { id } = router.query;
  const [singleGroupMembers, setSingleGroupMembers] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/all/${id}`)

      .then((response) => {
        setSingleGroupMembers(response.data);
        console.log("singleGroup :" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      {singleGroupMembers.map((singleMember) => (
        <p style={{ color: "black" }}>{singleMember.mobile}</p>
      ))}
    </div>
  );
};

export default AddedMembers;
