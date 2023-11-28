import { Injectable } from "@nestjs/common";
import { Votes } from "@prisma/client";
import { PaginationQueryDto } from "src/dto/pagination-query.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class VotesService {
    constructor(private prisma:PrismaService) {}

    async getAllVotes({offset, limit}:PaginationQueryDto): Promise<any> {
        const [data, count] = await this.prisma.$transaction([
            this.prisma.votes.findMany({
                include: {
                    worstcandidate: {
                        select: {
                            name: true,
                            
                        }
                    },
                    bestcandidate: {
                        select: {
                            name: true,
                        }
                    }
                },
                skip: offset > 0 && typeof offset == 'number'? offset : 0, 
                take: limit > 0  && typeof limit == 'number' ? limit : 1000 
            }),
            this.prisma.votes.count()
          ]);
          

        return {
            count,
            data
        }
    }

    async createVote(data:Votes): Promise<Votes>{

        
    
        return await this.prisma.votes.create({
            data
        })
    }
}