import { Module } from '@nestjs/common';
import { CandidatesModule } from './candidates/candidates.module';
import { VotesModule } from './votes/votes.module';
import { CountModule } from './count/count.module';


@Module({
  imports: [CandidatesModule, VotesModule, CountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
