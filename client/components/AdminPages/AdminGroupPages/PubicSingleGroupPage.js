import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MembersListForPublic from "../AdminPageForMembers/MembersListForPublic";
import axios from "axios";

export default function PublicSingleGroupPage() {
  const [selectedGroup, setSelectedGroup] = useState({});
  const [singleGroupMembers, setSingleGroupMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id: groupId } = router.query;

  useEffect(() => {
    if (groupId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/single/${groupId}`)
        .then((response) => {
          setSelectedGroup(response.data);
          console.log("selectedGroup :" + JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error("Error fetching group data:", error);
        });

      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/all/${groupId}`)
        .then((response) => {
          setSingleGroupMembers(response.data);
          console.log("singleGroup :" + JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error("Error fetching members data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [groupId]);

  return (
    <div>
      <h2>{selectedGroup.groupName}</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <MembersListForPublic
          singleGroup={singleGroupMembers}
          selectedGroup={selectedGroup}
        />
      )}
    </div>
  );
}
