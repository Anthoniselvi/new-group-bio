import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUserAuth } from "@/context/GroupContext";

const GroupsList = () => {
  const { groupsList } = useUserAuth();
  const router = useRouter();
  console.log("List of groups: " + JSON.stringify(groupsList));
  const navigateToSingleGroupProfiles = (singleGroup) => {
    router.push({
      pathname: "/singlegroup",
      query: { id: singleGroup.groupId },
    });
  };

  return (
    <div
      style={{
        width: "100%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {groupsList.map((singleGroup) => (
        <div
          onClick={() => navigateToSingleGroupProfiles(singleGroup)}
          key={singleGroup.groupId} // Add a unique key for each group
          style={{
            width: "100%",
            padding: 2,
            border: "1px solid red",
          }}
        >
          <p>{singleGroup.groupName}</p>
          <p>{singleGroup.groupType}</p>
        </div>
      ))}
    </div>
  );
};

export default GroupsList;
