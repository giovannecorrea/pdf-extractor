"use client"

import { useState, useEffect } from "react";
import { Fatura } from "@/types";
import { converteBufferParaArquivo } from "@/utils";
import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Select, SelectItem } from "@tremor/react";

export default function BibliotecaFaturas() {

  const [faturas, setFaturas] = useState<Fatura[]>([]);
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
      setFaturas(faturasJson);
    }

    fetchFaturas();
  }, [selecaoCliente]);

  return (
    <>
    <Title>Biblioteca Faturas</Title>
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
    <Card className="mt-4 max-w-[500px]">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Cliente</TableHeaderCell>
            <TableHeaderCell>Mês Referência</TableHeaderCell>
            <TableHeaderCell>Arquivo</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            faturas.map((fatura, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{fatura.nr_cliente}</TableCell>
                  <TableCell>{fatura.mes_referencia}</TableCell>
                  <TableCell className="text-blue-500 font-bold"><a href={converteBufferParaArquivo(fatura.arquivo_dados)} download={`${fatura.nr_cliente}_${fatura.mes_referencia}`}>Link</a></TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </Card>
    </>
  )
}
