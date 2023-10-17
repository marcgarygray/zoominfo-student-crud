import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

/**
 * Future improvement: use Prisma's error codes to surface
 * more informative errors to client:
 * https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
 */

// CREATE
app.post('/student', async (req, res) => {
  try {
    const studentData = req.body;
    const student = await prisma.student.create({
      data: studentData,
    });
    res.status(201).json(student);
  } catch (e) {
    console.error(e); // in production, we'd want to replace this with a persisted log for debugging
    res.json({ error: 'Student could not be created.' });
  }
});

// READ
app.get('/students', async (_, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (e) {
    console.error(e); // in production, we'd want to replace this with a persisted log for debugging
    res.json({ error: 'Students could not be retrieved.' });
  }
});

app.get('/student/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: {
        id: Number(id),
      },
      include: { classes: true },
    });
    res.json(student);
  } catch (e) {
    console.error(e); // in production, we'd want to replace this with a persisted log for debugging
    res.json({ error: 'Student could not be retrieved.' });
  }
});

// UPDATE
// update for single student here

// DELETE
app.delete('/student/:id', async (req, res) => {
  const { id } = req.params;
  const student = await prisma.student.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(student);
});

app.delete('/students', async (req, res) => {
  try {
    const { studentIds } = req.body;
    await prisma.student.deleteMany({
      where: {
        OR: [{ id: { in: studentIds } }],
      },
    });
    res.json({ studentIds });
  } catch (e) {
    console.error(e); // in production, we'd want to replace this with a persisted log for debugging
    res.json({ error: 'Students could not be deleted.' });
  }
});

app.listen(3001, () =>
  console.log('🚀 Server ready at: http://localhost:3001')
);