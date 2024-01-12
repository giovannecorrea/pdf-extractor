"use client"

import React, { useState } from "react";
import { Title, Card, Button } from "@tremor/react";

const Home: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | undefined>();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setPdfFile(undefined);
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      alert("Permitido apenas arquivos PDF.");
      e.target.value = "";
      return;
    }

    setPdfFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pdfFile) {
      alert("Selecione um arquivo PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", pdfFile);

    try {
      const response = await fetch("http://localhost:3000/api/parser", {
        method: "POST",
        body: formData,
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
      alert("Ocorreu um erro ao salvar a fatura. Por favor, tente novamente mais tarde.");
      console.error('Error:', error);
    } finally {
      setPdfFile(undefined);
      const fileInput = document.getElementById("pdfFile") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

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
  );
};

export default Home;
