import { PrismaClient } from '@prisma/client';
import pdfParse from 'pdf-parse';
import { NextRequest } from 'next/server'
import { MesNumero } from '@/utils';

const prisma = new PrismaClient()



function trataValor(valor: string) {
  return valor.replace('.', '').replace(',', '.');    // Trata um possível separador de milhares e converte o separador decimal para ponto
}

// Função para extrair informações de uma linha específica de um PDF que já foi parseado para string
// text - texto do PDF parseado para string // textoReferencia - parte do texto que identifica a linha que usaremos como referência
// linhaReferente - posição da linha em relação a linha de referência // indice - posição da informação dentro da linha
function extrairInfo (textoPdf: string ,textoReferencia: string, linhaReferente: number, indice: number) {
  const lines = textoPdf.split('\n');                                                       //Divide o texto em linhas e coloca em um array
  const linha = lines.findIndex((line: string) => line.includes(textoReferencia));          // Procura a linha que contém o texto de referência
  if (linha !== -1) {                                                                       // Se a linha for encontrada, retorna a informação
    const linhaInfo = lines[linha + linhaReferente];                                        // Pega a linha referente a linha de referência
    return linhaInfo.trim().split(/\s+/)[indice];                                           // Divide a linha, joga em um array e retorna a informação na posição do índice
  }
}

export async function POST(request: NextRequest) {

  // Pega o PDF do request
  const pdfFile = (await request.formData()).get('pdfFile');

  if (!pdfFile) {
    return new Response('O arquivo não foi enviado!', { status: 400 });
  }
  
  // Converte o PDF para array de bytes
  const bytes = await (pdfFile as Blob).arrayBuffer();

  // Converte o array de bytes para buffer
  const buffer = Buffer.from(bytes);

  // Converte o buffer para string
  const dataBuffer = await pdfParse(buffer);

  const nr_cliente = extrairInfo(dataBuffer.text, 'Nº DO CLIENTE', 1, 0);
  const mes_ano_referencia = extrairInfo(dataBuffer.text, 'Referente a', 1, 0);
  const mes_referencia = mes_ano_referencia?.split('/')[0]; // Pega somente o mês da referência
  const energia_ele_kwh = extrairInfo(dataBuffer.text, 'Energia Elétrica', 0, 2);
  const energia_ele_valor = extrairInfo(dataBuffer.text, 'Energia Elétrica', 0, 4);
  const energia_scee_kwh = extrairInfo(dataBuffer.text, 'Energia SCEE s/ ICMS', 0, 4);
  const energia_scee_valor = extrairInfo(dataBuffer.text, 'Energia SCEE s/ ICMS', 0, 6);
  const energia_compensada_kwh = extrairInfo(dataBuffer.text, 'Energia compensada GD I', 0, 4);
  const energia_compensada_valor = extrairInfo(dataBuffer.text, 'Energia compensada GD I', 0, 6);
  const contrib_ilum_valor = extrairInfo(dataBuffer.text, 'Contrib Ilum Publica Municipal', 0, 4);

  // Verifica se já existe uma fatura com o mesmo mês de referência e número de cliente
  const faturaExistente = await prisma.fatura.findFirst({
    where: {
      nr_cliente: nr_cliente!,
      mes_referencia: MesNumero[mes_referencia!],
    },
  })

  if (faturaExistente) {
    return Response.json({ msg: 'Fatura já cadastrada!' }, { status: 409 });
  }
  
  // Cria a fatura no banco de dados
  const fatura = await prisma.fatura.create({
    data: {
      nr_cliente: nr_cliente!,
      mes_referencia: MesNumero[mes_referencia!],
      energia_ele_kwh: trataValor(energia_ele_kwh!),
      energia_ele_valor: trataValor(energia_ele_valor!),
      energia_scee_kwh: trataValor(energia_scee_kwh!),
      energia_scee_valor: trataValor(energia_scee_valor!),
      energia_compensada_kwh: trataValor(energia_compensada_kwh!),
      energia_compensada_valor: trataValor(energia_compensada_valor!.replace('-', '')),
      contrib_ilum_valor: trataValor(contrib_ilum_valor!),
      arquivo_dados: buffer,
    },
  })

  return Response.json({ msg: 'Fatura cadastrada com sucesso!', fatura });
}