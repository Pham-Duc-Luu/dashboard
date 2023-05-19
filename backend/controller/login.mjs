import UserModal from "../models/user.mjs";

export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModal.find({
      email,
      password,
    });

    if (user[0]) {
      res.status(200).json({ errCode: 0, user: user[0] });
    } else {
      res.status(200).json({ errCode: 1 });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
