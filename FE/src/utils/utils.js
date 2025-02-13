import axios from 'axios';

import HttpStatusCode from '../constants/httpStatusCode.enum';
import { useSearchParams } from 'react-router-dom';


// import userImage from 'src/assets/images/user.svg';

export const LocalStorageEventTarget = new EventTarget();

// Kiểm tra xem có phải là lỗi từ Axios hay không
export function isAxiosError(error) {
  return axios.isAxiosError(error);
}

// Kiểm tra lỗi 422 (Unprocessable Entity) từ Axios, lỗi sai kiểu dữ liệu
export function isAxiosUnprocessableEntityError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

// Kiểm tra lỗi 401 (Unauthorized) từ Axios
export function isAxiosUnauthorizedError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
}

// Kiểm tra lỗi hết hạn token từ Axios
export function isAxiosExpiredTokenError(error) {
  return (
    isAxiosUnauthorizedError(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  );
}

// Định dạng số thành tiền tệ
export function formatCurrency(currency) {
  return new Intl.NumberFormat('de-DE').format(currency);
}

// Định dạng số theo kiểu social (compact)
export function formatNumberToSocialStyle(value) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase();
}

// Tính toán tỷ lệ giảm giá
export const rateSale = (original, sale) => Math.round(((original - sale) / original) * 100) + '%';

// Loại bỏ ký tự đặc biệt trong chuỗi
const removeSpecialCharacter = (str) =>
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  );

// Tạo tên ID từ tên và ID
export const generateNameId = ({ name, id }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`;
};

// Lấy ID từ chuỗi tên ID
export const getIdFromNameId = (nameId) => {
  const arr = nameId.split('-i-');
  return arr[arr.length - 1];
};

export const useQueryString = () => {
  const [searchParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...searchParams])
  return searchParamsObject
}
// // Lấy URL ảnh đại diện
// export const getAvatarUrl = (avatarName) =>
//   avatarName ? `${config.baseUrl}images/${avatarName}` : userImage;
