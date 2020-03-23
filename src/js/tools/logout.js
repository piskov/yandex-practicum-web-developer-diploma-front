/**
 * Deletes user’s auth cookie, redirects to home page.
 */
export default function logout() {
  localStorage.removeItem('token');
  window.location.replace("./");
}
