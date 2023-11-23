import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type ResponseData = {
  message: string;
  db: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const requestMethod = req.method;
  // const body = JSON.parse(req.body);
  switch (requestMethod) {
    case 'POST':
      console.log('POST Accepted');
      postCategories()
        .then(async () => {
          await prisma.$disconnect();
        })
        .catch(async (e) => {
          console.error(e);
          await prisma.$disconnect();
          process.exit(1);
        });
      res.status(200).json({ message: `Blog Created`, db: {} });

    // handle other HTTP methods
    default:
      const dbRes = await prisma.blogs.findMany();
      if (dbRes) {
        res.status(200).json({ message: 'Welcome to API Routes!', db: dbRes });
      }
  }

  //res.status(200).json({ message: 'Hello from Next.js!', db: dbRes });
  /*  const dbRes = main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  res.status(200).json({ message: 'Welcome to API Routes!', db: dbRes }); */
}

async function main() {
  const allUsers = await prisma.blogs.findMany();
  console.log('from backend', allUsers);
  return allUsers;
}
async function postBlog() {
  await prisma.blogs.create({
    data: {
      title: 'Blog Test',
      content: 'content',
      published: true,
      author: 'Deepak'
    }
  });
}
async function postCategories() {
  await prisma.category.create({
    data: {
      name: 'tag 1'
    }
  });
}
