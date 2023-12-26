"use client"

import { useState } from "react";
import { Title, Card, Button } from "@tremor/react";

export default function Home() {

  const [pdfFile, setPdfFile] = useState<File>();

  const handleUpload = ({ target }: React.ChangeEvent<HTMLInputElement>) => {    
    const selectedFile = target.files?.[0];

    // Se o usuário selecionar o mesmo arquivo ou cancelar, o evento não é disparado
    if(!selectedFile) {
      setPdfFile(undefined);
      return;
    }

    if(selectedFile?.type !== 'application/pdf') {
      alert('Permitido apenas arquivos PDF');
      target.value = '';
      return;
    }
    setPdfFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (pdfFile) {
      formData.append("pdfFile", pdfFile);
    } else {
      alert('Selecione um arquivo PDF');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/parser', {
        method: 'POST',
        body: formData
      });

      const responseJson = await response.json();

      if (response.ok) {
        console.log(responseJson);
        alert(responseJson.msg);
      } else if (response.status === 409) {
        alert(responseJson.msg);
      } else {
        throw new Error(responseJson.msg);
      }
    } catch (error) {
      alert('Ocorreu um erro ao salvar a fatura. Tente novamente mais tarde.');
      console.error('Erro:', error);
    } finally {
      setPdfFile(undefined);
      const fileInput = document.getElementById("pdfFile") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }

  return (
    <main>
      <Title className="text-center">Anexe a fatura em PDF:</Title>
      <Card className="mt-4">
        <form className="space-y-10 text-center" onSubmit={handleSubmit}>
          <p><input type="file" id="pdfFile" onChange={handleUpload} /></p>
          <Button type="submit">Enviar</Button>
        </form>
      </Card>
    </main>
  )
}
