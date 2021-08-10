import { Router } from "express";

import CollaboratorController from "../controllers/CollaboratorController";

const router = Router();

router.get("/", CollaboratorController.index);
router.get("/:id", CollaboratorController.show);
router.post("/:id", CollaboratorController.create);
router.put("/:id", CollaboratorController.update);

export default router;
