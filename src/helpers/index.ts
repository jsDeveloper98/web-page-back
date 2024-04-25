import multer, { Multer } from "multer";
import {
  INPUT_TYPE_MAX_LENGTH,
  INPUT_TYPE_MIN_LENGTH,
  TEXTAREA_TYPE_MAX_LENGTH,
  TEXTAREA_TYPE_MIN_LENGTH,
} from "../constants/validations";

export const getFieldValidationMessage = (
  fieldName: string,
  type: "input" | "invalid" | "required" | "textarea"
): string => {
  return {
    invalid: () => `${fieldName} is not valid`,
    required: () => `${fieldName} is required`,
    input: () =>
      `${fieldName} length should be between ${INPUT_TYPE_MIN_LENGTH} and ${INPUT_TYPE_MAX_LENGTH}`,
    textarea: () =>
      `${fieldName} length should be between ${TEXTAREA_TYPE_MIN_LENGTH} and ${TEXTAREA_TYPE_MAX_LENGTH}`,
  }[type]();
};

export const getUpload = (): Multer => {
  return multer({ storage: multer.diskStorage({}) });
};
