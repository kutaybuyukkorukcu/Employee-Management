export const formatDate = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

export const formatPhoneNumber = (phoneNumber) => {
  let digits = phoneNumber.toString().replace(/\D/g, "");

  if (digits.length === 10) {
    digits = "90" + digits;
  } else if (digits.startsWith("0")) {
    digits = "90" + digits.slice(1);
  }

  const match = digits.match(/^90(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (!match) return phoneNumber;

  return `+(${90}) ${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
};

export const formatText = (text) => {
  if (typeof text !== "string") return text;
  if (text === text.toUpperCase()) return text;
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
  let digits = formattedPhoneNumber.toString().replace(/\D/g, "");
  const pattern = /^(?:90|0)?\d{10}$/;

  if (!pattern.test(digits)) return "";
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (!digits.startsWith("90")) digits = `90${digits}`;

  return digits;
};
