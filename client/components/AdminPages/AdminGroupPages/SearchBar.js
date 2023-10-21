import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

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
}) {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  //   const [searchResults, setSearchResults] = useState([]);

  const openSearchBar = () => {
    setOpenSearch(true);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      // If the search input is empty, you can choose to handle this case or do nothing.
      setSearchResults([]);
      return;
    }

    // Perform the search and update the search results
    const results = singleGroupMembers.filter((member) => {
      const searchTerms = [
        member.name,
        member.company,
        member.industry,
        member.offers,
      ].join(" ");
      return searchTerms.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setSearchResults(results);
  };

  useEffect(() => {
    if (!openSearch) {
      // Clear the search query and results when closing the search bar
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [openSearch]);

  useEffect(() => {
    // Pass the search results to the parent component when they change
    onSearch(searchResults);
  }, [searchResults, onSearch]);
  console.log("search: " + JSON.stringify(searchResults));
  return (
    <>
      {!openSearch ? (
        <SearchIcon onClick={openSearchBar} />
      ) : (
        <Search onClick={handleSearch}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
      )}
    </>
  );
}
