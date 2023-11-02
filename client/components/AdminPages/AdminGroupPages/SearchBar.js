import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import styles from "@/styles/Navbar.module.css";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    border: "1px solid #e1e2e5",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchBar({
  singleGroupMembers,
  onSearch,
  searchResults,
  setSearchResults,
  searchQuery,
  setSearchQuery,
}) {
  const [searchVisible, setSearchVisible] = useState(false);

  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleSearchInputChange = (e) => {
    const inputText = e.target.value.trim();
    setSearchQuery(e.target.value);

    if (inputText === "") {
      setSearchResults([]);
    } else {
      const filteredData = singleGroupMembers.filter(
        (item) =>
          item.name.toLowerCase().includes(inputText.toLowerCase()) ||
          item.company.toLowerCase().includes(inputText.toLowerCase()) ||
          item.offers.toLowerCase().includes(inputText.toLowerCase())
      );

      setSearchResults(filteredData);
    }
  };

  const handleSearchClick = () => {
    const filteredData = singleGroupMembers.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.offers.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredData);
    setSearchVisible(false);
  };

  // console.log("search in searchbar:" + JSON.stringify(searchResults));
  return (
    <>
      <div className={styles.searchContainer}>
        {!searchVisible && (
          <input
            type="text"
            required
            placeholder="Search by Name / Company / Services"
            className={`${styles.searchInput} ${styles.searchInputFocused}`}
            value={searchQuery}
            onChange={handleSearchInputChange}
            autoFocus
            ref={(input) => input && input.focus()}
          />
        )}

        <div className={styles.search} data-testId="search-icon">
          <SearchIcon
            style={{
              color: "#222222",
              // color: "black",
              fontSize: "20px",
              fontWeight: 600,
              "&:hover": {
                transition: "0.3s ease",
                transform: "scale(1.4)",
              },
            }}
            onClick={handleSearchClick}
          />
        </div>
      </div>
    </>
  );
}
