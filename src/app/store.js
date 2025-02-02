import { proxy } from "valtio";

const state = proxy({
	ip: [],
	emp: [],
	device: [],
	searchTerm: "",
	searchResults: [],
	isDisabled: false,
	currentPage: parseInt(0),
	PER_PAGE: 8,
	offset: 0,
	title: "",
	isDeleted: false,
	sortKey: null,
	empTotal: 0,
	devicesTotal: 0,
	deviceDefaultValue: "",
});

export default state;
