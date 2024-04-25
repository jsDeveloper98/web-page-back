import { ValidationChain, check } from "express-validator";

import { getFieldValidationMessage } from "../helpers";
import {
  INPUT_TYPE_MAX_LENGTH,
  INPUT_TYPE_MIN_LENGTH,
  TEXTAREA_TYPE_MAX_LENGTH,
  TEXTAREA_TYPE_MIN_LENGTH,
} from "../constants/validations";

export const validateProduct = (): ValidationChain[] => [
  check("title", getFieldValidationMessage("Title", "input")).isLength({
    min: INPUT_TYPE_MIN_LENGTH,
    max: INPUT_TYPE_MAX_LENGTH,
  }),
  check(
    "description",
    getFieldValidationMessage("Description", "textarea")
  ).isLength({
    max: TEXTAREA_TYPE_MAX_LENGTH,
    min: TEXTAREA_TYPE_MIN_LENGTH,
  }),
];
