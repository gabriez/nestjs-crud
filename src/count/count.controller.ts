import {Controller, Get} from "@nestjs/common";
import { Prisma, Votes } from "@prisma/client";

import { CountService } from "./count.service";
// import { PrismaService } from "src/prisma/prisma.service";

class DataWorst {
    id: number
    name: string
    color: string
    quantity: number
 
    constructor(id:number, name:string = '', color:string = '') {
        this.id = id
        this.quantity = 0;
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
        this.quantity = 0;
        this.name = name;
        this.color = color;
    }
}

@Controller('count')
export class CountController {
    constructor(private readonly CountService:CountService) {        
    }
   @Get()
   async getCount() {
        const data = await this.CountService.getAllVotes()
        // Algorithm to count data
        if (data.length > 0 ) {  
            let countBest = [new DataBest(data[0].bestcandidate.id, data[0].bestcandidate.name, data[0].bestcandidate.color)]  
            let countWorst = [new DataWorst(data[0].worstcandidate.id, data[0].worstcandidate.name, data[0].worstcandidate.color, )];
            let copiedData = [...data]

            copiedData.forEach( (copy) => {
                countBest.forEach(item => {
                    if (item.id === copy.bestcandidate.id && countBest.some(best => best.id == item.id)) {
                        item.quantity += 1;
                    } else {
                        countBest.push(new DataBest(copy.bestcandidate.id, copy.bestcandidate.name, copy.bestcandidate.color))
                    }
                })
                countWorst.forEach(item => {
                    if (item.id === copy.worstcandidate.id && countWorst.some(best => best.id == item.id)) {
                        item.quantity += 1;
                    } else {
                        countWorst.push(new DataBest(copy.worstcandidate.id, copy.worstcandidate.name, copy.worstcandidate.color))
                    }
                })
            })
            return {countWorst, countBest}
        }
        return []
   }
}