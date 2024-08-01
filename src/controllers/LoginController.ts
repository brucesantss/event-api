import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
    const { email, pass } = req.body;

    try{

        //todos os campos são obrigatórios
        if(!email || !pass){
            return res.status(400).json({ message: 'todos os campos são obrigatórios.' })
        }

        //verifica se o usuário existe por email
        const findUserByEmail = await prisma.user.findUnique({
            where: {email: email}
        }) 
        if(!findUserByEmail){
            return res.status(404).json({ message: 'usuário não encontrado.' })
        }

        console.log(findUserByEmail);
        
        if(findUserByEmail.pass !== pass){
            return res.status(400).json({ message: 'senha incorreta.' })
        }

        return res.status(200).json({ message: `${findUserByEmail.name} entrou na conta.` })

    }catch(err){
        console.log(err);
        
    }
}

