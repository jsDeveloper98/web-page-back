import { ValidationChain, check } from "express-validator";

import { getFieldValidationMessage } from "@/helpers";
import {
  INPUT_TYPE_MAX_LENGTH,
  INPUT_TYPE_MIN_LENGTH,
} from "@/constants/validations";

export const validateRegister = (): ValidationChain[] => [
  check("email", getFieldValidationMessage("Email", "invalid"))
    .normalizeEmail()
    .isEmail(),
  check("password", getFieldValidationMessage("Password", "input")).isLength({
    min: INPUT_TYPE_MIN_LENGTH,
    max: INPUT_TYPE_MAX_LENGTH,
  }),
];
