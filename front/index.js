const inputDate = document.getElementById("inputDate");
const buttonDate = document.getElementById("buttonDate");  
const resultDate = document.getElementById("resultDate");

const firstDate = document.getElementById("firstDate");             // Pega as váriaveis do HTML
const secondDate = document.getElementById("secondDate");
const buttonDateDiff = document.getElementById("buttonDateDiff");   
const resultDateDiff = document.getElementById("resultDiff");

buttonDate.addEventListener('click', () => { // Função para converter data/timestamp
    const input = inputDate.value;          // Pega o valor do input (ou seja, a data ou timestamp que o usuário digitou)
    fetch(`/api/${(input)}`)                // Faz uma requisição pra API (ou seja, chama o arquivo que ta lá no servidor, que é o server.js)
        .then(response => response.json())      // Converte a resposta pra JSON (ou seja, transforma o arquivo que ta lá no servidor em um arquivo que o navegador consegue entender)
        .then(data => {                         // Aqui ta pegando a resposta (ou seja, o arquivo que ta lá no servidor) e transformando em um objeto JS (ou seja, um objeto que o navegador consegue entender)
            resultDate.innerHTML = data.error ?     // Aqui ta verificando se a resposta tem erro se der só aparece a mensagem de erro, se não der erro continua o código
                `<span class="error">${data.error}</span>` :  // Transforma os dados para HTML o (${} é para colocar o valor da variável dentro do HTML)
                `<strong>Unix:</strong> ${data.unix}<br>
                 <strong>UTC:</strong> ${data.utc}<br>`;
        })
        .catch(() => {
            resultDate.innerHTML = "Erro ao processar a requisição";  // Se der erro na requisição, aparece a mensagem de erro
        });
});

buttonDateDiff.addEventListener('click', () => { // Função para comparar datas
    const d1 = isNaN(firstDate.value) ? firstDate.value : Number(firstDate.value); // Pega o valor do input (ou seja, a data ou timestamp que o usuário digitou)
    const d2 = isNaN(secondDate.value) ? secondDate.value : Number(secondDate.value); // Se o valor for um número (UNIX), transforma em Number, se não for, deixa como string

    if (!d1 || !d2) { // Verifica se os inputs foram preenchidos
        resultDateDiff.innerHTML = `<span class="error">Por favor, insira ambas as datas</span>`;
        return;
    }

    if (isNaN(d1) && isNaN(Date.parse(d1))) { // Verifica se a data 1 é inválida
        resultDateDiff.innerHTML = `<span class="error">Data 1 inválida</span>`;
        return;
    }

    if (isNaN(d2) && isNaN(Date.parse(d2))) { // Verifica se a data 2 é inválida
        resultDateDiff.innerHTML = `<span class="error">Data 2 inválida</span>`;
        return;
    }

    fetch(`/api/diff/${d1}/${d2}`) // Faz uma requisição pra API (ou seja, chama o arquivo que ta lá no servidor, que é o server.js)
        .then(response => response.json())
        .then(data => {
            resultDateDiff.innerHTML = data.error ? // Aqui ta verificando se a resposta tem erro se der só aparece a mensagem de erro, se não der erro continua o código
                `<span class="error">${data.error}</span>` : // Transforma os dados para HTML o (${} é para colocar o valor da variável dentro do HTML)
                `<strong>Diferença:</strong><br>
                 ${data.days} dias, ${data.hours} horas, 
                 ${data.minutes} minutos, ${data.seconds} segundos`;
        })
        .catch(() => { // Se der erro na requisição, aparece a mensagem de erro
            resultDateDiff.innerHTML = `<span class="error">Erro ao processar a requisição</span>`;
        });
});
