export const formatDate = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

export const formatPhoneNumber = (phoneNumber) => {
  const digits = phoneNumber.toString().replace(/\D/g, "");

  const match = digits.match(/^90(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (!match) return phoneNumber;

  return `+(${90}) ${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
};

export const formatText = (text) => {
  if (typeof text !== "string") return text;
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const parseDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

export const parsePhoneNumber = (formattedPhoneNumber) => {
  if (!formattedPhoneNumber) return "";
  const digits = formattedPhoneNumber.toString().replace(/\D/g, "");
  return digits.startsWith("0") ? digits.slice(1) : digits;
};
