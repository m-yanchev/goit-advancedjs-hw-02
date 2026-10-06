import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const COMMON_PROPS = {
  class: 'message',
  titleSize: '16px',
  titleLineHeight: '150%',
  messageSize: '16px',
  messageLineHeight: '150%',
  theme: 'dark',
};

export const showSuccessMessage = message => {
  iziToast.success({
    ...COMMON_PROPS,
    title: 'OK',
    message: message,
    backgroundColor: '#59a10d',
  });
};

export const showErrorMessage = message => {
  iziToast.error({
    ...COMMON_PROPS,
    title: 'Error',
    message: message,
    backgroundColor: '#ef4040',
  });
};