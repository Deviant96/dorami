/*
  Warnings:

  - Added the required column `userId` to the `JobProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobProgress" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "JobProgress" ADD CONSTRAINT "JobProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
