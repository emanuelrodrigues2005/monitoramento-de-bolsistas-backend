-- DropForeignKey
ALTER TABLE "ProjectStudent" DROP CONSTRAINT "ProjectStudent_projectId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectStudent" ADD CONSTRAINT "ProjectStudent_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
