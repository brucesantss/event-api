import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";

const prisma = new PrismaClient();

export const AddFavorite = async (req: Request, res: Response) => {
    const { eventId, email } = req.body;

    try {
        
        const userFind = await prisma.user.findUnique({ where: {email} })
        if(!userFind){
            return res.status(404).json({ message: 'usuário não encontrado.' })
        }
        
        const eventFind = await prisma.event.findUnique({ where: {id: eventId} })
        if(!eventFind){
            return res.status(404).json({ message: 'evento não encontrado.' })
        }

        const favorite = await prisma.favorite.create({
            data: {
                userId: userFind.id,
                eventId: eventFind.id
            },
        })

        return res.status(201).json({ message: 'evento adicionado como favorito.', favorite })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'não foi possível adicionar favorito.' })
        
    }
}