import md5 from "md5";

export function auth() {
  const currentDate = new Date();
  console.log(currentDate);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}${month}${day}`;
  const authToken = md5(`Valantis_${formattedDate}`);
  console.log(authToken);
  return authToken;
}
