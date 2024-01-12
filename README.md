## Objetivo
Neste projeto eu criei uma aplicação capaz de extrair dados específicos de faturas de energia elétrica em PDF. As faturas para utilização neste projeto podem ser encontradas <a href="https://drive.google.com/drive/folders/1JVI48GG-xX8H2kdFMY4u0wwgxFrAHiP5?usp=sharing">aqui</a>.

**Observação**: Essa aplicação funciona de acordo com o formato das faturas do link acima. Diferentes tipos de faturas não irão extrair os dados corretamente. Mas você pode ajustar a lógica para o seu caso de uso.

## Instalação

1. Clone do repositório e instalação das dependências
```bash
git clone https://github.com/giovannecorrea/pdf-extractor.git
cd pdf-extractor
npm install
```

2. Criar arquivo .env no root com a URL do banco PostgreSQL
```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

3. Migrar o schema prisma para o banco de dados
```bash
npx prisma db push
```

4. Rodar o servidor localmente (http://localhost:3000)
```bash
npm run dev
```

<br><br>
## English
## Objective
In this project, I created an application capable of extracting specific data from electricity bills in PDF format. The bills for use in this project can be found <a href="https://drive.google.com/drive/folders/1JVI48GG-xX8H2kdFMY4u0wwgxFrAHiP5?usp=sharing">here</a>.

**Note**: This application works according to the format of the bills from the link above. Different types of bills will not extract the data correctly. However, you can adjust the logic for your use case.

## Installation

1. Clone the repository and install dependencies
```bash
git clone https://github.com/giovannecorrea/pdf-extractor.git
cd pdf-extractor
npm install
```

2. Create a .env file in the root with the URL of the PostgreSQL database
```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

3. Migrate the Prisma schema to the database
```bash
npx prisma db push
```

4. Run the server locally (http://localhost:3000)
```bash
npm run dev
```