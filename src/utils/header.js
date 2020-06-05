
const getToken = JSON.parse(window.sessionStorage.getItem('admin')) ? JSON.parse(window.sessionStorage.getItem('admin')).jwt : null;
// console.log(getToken);
export const headers = {
  // 'Access-Control-Allow-Origin': '*',
  'Authorization': `Bearer ${getToken}`
};
