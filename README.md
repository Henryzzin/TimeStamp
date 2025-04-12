# TimeStamp

Objetivo:
Desenvolver uma aplicação full-stack em JavaScript que implemente um microsserviço de timestamp, funcionalmente semelhante ao exemplo disponível em: Timestamp Microservice. Este projeto permitirá que você aplique conceitos de desenvolvimento web, manipulação de datas e APIs RESTful.

Funcionalidades:

-Criar uma API utilizando Node.js e Express que responda a solicitações no formato /api/:date?.

-Se a data fornecida for válida, a API deve retornar um objeto JSON contendo:
    unix: timestamp Unix correspondente à data informada (em milissegundos, tipo Number).
    utc: data convertida para o formato UTC (exemplo: "Thu, 01 Jan 1970 00:00:00 GMT").

-Se a entrada for um timestamp Unix (exemplo: /api/1451001600000), a resposta deve ser: 
    { "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }

-A API deve aceitar qualquer data que possa ser analisada corretamente pelo método new Date(date_string).

-Se a data for inválida, a API deve retornar o seguinte objeto JSON:
    { "error": "Invalid Date" }

    Se nenhum parâmetro de data for fornecido, a API deve retornar o timestamp atual tanto em unix quanto em utc.
    
    A API deve suportar a conversão de fusos horários, permitindo que o usuário envie uma query string opcional para definir um fuso horário específico.

    Implementar um endpoint /api/diff/:date1/:date2 que calcule a diferença entre duas datas em dias, horas, minutos e segundos.

    Criar um frontend básico para testar e visualizar os resultados da API de forma interativa

    Calcula a diferença entre duas datas em dias, horas, minutos e segundos.

    Criar um frontend básico para testar e visualizar os resultados da API de forma interativa.

Passo a Passo de Execução
1. Clonar o Repositório ou Sair da Pasta Geral: Primeiro, você precisa clonar o repositório para o seu ambiente local.

git https://github.com/Henryzzin/TimeStamp
cd TimeStamp

ou pode apenas baixar o arquivo zip, descompactá-lo e abrir para seu ambiente local.

2. Após isso, no terminar deve-se usar os seguintes comandos: 
'npm install' (Para instalar as dependências)

'npm run start' (Isso vai iniciar o servidor na porta 3000)

3. Finalmente, para acessar o projeto, abra o navegador e pesquise o endereço:

http://localhost:3000

Isso carregará a página principal da aplicação que serve o arquivo index.html.

Pronto, está abert o projeto para testá-lo.