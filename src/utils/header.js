
const getToken = JSON.parse(window.sessionStorage.getItem('admin')) ? JSON.parse(window.sessionStorage.getItem('admin')).jwt : null;
// console.log(getToken);
export const headers = {
  'Authorization': `Bearer ${getToken}`
};
