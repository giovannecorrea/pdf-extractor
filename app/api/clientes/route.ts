import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {

  const clientes = await prisma.fatura.groupBy({
    by: ['nr_cliente'],
    orderBy: {
      nr_cliente: 'asc'
    },
  });

  const clientes_nr = clientes.map(obj => obj.nr_cliente); //Converte em um array apenas com os números dos clientes

  return Response.json(clientes_nr);
}

export async function POST(request: Request) {
  const { nr_cliente } = await request.json();

  const faturas = await prisma.fatura.findMany({
    where: {
      nr_cliente: nr_cliente
    },
    orderBy: {
      mes_referencia: 'asc'
    }
  });

  return Response.json(faturas);
}