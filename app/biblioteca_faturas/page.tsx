"use client"

import React, { useState, useEffect } from "react";
import { Fatura } from "@/types";
import { converteBufferParaArquivo } from "@/utils";
import {
  Card,
  Title,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
} from "@tremor/react";

const BibliotecaFaturas: React.FC = () => {
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [clientes, setClientes] = useState<string[]>([]);
  const [selecaoCliente, setSelecaoCliente] = useState<string>('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/clientes', {
          method: 'GET',
        });
        const clientesJson = await response.json();
        setClientes(clientesJson);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    const fetchFaturas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/faturas', {
          method: 'POST',
          body: JSON.stringify({ nr_cliente: selecaoCliente }),
        });
        
        const faturasJson = await response.json();
        if (!response.ok) {
          throw new Error(faturasJson.msg);
        }
        setFaturas(faturasJson);
      } catch (error) {
        console.error('Error fetching faturas:', error);
      }
    };

    fetchFaturas();
  }, [selecaoCliente]);

  return (
    <>
      <Title>Biblioteca Faturas</Title>
      <div className="min-w-[250px]">
        <Select
          value={selecaoCliente}
          onValueChange={setSelecaoCliente}
          placeholder="Selecione um cliente..."
        >
          {clientes.map((cliente, index) => (
            <SelectItem key={index} value={cliente}>
              {cliente}
            </SelectItem>
          ))}
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
            {faturas.map((fatura, index) => (
              <TableRow key={index}>
                <TableCell>{fatura.nr_cliente}</TableCell>
                <TableCell>{fatura.mes_referencia}</TableCell>
                <TableCell className="text-blue-500 font-bold">
                  <a
                    href={converteBufferParaArquivo(fatura.arquivo_dados)}
                    download={`${fatura.nr_cliente}_${fatura.mes_referencia}`}
                  >
                    Baixar
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default BibliotecaFaturas;
