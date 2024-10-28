/*
  Warnings:

  - Made the column `name` on table `dog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `dog` ADD COLUMN `views` INTEGER NOT NULL DEFAULT 0,
    MODIFY `name` VARCHAR(191) NOT NULL;
