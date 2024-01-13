import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {

  try {
    const faturas = await prisma.fatura.findMany({
      orderBy: {
        id: 'desc',
      },
    })

    return Response.json(faturas);
  } catch (error) {
    return Response.json({ msg: 'Erro ao buscar faturas!' }, { status: 500 });
  }
} 

export async function POST(request: Request): Promise<Response> {
  const { nr_cliente } = await request.json() as { nr_cliente: string };

  if (!nr_cliente) {
    return Response.json({ msg: 'Número do cliente não informado!' }, { status: 400 });
  }

  try {
    const faturas = await prisma.fatura.findMany({
      where: {
        nr_cliente: nr_cliente,
      },
      orderBy: {
        id: 'asc',
      },
    })
  
    return Response.json(faturas);
  } catch (error) {
    return Response.json({ msg: 'Erro ao buscar faturas!' }, { status: 500 });
  }
  
}