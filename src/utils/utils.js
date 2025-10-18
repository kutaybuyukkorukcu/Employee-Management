export const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
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
