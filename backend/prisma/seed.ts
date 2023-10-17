import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const students: Prisma.StudentCreateInput[] = [
  {
    firstName: 'Marc',
    lastName: 'Gray',
    age: 40,
    classes: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
  },
  {
    firstName: 'Erica',
    lastName: 'Templeton',
    age: 33,
    classes: { connect: [{ id: 3 }, { id: 4 }] },
  },
];

const classes = [
  'Calculus I',
  'Computer Science',
  'Biology',
  'English Literature',
];

async function main() {
  console.log('Begin seeding...');
  for (const className of classes) {
    const classResource = await prisma.class.create({
      data: { name: className },
    });
    console.log(`Created class with id: ${classResource.id}`);
  }
  for (const student of students) {
    const user = await prisma.student.create({
      data: {
        ...student,
        createdAt: new Date(),
      },
    });
    console.log(`Created student with id: ${user.id}`);
  }
  console.log('Seeding complete.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
