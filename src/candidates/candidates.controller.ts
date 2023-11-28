import {Controller, Get, Post, Delete, Put, Body, Param, NotFoundException, InternalServerErrorException, BadRequestException, Query } from '@nestjs/common'
import { CandidatesService } from './candidates.service'
import { Candidates } from '@prisma/client'
import { compareEntriesNames } from 'src/lib/helper'
import { PaginationQueryDto } from 'src/dto/pagination-query.dto'

@Controller('candidates')
export class CandidatesController {
    constructor(private readonly CandidatesService:CandidatesService){

    }

    @Get()
    async getAllCandidates(@Query() {limit, offset}:PaginationQueryDto){
        const data = await this.CandidatesService.getAllCandidates({limit: Number(limit), offset: Number(offset)})
        return data
    }

    @Post()
    async createCandidate(@Body() data:Candidates){
        const dataInArray = Object.entries(data);
        const fieldsNames = ['color', 'name'];
        const fieldsRegex = /(color|name)/

        if (dataInArray.length == 0) throw new BadRequestException('El request body está vacío');
        if (Object.values(data).includes('')) throw new BadRequestException('Un campo está vacío')
        if(!dataInArray.every( compare =>  fieldsRegex.test(compare[0]))) throw new BadRequestException('Hay un campo extra a los que se deben pasar');
        if(dataInArray.every( compare => fieldsRegex.test(compare[0]))) {
            const missing = fieldsNames.map( word => compareEntriesNames(dataInArray, word) ?? '' ).filter(word => word.length !== 0)            
            if (missing.length > 0) throw new BadRequestException(`Faltan los siguientes campos: ${missing.join(', ')}`)
        }

        try {
            const response = await this.CandidatesService.createCandidate(data)
            return response
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    @Get(':id')
    async getCandidateById(@Param('id') id:string){
            const data = await this.CandidatesService.getCandidateById(Number(id))
            if (!data) throw new NotFoundException('El candidato solicitado no existe')
            return data
    }

    @Put(':id')
    async updateCandidateById(@Param('id') id:string, @Body() data:Candidates){
        const dataInArray = Object.entries(data);
        const fieldsRegex = /(color|name)/

        if (dataInArray.length == 0) throw new BadRequestException('No hay datos para actualizar');
        if (Object.values(data).includes('')) throw new BadRequestException('Un campo está vacío')
        if(!dataInArray.every( compare =>  fieldsRegex.test(compare[0]))) throw new BadRequestException('El campo que desea actualizar no existe');



        try {
            return await this.CandidatesService.updateCandidate(Number(id), data)
        } catch (error) {
            throw new NotFoundException('El candidato que desea actualizar no existe')
            
        }
    }

    @Delete(':id')
    async deleteCandidateById(@Param('id') id:string){
        try {
             await this.CandidatesService.deleteCandidate(Number(id)) 
            return {message: 'El candidato fue eliminado exitosamente'}
        } catch (error) {
            console.log(error)
            throw new NotFoundException('El candidato que desea eliminar no existe')
        }
    }

}