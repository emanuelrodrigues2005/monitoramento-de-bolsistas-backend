/*
  Warnings:

  - You are about to drop the `_StudentProjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StudentProjects" DROP CONSTRAINT "_StudentProjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentProjects" DROP CONSTRAINT "_StudentProjects_B_fkey";

-- DropTable
DROP TABLE "_StudentProjects";

-- CreateTable
CREATE TABLE "StudentProject" (
    "studentId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "StudentProject_pkey" PRIMARY KEY ("studentId","projectId")
);

-- AddForeignKey
ALTER TABLE "StudentProject" ADD CONSTRAINT "StudentProject_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProject" ADD CONSTRAINT "StudentProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
