import jwtDecode from "jwt-decode";


/**
 * Giải mã token JWT
 * @param {string | null} token
 * @returns {Object | null} TokenDecode object
 */
export const decodeToken = (token) => {
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

/**
 * Lấy role từ token JWT
 * @param {string | null} token
 * @returns {string | null} Role từ token hoặc null nếu không hợp lệ
 */
export const getUserRoleFromToken = (token) => {
  const decoded = decodeToken(token);
  return decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
};
