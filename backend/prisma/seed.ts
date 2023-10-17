import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const students: Prisma.StudentCreateInput[] = [
  {
    firstName: 'Marc',
    lastName: 'Gray',
    age: 40,
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
  for (const student of students) {
    const user = await prisma.student.create({
      data: student,
    });
    console.log(`Created student with id: ${user.id}`);
  }
  for (const className of classes) {
    const classResource = await prisma.class.create({
      data: { name: className },
    });
    console.log(`Created class with id: ${classResource.id}`);
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
