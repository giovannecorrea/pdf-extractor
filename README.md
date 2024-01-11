## Teste Prático Lumi

## Instalação

1. Clone do repositório e instalação das dependências
```bash
git clone https://github.com/giovannecorrea/desafio-lumi.git
cd desafio-lumi
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

test