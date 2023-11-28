import { Module } from "@nestjs/common";
import { CountService } from "./count.service";
import { CountController } from "./count.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module(
    {
        providers: [CountService],
        controllers: [CountController],
        imports: [PrismaModule]
    }
)

export class CountModule {
    
}