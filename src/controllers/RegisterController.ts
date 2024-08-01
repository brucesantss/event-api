import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    const { name, email, pass } = req.body;

    try {

        if(!name || !email || !pass){
            return res.status(400).json({ message: 'todos os campos são obrigatários.' })
        }

        const existUser = await prisma.user.findUnique({ where: {email} })
        if(existUser){
            return res.status(400).json({ message: 'esse email já está sendo usado.' })
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                pass
            }
        })

        return res.status(201).json({ message: 'usuário criado', user })
    } catch (err) {
        console.log(err);  
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        
        const users = await prisma.user.findMany({include: {favorites: true}});

        return res.status(200).json({ message: users }) 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'erro no servidor.' })
    }
}

