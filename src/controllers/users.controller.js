module.exports = class UsersController {
  constructor({ service, logger }) {
    this.service = service;
    this.logger = logger;
  }

  signUp = async (req, res) => {
    try {
      const { email, password } = req.body;

      const param = { email, password };
      const statusCode = await this.service.signUp(param);

      res.status(statusCode).json({
        message: "회원가입 되었습니다.",
      });
    } catch (err) {
      this.logger.err(err.message);

      res.status(err.statusCode).json({
        message: err.message,
      });
    }
  };

  logIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      const param = { email, password };
      const token = await this.service.logIn(param);

      res.cookie("token", token, {
        maxAge: 15 * 60 * 1000, // 15m
        httpOnly: true,
      });
      res.json({
        message: "로그인 되었습니다.",
      });
    } catch (err) {
      this.logger.err(err.message);

      res.status(err.statusCode).json({
        message: err.message,
      });
    }
  };

  postResetPassword = async (req, res) => {
    try {
      const { email } = req.body;

      const param = { email };
      await this.service.postResetPassword(param);

      res.json({
        message: "비밀번호 초기화가 요청 되었습니다.",
        email,
      });
    } catch (err) {
      this.logger.err(err.message);

      res.status(err.statusCode).json({
        message: err.message,
      });
    }
  };

  putResetPassword = async (req, res) => {
    try {
      const { email, password } = req.body;

      const param = { email, password };
      await this.service.putResetPassword(param);

      res.json({
        message: "비밀번호 초기화 되었습니다.",
      });
    } catch (err) {
      this.logger.err(err.message);

      res.status(err.statusCode).json({
        message: err.message,
      });
    }
  };
};
