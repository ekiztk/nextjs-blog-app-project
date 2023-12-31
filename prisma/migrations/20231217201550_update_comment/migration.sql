/*
  Warnings:

  - You are about to alter the column `createDate` on the `comment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `comment` MODIFY `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
