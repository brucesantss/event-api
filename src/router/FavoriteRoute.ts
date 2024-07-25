import { Router } from "express";
import { AddFavorite } from "../controllers/FavoriteController";

const router = Router();

router
    .post('/event/favorite', AddFavorite)


export default router;