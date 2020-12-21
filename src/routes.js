import { Router } from "express";
const router = Router();
import { index } from "./controllers/ListAllDeals";
import { index as _index } from "./controllers/ListAllOrders";
import { index as __index } from "./controllers/ListWonDeals";
import { create } from "./controllers/CreateOrder";

router.get("/deals", index);
router.get("/deals/won", __index);

router.get("/orders", _index);
router.post("/orders", create);

export default router;
