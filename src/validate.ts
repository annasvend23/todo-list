import { charsLimit } from "./constants";

export const validate = (value: string) => {
  let formError: string = '';
  if (!value) {
    formError = 'Поле пустое. Заполните, пожалуйста.';
  } else if (value.length > charsLimit) {
    formError = `Превышен лимит текста задачи на ${
      value.length - charsLimit
    } символов`;
  } else if (value.length <= charsLimit) {
    formError = '';
  }
  return formError;
};
