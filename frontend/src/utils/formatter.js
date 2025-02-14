export const formatPhone = (phone) => {
    let cleaned = phone.replace(/\D/g, ''); 
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };


// export const formatPhonee = (phone) => {
//   if (phone.length > 10) {
//     return phone.substring(0, 10);
//   }
//   return phone;
// };