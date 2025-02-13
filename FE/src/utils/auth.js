// Đoạn mã JavaScript, loại bỏ TypeScript types và interface

export const LocalStorageEventTarget = new EventTarget();

// Lưu trữ Access Token vào localStorage
export const setAccessTokenToLS = (access_token) => {
  localStorage.setItem('access_token', access_token);
};

// Lưu trữ Refresh Token vào localStorage
export const setRefreshTokenToLS = (refresh_token) => {
  localStorage.setItem('refresh_token', refresh_token);
};

// Xóa tất cả dữ liệu khỏi localStorage
export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('profile');
  
  // Tạo sự kiện để thông báo rằng localStorage đã được xóa
  const clearLSEvent = new Event('clearLS');
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

// Lấy Access Token từ localStorage
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || '';

// Lấy Refresh Token từ localStorage
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || '';

// Lấy thông tin người dùng từ localStorage
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile');
  return result ? JSON.parse(result) : null;
};

// Lưu trữ thông tin người dùng vào localStorage
export const setProfileToLS = (profile) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};
