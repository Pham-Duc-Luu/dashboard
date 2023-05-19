import UserModal from "../models/user.mjs";
import getCountryISO3 from "country-iso-2-to-3";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(200).json({
        errCode: 1,
        message: "Missing parameters",
      });
    }
    const user = await UserModal.findById(id);
    if (user) {
      res.status(200).json({
        errCode: 0,
        message: "successful",
        data: { ...user },
      });
    }
  } catch (error) {
    res.status(404).json({ errCode: -1, message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const all_users = await UserModal.find();

    const tempo = all_users.reduce((acc, obj) => {
      const isExist = acc.find((item) => item.id == obj.country);

      if (!isExist) {
        acc.push({ id: obj.country, value: 0 });
      }
      return acc;
    }, []);

    let data = [];

    for (const item of all_users) {
      for (const value of tempo) {
        if (item.country === value.id) {
          value.value++;
          break;
        }
      }
    }

    for (const items of tempo) {
      items.id = getCountryISO3(items.id);
    }

    res.status(200).json({ errCode: 0, data: tempo });
  } catch (error) {
    res.status(404).json({ errCode: -1, message: error.message });
  }
};
