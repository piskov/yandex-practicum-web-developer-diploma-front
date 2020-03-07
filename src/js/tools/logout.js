/**
 * Deletes user’s auth cookie, redirects to home page.
 */
export default function logout() {
  document.cookie = 'token=; Max-Age=0';
  window.location.replace("./");
}
