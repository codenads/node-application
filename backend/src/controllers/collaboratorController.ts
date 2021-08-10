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

class CollaboratorController {
  async index(req: Request, res: Response) {
    try {
      const collaborators = database;
      return res.status(200).json({ collaborators });
    } catch (err) {
      return res.status(500).json({ messsage: "Internal server error." });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const collaboratorIndex = database.findIndex((collaborator) => {
      return collaborator.id === id;
    });

    try {
      const collaborator = database[collaboratorIndex];
      return res.status(200).json({ collaborator });
    } catch (err) {
      return res.status(500).json({ messsage: "Internal server error." });
    }
  }

  async create(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, cpf, phone, techs } = req.body;

    const collaboratorIndex = database.findIndex((collaborator) => {
      return collaborator.id === id || collaborator.cpf === cpf;
    });

    if (collaboratorIndex > -1) {
      return res.status(400).json({ message: "CPF already registered." });
    }

    if (![name, email, cpf].every((item) => typeof item === "string")) {
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

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { validate } = req.body;

    const collaboratorIndex = database.findIndex((collaborator) => {
      return collaborator.id === id;
    });

    if (collaboratorIndex === -1) {
      return res.status(400).json({ message: "Collaborator not found." });
    }

    try {
      database[collaboratorIndex] = {
        ...database[collaboratorIndex],
        status: validate,
        validatedAt: new Date(),
      };
      return res
        .status(200)
        .json({ message: "Collaborator status updated successfully." });
    } catch (err) {
      return res.status(500).json({ messsage: "Internal server error." });
    }
  }
}

export default CollaboratorController;
