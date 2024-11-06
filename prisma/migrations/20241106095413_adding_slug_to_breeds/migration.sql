/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Breed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Breed` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Breed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `breed` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Breed_name_key` ON `Breed`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Breed_slug_key` ON `Breed`(`slug`);
