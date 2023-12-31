/*
  Warnings:

  - You are about to drop the column `name` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Category_name_key` ON `category`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `name`,
    DROP COLUMN `summary`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Category_value_key` ON `Category`(`value`);
