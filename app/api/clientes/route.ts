import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {

  try {
    const clientes = await prisma.fatura.groupBy({
      by: ['nr_cliente'],
      orderBy: {
        nr_cliente: 'asc'
      },
    });
  
    const clientes_nr = clientes.map(obj => obj.nr_cliente); //Converte em um array apenas com os números dos clientes
  
    return Response.json(clientes_nr);
  } catch (error) {
    return Response.json({ msg: 'Erro ao buscar clientes!' }, { status: 500 });
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
        nr_cliente: nr_cliente
      },
      orderBy: {
        mes_referencia: 'asc'
      }
    });
  
    return Response.json(faturas);
  } catch (error) {
    return Response.json({ msg: 'Erro ao buscar faturas!' }, { status: 500 });
  }
  
}