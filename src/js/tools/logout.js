/**
 * Deletes user’s auth cookie, redirects to home page.
 */
export default function logout() {
  // not enough time to implement token in the local storage
  // so we use cookie-based js accessible (thus, unsafe) authorization mechanic
  document.cookie = 'token=; Max-Age=0';
  window.location.replace("./");
}
