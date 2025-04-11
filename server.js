const express = require('express'); // Importa o framework Express para criar o servidor.
const app = express(); // Cria uma instância do servidor Express.
const path = require('path');

app.use(express.static(path.join(__dirname, 'front'))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'index.html')); 
});

// Iniciar o servidor, qual a porta e da a mensagem do servidor rodando, isso deve ta suave pra entender
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/api/:date?', (req, res) => {
    let input = req.params.date;
    let data;

    if (!input) {
        data = new Date();
    } else if (!isNaN(input)) {
        // Se for um número, transforma em Number para evitar erro
        data = new Date(Number(input));
    } else {
        // Caso contrário, tenta criar uma data normal
        data = new Date(input);
    }

    let timezone = parseFloat(req.query.timezone);

    if (timezone > 12) {
        timezone = 12;
    } else if (timezone < -12) {
        timezone = -12;
    } else if (isNaN(timezone)) {
        timezone = 0;
    }

    if (isNaN(data.getTime())) {
        return res.json({ error: "Invalid Date" });
    }

    data.setHours(data.getHours() + timezone);

    res.json({
        utc: data.toUTCString(),
        unix: data.getTime(),
        timezone: timezone
    });
});

app.get('/api/diff/:date1/:date2', (req, res) => {
    let date1 = new Date(parseInt(req.params.date1));
    let date2 = new Date(parseInt(req.params.date2));
    let difference;

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        return res.json({ error: "Invalid Date" });
    }

    if(date1>date2){
        difference = date1-date2;
    } else {
        difference = date2-date1;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const remainingMsOfDays = difference % (1000 * 60 * 60 * 24);

    const hours = Math.floor(remainingMsOfDays / (1000 * 60 * 60));
    const remainingMsOfHours = remainingMsOfDays % (1000 * 60 * 60);

    const minutes = Math.floor(remainingMsOfHours / (1000 * 60));
    const remainingMsOfMinutes = remainingMsOfHours % (1000 * 60);

    const seconds = Math.floor(remainingMsOfMinutes / 1000);

    res.json({
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days
    });
});