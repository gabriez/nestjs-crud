import {Controller, Get, Body, Post, BadRequestException, InternalServerErrorException, Query } from "@nestjs/common";
import { Prisma, Votes } from "@prisma/client";
import { VotesService } from "./votes.service";
import { compareEntriesNames } from "src/lib/helper";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";
// import { PrismaService } from "src/prisma/prisma.service";

@Controller('votes')
export class VotesController {
    constructor(private readonly VotesService:VotesService) {        
    }
    @Get()
    async getAllVotes(@Query() {limit, offset}:PaginationQueryDto) {
        const data = await this.VotesService.getAllVotes({limit: Number(limit), offset: Number(offset)})
        return data;
    }
    @Post()
    async createVote(@Body() data:Votes){
        // Definición de constantes que se usarán en el método para las validaciones
        const fieldsRegex = /(bestCandidate|bestCDescription|worstCandidate|worstCDescription|email|media)/;
        const fieldsNames = [
            'bestCandidate', 'bestCDescription', 'worstCandidate', 'worstCDescription', 'email','media'
        ]
        const dataInArray = Object.entries(data);
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

        // Validaciones realizadas a la información
        if (dataInArray.length == 0) throw new BadRequestException('El request body está vacío');

        if (!dataInArray.every( compare => fieldsRegex.test(compare[0]))) {
               throw new BadRequestException('Hay un campo extra a los que se deben pasar');
            } 
        if(dataInArray.every( compare => fieldsRegex.test(compare[0]))) {
            const missing = fieldsNames.map( word => compareEntriesNames(dataInArray, word) ?? '' ).filter(word => word.length !== 0)
            if (missing.length > 0) throw new BadRequestException(`Faltan los siguientes campos: ${missing.join(', ')}`)
        }

        if(typeof data.bestCandidate != 'number' || typeof data.worstCandidate != 'number' ) throw new BadRequestException('bestCandidate y worstCandidate solo acepta números')
        if(data.bestCDescription.length > 300 || data.worstCDescription.length > 300)  throw new BadRequestException('Las descripciones no pueden tener más de 300 carácteres')
        if(data.bestCDescription.length < 10 || data.worstCDescription.length < 10)  throw new BadRequestException('Las descripciones no pueden tener menos de 10 carácteres')
        if(!regexEmail.test(data.email)) throw new BadRequestException('El email que introdujo no es válido')


        try {
            return await this.VotesService.createVote(data)
        } catch (error) {
            // Manejando excepciones que retorna Prisma o algún error en la red
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002' && error.meta.target[0] === 'email') {
                    throw new BadRequestException('No se puede votar con este correo')
                }
                if (error.code  === 'P2003' && error.meta.field_name === '(not available)'){
                    throw new BadRequestException('El valor de worstCandidate o bestCandidate no existe')
                }
              }
            throw new InternalServerErrorException()


        }
    }
}
