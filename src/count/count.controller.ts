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
        if (data.length > 0 ) {  
            let countBest = [new DataBest(data[0].bestcandidate.id, data[0].bestcandidate.name, data[0].bestcandidate.color)]  
            let countWorst = [new DataWorst(data[0].worstcandidate.id, data[0].worstcandidate.name, data[0].worstcandidate.color, )];
            let testArray = [...data]
                
            for (let i = testArray.length - 1; 0 <= i; i--) {
                for (let j = 0 ; j < countBest.length; j++ ) {
                    if (countBest[j].id === testArray[i].bestcandidate.id ) {
                        countBest[j].quantity += 1;
                    } else {
                        countBest.push(new DataBest(testArray[i].bestcandidate.id, testArray[i].bestcandidate.name, testArray[i].bestcandidate.color))
                    }
                }
                for (let j = 0 ; j < countWorst.length; j++ ) {
                if (countWorst[j].id === testArray[i].worstcandidate.id) {
                        countWorst[j].quantity += 1;
                    } else  {
                        countWorst.push(new DataBest(testArray[i].worstcandidate.id, testArray[i].worstcandidate.name, testArray[i].worstcandidate.color))
                    }
                }
            }  
            let dataToReturn = {countWorst: [], countBest: []}
            for (let i = 0; i < countWorst.length; i++){
                if (!dataToReturn.countWorst.some(item => item.id == countWorst[i].id)) {
                    dataToReturn.countWorst.push(countWorst[i]) 
                    }
                }
                for (let i = 0; i < countBest.length; i++){
                if (!dataToReturn.countBest.some(item => item.id == countBest[i].id)) {
                    dataToReturn.countBest.push(countBest[i])
                }
            }
            return dataToReturn
        }
        return []
   }
}