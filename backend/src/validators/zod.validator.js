const validator = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          errors: result.error.flatten(),
        });
      }

      req.body = result.data;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validator;
