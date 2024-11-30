const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

const migrateData = async (fileName) => {
    try {
        // Load JSON data
        const jsonData = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

        // Insert data into the Prisma model
        for (const data of jsonData) {
            await prisma.post.create({
                data: data,
            });
        }

        console.log('Data migrated successfully from', fileName);
    } catch (error) {
        console.error('Error migrating data:', error);
    } finally {
        await prisma.$disconnect();
    }
};

const fileName = ''

migrateData(fileName);
