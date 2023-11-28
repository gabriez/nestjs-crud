import {Module} from '@nestjs/common'
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [CandidatesService],
    controllers: [CandidatesController],
    imports: [PrismaModule]
})

export class CandidatesModule {

}