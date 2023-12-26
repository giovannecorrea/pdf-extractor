export interface Fatura {
  id: string;
  nr_cliente: string;
  mes_referencia: number;
  energia_ele_kwh: string;
  energia_ele_valor: string;
  energia_scee_kwh: string;
  energia_scee_valor: string;
  energia_compensada_kwh: string;
  energia_compensada_valor: string;
  contrib_ilum_valor: string;
  arquivo_dados: string;
  createdAt: Date;
  updatedAt: Date;
}