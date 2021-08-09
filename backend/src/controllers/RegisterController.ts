import { Request, Response } from "express";
import database from "../database/list";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  techs: string[];
  status?: boolean;
}

class RegisterController {
  async create(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, cpf, phone, techs } = req.body;

    const collaboratorIndex = database.findIndex((collaborator) => {
      return collaborator.id === id;
    });

    if (collaboratorIndex > -1) {
      return res.status(400).json({ message: "CPF already registered." });
    }

    if ([name, email, cpf].every((item) => typeof item === "string")) {
      return res.status(400).json({ message: "Fields types incorrect" });
    }

    if (!Array.isArray(techs)) {
      return res
        .status(400)
        .json({ message: "Technologies type is not an Array." });
    }

    if (!techs.every((tech) => typeof tech === "string")) {
      return res
        .status(400)
        .json({ message: "Technologies item type is not string." });
    }

    const collaborator: Collaborator = {
      id,
      name,
      email,
      cpf,
      phone,
      techs,
    };

    try {
      database.push(collaborator);
      return res
        .status(201)
        .json({ message: "Collaborator registered succesfully", collaborator });
    } catch (err) {
      return res.status(500).json({ messsage: "Internal server error." });
    }
  }
}

export default RegisterController;
