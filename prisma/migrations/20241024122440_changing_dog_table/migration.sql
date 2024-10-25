/*
  Warnings:

  - Added the required column `userId` to the `Dog` table without a default value. This is not possible if the table is not empty.
  - Made the column `breedId` on table `dog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countryId` on table `dog` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `dog` DROP FOREIGN KEY `Dog_breedId_fkey`;

-- DropForeignKey
ALTER TABLE `dog` DROP FOREIGN KEY `Dog_countryId_fkey`;

-- AlterTable
ALTER TABLE `dog` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `breedId` INTEGER NOT NULL,
    MODIFY `countryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Dog` ADD CONSTRAINT `Dog_breedId_fkey` FOREIGN KEY (`breedId`) REFERENCES `Breed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dog` ADD CONSTRAINT `Dog_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dog` ADD CONSTRAINT `Dog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
