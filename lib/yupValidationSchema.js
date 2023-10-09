import * as Yup from "yup";
const ipAddressSchema = Yup.string()
  .trim()
  .required("IP is Required")
  .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
    message: "Invalid IP address",
    excludeEmptyString: true,
  })
  .test(
    "ipAddress",
    "IP address value should be less or equal to 255",
    (value) => {
      if (value === undefined || value.trim() === "") return true;
      return value.split(".").find((i) => parseInt(i) > 255) === undefined;
    }
  );
export const deviceValidationSchema = Yup.object().shape({
 
   location: Yup.string().trim().required(" Location is required"),
  device_type: Yup.string().trim().required("Device Type is required"),
  added_by: Yup.string().required("Added By is Required"),
  added_date: Yup.string().required("Added Date is Required"),
    ip: ipAddressSchema,  
});


// get current date and format it to YYYY-MM-DD and add trailing zero to month and day
export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthStr = month < 10 ? `0${month}` : month;
  const dayStr = day < 10 ? `0${day}` : day;
  return `${year}-${monthStr}-${dayStr}`;
};