import { userService } from "../services/user.service.js";

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getById({ id });

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const user = await userService.create({
        user: req.body,
      });

      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.update({ id, user: req.body });

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }
}

export const userController = new UserController();
