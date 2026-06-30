export const AuthProtect = async (req, res, next) => {
  try {
    //logics
    next();
  } catch (error) {
    console.log(error.message);

    const err = new Error("Error at Authentication Middleware");
    err.statusCode = 500;

    next(err);
  }
};
