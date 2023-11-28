import { Injectable } from "@nestjs/common";
import { Candidates } from "@prisma/client";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CandidatesService {
    constructor(private prisma:PrismaService) {

    }

    async getAllCandidates({offset, limit}:PaginationQueryDto): Promise<any> {

        const [data, count] = await this.prisma.$transaction([
            this.prisma.candidates.findMany({
                skip: offset > 0 && typeof offset == 'number'? offset : 0, 
                take: limit > 0  && typeof limit == 'number' ? limit : 1000 
            }),
            this.prisma.candidates.count()
          ]);
        
          return {
            count,
            data
        }

       
        
    }

    async getCandidateById(id: number): Promise<Candidates> {
        return await this.prisma.candidates.findUnique({
            where: {
                id: id
            }
        })
    }

    async createCandidate(data: Candidates): Promise<Candidates> {
        return await this.prisma.candidates.create({
            data
        })
    }

    async updateCandidate(id: number, data: Candidates): Promise<Candidates> {
        return await this.prisma.candidates.update({
                where: {
                    id: id
                },
                data
            })
    }

    
    async deleteCandidate(id: number): Promise<Candidates> {
        await this.prisma.votes.deleteMany({
            where: {
                id
            }
        })
        return await this.prisma.candidates.delete({
            where: {
                id: id
            }
        })
    }
} 