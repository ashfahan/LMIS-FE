export default function auth() {
  let _flag = false
  if (sessionStorage.getItem('userToken')?.length > 0) _flag = true
  return _flag
}
