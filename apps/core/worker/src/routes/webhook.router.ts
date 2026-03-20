import express from "express";
import { deployService } from "../deploy/core.deploy.js";

const router = express.Router();

router.post("/deploy", deployService);

export default router;
