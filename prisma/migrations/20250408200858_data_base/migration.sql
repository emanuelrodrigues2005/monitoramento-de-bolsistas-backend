/*
  Warnings:

  - You are about to drop the column `scholarshipStudent` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Advisor` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `researchGrant` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "scholarshipStudent";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "researchGrant",
ADD COLUMN     "researchGrant" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Advisor";

-- CreateTable
CREATE TABLE "_StudentProjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StudentProjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StudentProjects_B_index" ON "_StudentProjects"("B");

-- AddForeignKey
ALTER TABLE "_StudentProjects" ADD CONSTRAINT "_StudentProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentProjects" ADD CONSTRAINT "_StudentProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;
