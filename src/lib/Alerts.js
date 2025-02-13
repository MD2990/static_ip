import Swal from "sweetalert2";

export async function handleFormDelete({ handleDelete }) {
	await Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		cancelButtonColor: "#3085d6",
		showCancelButton: true,
		confirmButtonColor: "#d33",
		focusCancel: true,
		reverseButtons: true,
		confirmButtonText: "Yes, delete it!",
	}).then((result) => {
		if (result.isConfirmed) {
			handleDelete();
		}
	});
}

export function successAlert(msg = "Deleted successfully") {
	Swal.fire({
		icon: "success",
		timerProgressBar: true,
		title: msg,
		showConfirmButton: false,
		timer: 2500,
		toast: true,
		position: "top-end",
	});
}

export function errorAlert(msg = "Something went wrong! Please try Again") {
	Swal.fire({
		icon: "error",
		title: "Error",
		text: msg,
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3500,
		timerProgressBar: true,
	});
}
