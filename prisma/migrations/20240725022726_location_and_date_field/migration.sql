-- AlterTable
ALTER TABLE `events` ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `location` VARCHAR(191) NOT NULL DEFAULT 'sem informações';
