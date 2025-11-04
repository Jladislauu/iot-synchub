// src/routes/deviceRoutes.ts (ATUALIZAR)
import { Router } from "express";
import {
  createDevice,
  listDevices,
  toggleStatus,
} from "../controllers/deviceController";
import { validate } from "../middlewares/validate";
import { createDeviceSchema } from "../services/validationSchema";
import { auth } from "../middlewares/auth";  // ← IMPORTAR
import { Server } from "socket.io";

const deviceRoutes = (io: Server) => {
  const router = Router();

  // 🛡️ TODAS AS ROTAS PROTEGIDAS
  router.post("/", auth, validate(createDeviceSchema), (req, res) =>
    createDevice(req, res, io)
  );
  router.get("/", auth, listDevices);
  router.patch("/:id/status", auth, (req, res) => toggleStatus(req, res, io));

  return router;
};

export default deviceRoutes;