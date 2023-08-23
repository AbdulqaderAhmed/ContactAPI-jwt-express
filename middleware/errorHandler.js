import { constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
  const STATUS_CODE = res.statusCode ? res.statusCode : 500;
  switch (STATUS_CODE) {
    case constants.UNAUTORIZED:
      res.json({
        title: "Unautorized!",
        message: err.message,
      });
      break;
    case constants.BAD_REQUEST:
      res.json({
        title: "Validation error!",
        message: err.message,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Page not found!",
        message: err.message,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server error!",
        message: err.message,
      });
      break;
    case constants.DUPILICATE:
      res.json({ title: "Duplicate record!", message: err.message });
    default:
      console.log("No error found!");
      break;
  }
};

export default errorHandler;
