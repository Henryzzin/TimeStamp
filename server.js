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

    let data = new Date(req.params.date);
    let timezone = parseFloat(req.query.timezone);

    if(timezone>12){
        timezone=12
    } else if(timezone<-12){
        timezone=-12
    } else if(isNaN(timezone)){
        timezone=0;
    }

    data.setHours(data.getHours()+timezone);
    
    if(!data){
        data = new Date();
    } else {
        utc = data.toUTCString();
        unix = data.getTime();
    }

    res.json({
        utc: utc,
        unix: unix,
        timezone: timezone
    })
});

app.get('/api/diff/:date1/:date2', (req, res) => {
    let date1 = new Date(parseInt(req.params.date1));
    let date2 = new Date(parseInt(req.params.date2));
    let difference;
    if(date1>date2){
        difference = date1-date2;
    } else {
        difference = date2-date1;
    }

    let days = Math.floor(difference / (1000*60*60*24));
    let hours = Math.floor(difference % (1000*60*60));
    let minutes = Math.floor(difference % (1000*60));
    let seconds = Math.floor(difference % (1000));
    let milliseconds = difference;

    res.json({
        milisegundos: milliseconds,
        segundos: seconds,
        minutos: minutes,
        horas: hours,
        dias: days
    })
});