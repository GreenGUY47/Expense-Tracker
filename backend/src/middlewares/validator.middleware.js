import { z } from "zod";

const validator = (schema) => {
  return (req, res, next) => {
    const result = schema.safeparse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten(),
      });
    }
    req.body = result.data;
    next();
  };
};

export default validator;
