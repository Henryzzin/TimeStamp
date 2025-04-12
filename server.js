const express = require('express'); // Importa o framework Express para criar o servidor.
const app = express(); // Cria uma instância do servidor Express.
const path = require('path');

app.use(express.static(path.join(__dirname, 'front'))); // Abrir os arquivos da pasta 'front'

app.get('/', (req, res) => { // Rota para servir o arquivo HTML
    res.sendFile(path.join(__dirname, 'front', 'index.html')); 
});

// Iniciar o servidor, qual a porta e da a mensagem do servidor rodando, isso deve ta suave pra entender
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/api/:date?', (req, res) => { // Rota para converter data/timestamp
    let input = req.params.date;
    let data;

    if (!input) { // Se não houver data, usa a data atual
        data = new Date();
    } else if (!isNaN(Number(input))) {
        // Se for um número, transforma em Number para evitar erro
        data = new Date(Number(input));
    } else {
        // Caso contrário, tenta criar uma data normal
        data = new Date(input);
    }

    let timezone = parseFloat(req.query.timezone);

    if (timezone > 12) { // Limita o fuso horário a 12 horas
        timezone = 12;
    } else if (timezone < -12) {
        timezone = -12;
    } else if (isNaN(timezone)) {
        timezone = 0;
    }

    if (isNaN(data.getTime())) { // Verifica se a data é inválida
        return res.json({ error: "Invalid Date" });
    }

    data.setHours(data.getHours() + timezone); // Ajusta a data para o fuso horário

    res.json({ // Retorna a data em JSON
        utc: data.toUTCString(),
        unix: data.getTime(),
        timezone: timezone
    });
});

app.get('/api/diff/:date1/:date2', (req, res) => {
    // Verifica se os valores são números (UNIX) ou strings (ISO)
    let date1 = !isNaN(Number(req.params.date1)) ? new Date(Number(req.params.date1)) : new Date(req.params.date1);
    let date2 = !isNaN(Number(req.params.date2)) ? new Date(Number(req.params.date2)) : new Date(req.params.date2);

    // Valida se as datas são válidas
    if (isNaN(date1.getTime())) {
        return res.json({ error: `Invalid Date: ${req.params.date1}` });
    }
    if (isNaN(date2.getTime())) {
        return res.json({ error: `Invalid Date: ${req.params.date2}` });
    }

    // Calcula a diferença entre as datas
    let difference = Math.abs(date1 - date2);

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const remainingMsOfDays = difference % (1000 * 60 * 60 * 24);

    const hours = Math.floor(remainingMsOfDays / (1000 * 60 * 60));
    const remainingMsOfHours = remainingMsOfDays % (1000 * 60 * 60);         // Calccula a diferença em dias, horas, minutos e segundos

    const minutes = Math.floor(remainingMsOfHours / (1000 * 60));
    const remainingMsOfMinutes = remainingMsOfHours % (1000 * 60);

    const seconds = Math.floor(remainingMsOfMinutes / 1000);

    // Retorna o resultado em JSON
    res.json({
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days
    });
});