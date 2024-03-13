import { ValidationChain, check } from "express-validator";

import { getFieldValidationMessage } from "../helpers";
import {
  INPUT_TYPE_MAX_LENGTH,
  INPUT_TYPE_MIN_LENGTH,
} from "../constants/validations";

export const validatePost = (): ValidationChain[] => [];
