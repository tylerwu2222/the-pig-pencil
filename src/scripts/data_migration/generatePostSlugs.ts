import prisma from '@/db';
import { getSlugTitle } from '@/app/lib/stringFormatting'; // Adjust path to where your function is


async function createAndPopulateSlugs(): Promise<void> {
    try {
        // Fetch all posts without a slug
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    { slug: null },
                    { slug: "" }
                ],
            }
        });

        console.log(`Found ${posts.length} posts to update.`);

        for (const post of posts) {
            const { id, publishDate, title } = post;

            if (!publishDate || !title) {
                console.warn(`Skipping post ID ${id}: Missing date or title`);
                continue;
            }

            // Use the getSlugTitle function to generate the slug
            const slug = getSlugTitle({ date: publishDate, title });

            // Update the post with the new slug
            await prisma.post.update({
                where: { id },
                data: { slug },
            });

            console.log(`Updated post ID ${id} with slug: ${slug}`);
        }

        console.log('Slug population complete!');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the function
createAndPopulateSlugs();
