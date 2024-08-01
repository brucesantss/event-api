import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import slugify from "slugify";

const prisma = new PrismaClient();

//criar novo evento
export const createEvent = async (req: Request, res: Response) => {
    const { name, details, maximumAttendees, location, date } = req.body;

    if(!name || !details || !maximumAttendees || !date || !location){
        return res.status(400).json({ message: 'todos os campos são obrigatório' });
    }

    const slug = slugify(name, {lower: true}); //criando slug do evento

    try{
        const event = await prisma.event.create({
            data: {
                name,
                details,
                slug,
                maximumAttendees,
                location,
                date: new Date(date)
            }
        })

        console.log('novo evento: ' + event.details);

        return res.status(201).json({ message: 'evento criado!' })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'houve um erro :(', err })  
    }
}
//buscar todos os eventos
export const getEvents = async (req: Request, res: Response) => {

    try{
        const events = await prisma.event.findMany();

        if(events.length <= 0){
            return res.status(400).json({ message: 'nenhum evento.' }); 
        }

        return res.status(200).json({ message: events }); 
    }catch(err){
        console.log(err);
    }
}
//buscar evento pelo slug
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
//atualizar evento
export const updateEvent = async  (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, details, maximumAttendees } = req.body;

    try{
        const eventUpdate = await prisma.event.update({
            where: {
                id
            },
            data: {
                name,
                details,
                maximumAttendees
            }
        })

        return res.status(200).json({ message: 'evento atualizado.', eventUpdate })
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'erro no servidor.' })
    }
}
//deletar evento
export const deleteEvent = async  (req: Request, res: Response) => {
    const { id } = req.params;

    try{

        // deletar registros relacionados na tabela Favorite
        await prisma.favorite.deleteMany({
            where: { eventId: id }
        });

        const eventDelete = await prisma.event.delete({
            where: {id: id}
        })

        if(!eventDelete){
            return res.status(404).json({ message: 'evento não encontrado.' })
        }

        return res.status(200).json({ message: 'evento deletado.', eventDelete })
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'erro no servidor.', err })
    }
}

