import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {

  const faturas = await prisma.fatura.findMany({
    orderBy: {
      id: 'desc',
    },
  })

  return Response.json(faturas);
} 

export async function POST(request: Request) {
  const { nr_cliente } = await request.json();

  const faturas = await prisma.fatura.findMany({
    where: {
      nr_cliente: nr_cliente,
    },
    orderBy: {
      id: 'asc',
    },
  })

  return Response.json(faturas);
}