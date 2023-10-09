import { proxy } from "valtio";

const state = proxy({
  ips: [],
  searchTerm: "",
  searchResults: [],
  isDisabled: false,
  currentPage: parseInt(0),
  PER_PAGE: 8,
  offset: 0,
  title: "",
  isDeleted: false,
  sortKey: null,
});

export default state;