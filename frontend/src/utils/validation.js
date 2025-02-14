export const validateName = (name) => {
    const regex = /^[a-zA-ZğĞüÜşŞıİçÇöÖ]/;
   return regex.test(name);
 };
 export const validateDate = (date) => {
   const today = new Date();
   const selectedDate = new Date(date);
   return selectedDate <= today;
 };
 
 export const validatePhone = (phone) => {
   const regex = /^\d{10}$/;
   return regex.test(phone);
 };
 export function validateTC(tcKimlik) {
   if (!/^\d{11}$/.test(tcKimlik)) return false;
   const digits = tcKimlik.split('').map(Number);
   const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
   const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
   const tenthDigit = (7 * oddSum - evenSum) % 10;
 
   if (tenthDigit !== digits[9]) return false;
 
   const totalSum = digits.slice(0, 10).reduce((acc, digit) => acc + digit, 0);
   if (totalSum % 10 !== digits[10]) return false;
 
   return true;
 }