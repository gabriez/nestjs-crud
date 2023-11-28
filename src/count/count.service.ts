import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

class DataWorst {
    id: number
    name: string
    color: string
    quantity: number
 
    constructor(id:number, name:string = '', color:string = '') {
        this.id = id
        this.quantity = 1;
        this.name = name;
        this.color = color;
    }
}

class  DataBest {
    id: number
    name: string
    color: string
    quantity: number
    constructor(id:number, name: string = '', color: string = '') {
 
        this.id = id
        this.quantity = 1;
        this.name = name;
        this.color = color;
    }
}

@Injectable()
export class CountService {
    constructor(private prisma:PrismaService) {}

    async getAllVotes(): Promise<any> {
       const data = await this.prisma.votes.findMany({
                include: {
                    worstcandidate: {
                        select: {
                            name: true,
                            color: true,
                            id: true
                        }
                    },
                    bestcandidate: {
                        select: {
                            name: true,
                            color: true,
                            id: true
                        }
                    }
                }
            });

          

        return data
    }
}