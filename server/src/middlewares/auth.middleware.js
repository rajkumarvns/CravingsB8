export const AuthProtect = async (req, res, next) => {
  try {
    //logics
  } catch (error) {
    console.log(error.message);

    const error = new Error("error at middleware");
    error.statusCode || 500;
    next(error);
  }
};
