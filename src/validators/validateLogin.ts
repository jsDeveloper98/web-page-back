import { ValidationChain, check } from "express-validator";

import { getFieldValidationMessage } from "@/helpers";

export const validateLogin = (): ValidationChain[] => [
  check("password", getFieldValidationMessage("Password", "required")).exists(),
  check("email", getFieldValidationMessage("Email", "invalid"))
    .normalizeEmail()
    .isEmail(),
];
