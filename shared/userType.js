export default function getUserType() {
  let flag = sessionStorage.getItem('userType')
  return flag
}
