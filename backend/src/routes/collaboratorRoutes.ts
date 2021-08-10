import { Router } from "express";

import CollaboratorController from "../controllers/collaboratorController";

const router = Router();

const collaboratorController = new CollaboratorController();

router.get("/", collaboratorController.index);
router.get("/:id", collaboratorController.show);
router.post("/:id", collaboratorController.create);
router.put("/:id", collaboratorController.update);

export default router;
