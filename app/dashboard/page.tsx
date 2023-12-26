"use client"

import { useState, useEffect } from "react";
import { Fatura } from "@/types";
import { Title, LineChart, Card, Select, SelectItem } from "@tremor/react";
import { NumeroMes } from "@/utils";

export default function Dashboard() {

  const [faturasEnergia, setFaturasEnergia] = useState([]);
  const [faturasValor, setFaturasValor] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selecaoCliente, setSelecaoCliente] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await fetch('http://localhost:3000/api/clientes', {
        method: 'GET'
      });
      const clientesJson = await response.json();
      setClientes(clientesJson);
    }

    fetchClientes();
  }, []);

  useEffect(() => {
    const fetchFaturas = async () => {
      const response = await fetch('http://localhost:3000/api/faturas', {
        method: 'POST',
        body: JSON.stringify({ nr_cliente: selecaoCliente })
      });
      const faturasJson = await response.json();
      const faturasJson_energia = faturasJson.map((fatura: Fatura) => {
        return {
          mes_referencia: NumeroMes[fatura.mes_referencia],
          "Consumo de Energia Elétrica": parseInt(fatura.energia_ele_kwh) + parseInt(fatura.energia_scee_kwh),
          "Energia Compensada": parseInt(fatura.energia_compensada_kwh),
        }
      })

      const faturasJson_valor = faturasJson.map((fatura: Fatura) => {
        return {
          mes_referencia: NumeroMes[fatura.mes_referencia],
          "Valor Total sem GD": parseFloat(fatura.energia_ele_valor) + parseFloat(fatura.energia_scee_valor) + parseFloat(fatura.contrib_ilum_valor),
          "Economia GD": parseFloat(fatura.energia_compensada_valor),
        }
      })

      console.log(faturasJson_energia);

      setFaturasEnergia(faturasJson_energia);
      setFaturasValor(faturasJson_valor);
    }

    fetchFaturas();
  }, [selecaoCliente]);

  const valueFormatterKwh = (number: number) => `${new Intl.NumberFormat("us").format(number).toString()} KWh`;

  const valueFormatterValor = (number: number) => `${Intl.NumberFormat("pt-BR", {
    style: 'currency',
    currency: 'BRL',
  }).format(number).toString()}`;

  return (
    <>
      <Title>Dashboard</Title>
      <div className="min-w-[250px]">
      <Select value={selecaoCliente} onValueChange={setSelecaoCliente} placeholder="Selecione um cliente...">
        {
          clientes.map((cliente, index) => {
            return (
              <SelectItem key={index} value={cliente}>{cliente}</SelectItem>
            )
          })
        }
      </Select>
    </div>
      <div className="flex mt-4 space-x-6">
        <Card className="w-[700px]">
          <LineChart
            className="mt-6"
            data={faturasEnergia}
            index="mes_referencia"
            categories={["Consumo de Energia Elétrica", "Energia Compensada"]}
            colors={["emerald", "gray"]}
            valueFormatter={valueFormatterKwh}
            yAxisWidth={82}
          />
        </Card>
        
        <Card className="w-[700px]">
          <LineChart
            className="mt-6"
            data={faturasValor}
            index="mes_referencia"
            categories={["Valor Total sem GD", "Economia GD"]}
            colors={["emerald", "gray"]}
            valueFormatter={valueFormatterValor}
            yAxisWidth={72}
          />
        </Card>
      </div>
    </>
  )
}
