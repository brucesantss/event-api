import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createEvent = async (req: Request, res: Response) => {
    const { name, details, slug, maximumAttendees } = req.body;

    if(!name || !details || !slug || !maximumAttendees){
        return res.status(400).json({ message: 'todos os campos são obrigatório' });
    }

    try{
        const event = await prisma.event.create({
            data: {
                name,
                details,
                slug,
                maximumAttendees
            }
        })

        console.log('novo evento: ' + event.details);

        return res.status(201).json({ message: 'evento criado!' })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'houve um erro :(', err })  
    }
}

export const getEvents = async  (req: Request, res: Response) => {

    try{
        const events = await prisma.event.findMany();

        return res.status(400).json({ message: events }); 
    }catch(err){
        console.log(err);
    }
}