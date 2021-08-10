import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Collaborator from "../database/models/Collaborator";
import checkCPFValidity from "../utils/checkCPFValidatity";
import checkEmailValidity from "../utils/checkEmailValidity";

class CollaboratorController {
  async index(req: Request, res: Response) {
    const repository = getRepository(Collaborator);
    try {
      const collaborators = await repository.find({
        order: { name: "ASC" },
      });
      return res.status(200).json({ collaborators });
    } catch (err) {
      return res.status(500).json({ messsage: "Internal server error." });
    }
  }

  async show(req: Request, res: Response) {
    const repository = getRepository(Collaborator);
    const { id } = req.params;
    try {
      const collaborator = await repository.findOne({ where: { id } });
      return res.status(200).json({ collaborator });
    } catch (err) {
      return res.status(500).json({ messsage: "Internal server error." });
    }
  }

  async create(req: Request, res: Response) {
    const repository = getRepository(Collaborator);
    const { id } = req.params;
    const { name, email, cpf, phone, techs } = req.body;

    try {
      const collaboratorAlreadyExists = await repository.findOne({
        where: [{ id }, { cpf }],
      });
      if (collaboratorAlreadyExists) {
        return res.status(409).json({ message: "CPF already registered." });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error." });
    }

    const isCPFValid = checkCPFValidity(
      String(cpf).replace(/\./g, "").replace(/-/g, "")
    );

    if (!isCPFValid) {
      return res.status(400).json({ message: "Invalid CPF" });
    }

    const isEmailValid = checkEmailValidity(email);

    if (!isEmailValid) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const collaboratorData = {
      id,
      name,
      email,
      cpf,
      phone,
      techs,
    };

    try {
      const collaborator = repository.create(collaboratorData);
      const createdCollaborator = await repository.save(collaborator);
      return res.status(201).json({
        message: "Collaborator registered succesfully",
        collaborator: createdCollaborator,
      });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  async update(req: Request, res: Response) {
    const repository = getRepository(Collaborator);
    const { id } = req.params;
    const { validate } = req.body;
    const validatedAt = new Date();

    const collaborator = await repository.findOne({ where: { id } });

    if (!collaborator) {
      return res.status(400).json({ message: "Collaborator not found." });
    }

    try {
      await repository.update(id, { status: validate, validatedAt });
      return res
        .status(200)
        .json({ message: "Collaborator status updated successfully." });
    } catch (err) {
      return res.status(500).json({ messsage: "Internal server error." });
    }
  }
}

export default new CollaboratorController();
