import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import slugify from "slugify";

const prisma = new PrismaClient();

export const createEvent = async (req: Request, res: Response) => {
    const { name, details, maximumAttendees } = req.body;

    if(!name || !details || !maximumAttendees){
        return res.status(400).json({ message: 'todos os campos são obrigatório' });
    }

    const slug = slugify(name, {lower: true}); //criando slug do evento

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

export const getEvents = async (req: Request, res: Response) => {

    try{
        const events = await prisma.event.findMany();

        return res.status(400).json({ message: events }); 
    }catch(err){
        console.log(err);
    }
}

export const getEventBySlug = async  (req: Request, res: Response) => {
    const { slug } = req.params;

    try{
        const eventBySlug = await prisma.event.findUnique({
            where: { slug }
        })

        //se achar o evento pelo slug, retorna o evento
        if(eventBySlug){
            const { slug, ...eventWithoutSlug } = eventBySlug; //tirar o slug da data retornada pro client
            return res.status(200).json({ message: eventWithoutSlug })
        }

        return res.status(404).json({ message: 'evento não encontrado.' })
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'erro no servidor.' })
    }
}