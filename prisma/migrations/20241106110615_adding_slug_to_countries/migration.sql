/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `country` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Country_name_key` ON `Country`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Country_slug_key` ON `Country`(`slug`);
