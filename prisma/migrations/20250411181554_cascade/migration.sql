-- DropForeignKey
ALTER TABLE "Checkin" DROP CONSTRAINT "Checkin_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Checkin" DROP CONSTRAINT "Checkin_studentCpf_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_advisorCpf_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_checkinId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_advisorCpf_fkey";

-- DropForeignKey
ALTER TABLE "ProjectStudent" DROP CONSTRAINT "ProjectStudent_scholarshipStudentCpf_fkey";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_advisorCpf_fkey" FOREIGN KEY ("advisorCpf") REFERENCES "Advisor"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStudent" ADD CONSTRAINT "ProjectStudent_scholarshipStudentCpf_fkey" FOREIGN KEY ("scholarshipStudentCpf") REFERENCES "Student"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_studentCpf_fkey" FOREIGN KEY ("studentCpf") REFERENCES "Student"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_checkinId_fkey" FOREIGN KEY ("checkinId") REFERENCES "Checkin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_advisorCpf_fkey" FOREIGN KEY ("advisorCpf") REFERENCES "Advisor"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;
