-- CreateTable
CREATE TABLE "Candidates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votes" (
    "id" SERIAL NOT NULL,
    "bestCandidate" INTEGER NOT NULL,
    "worstCandidate" INTEGER NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_bestCandidate_fkey" FOREIGN KEY ("bestCandidate") REFERENCES "Candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_worstCandidate_fkey" FOREIGN KEY ("worstCandidate") REFERENCES "Candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
