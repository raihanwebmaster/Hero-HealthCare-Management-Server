/*
  Warnings:

  - You are about to drop the column `doctorSchedulesDoctorId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `doctorSchedulesScheduleId` on the `appointments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appointmentId]` on the table `doctor_schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_doctorSchedulesDoctorId_doctorSchedulesSchedu_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "doctorSchedulesDoctorId",
DROP COLUMN "doctorSchedulesScheduleId";

-- CreateIndex
CREATE UNIQUE INDEX "doctor_schedules_appointmentId_key" ON "doctor_schedules"("appointmentId");

-- AddForeignKey
ALTER TABLE "doctor_schedules" ADD CONSTRAINT "doctor_schedules_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
