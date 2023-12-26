export const converteBufferParaArquivo = (bufferString: String) => {
  const blob = new Blob([Buffer.from(bufferString)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  return url;
}

// Array para converter o mês de referência para número
export const MesNumero: { [key: string]: number } = {
  'JAN': 1,
  'FEV': 2,
  'MAR': 3,
  'ABR': 4,
  'MAI': 5,
  'JUN': 6,
  'JUL': 7,
  'AGO': 8,
  'SET': 9,
  'OUT': 10,
  'NOV': 11,
  'DEZ': 12,
}

export const NumeroMes: { [key: number]: string } = {};
Object.entries(MesNumero).forEach(([key, value]) => {
  NumeroMes[value] = key;
});