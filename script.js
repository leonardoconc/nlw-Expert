// const perguntas = [
//     {
//         pergunta: "Pergunta 01",
//         respostas: [
//             "Resposta A", 
//             "Resposta B", 
//             "Resposta C",
//         ],
//         correta: 2,
//     },
// ];

// console.log(perguntas[0].respostas[perguntas[0].correta]); // Resposta C
//Use o chatGPT - (usei o Copilot)
//crie 10 perguntas sobre o topico Fundamentos de JavaScript com 3 opções de resposta e uma resposta correta para compor um aplicativo em javascript. Responda com essa estrutura de dados do exemplo abaixo:

const perguntas = [
    {
        pergunta: "Qual é a forma correta de declarar uma variável em JavaScript?",
        respostas: [
            "var myVar;",
            "variable myVar;",
            "let myVar;",
        ],
        correta: 2,
    },
    {
        pergunta: "Qual é a função usada para imprimir mensagens no console em JavaScript?",
        respostas: [
            "console.log()",
            "print()",
            "log.console()",
        ],
        correta: 0,
    },
    {
        pergunta: "O que o método 'querySelector()' faz em JavaScript?",
        respostas: [
            "Seleciona todos os elementos com uma classe específica.",
            "Seleciona o primeiro elemento que corresponde a um seletor CSS especificado.",
            "Seleciona todos os elementos da página.",
        ],
        correta: 1,
    },
    {
        pergunta: "Qual é a função do método 'addEventListener()' em JavaScript?",
        respostas: [
            "Adiciona um evento a um elemento HTML.",
            "Remove um evento de um elemento HTML.",
            "Atualiza um elemento HTML.",
        ],
        correta: 0,
    },
    {
        pergunta: "Qual é a maneira correta de comentar uma linha em JavaScript?",
        respostas: [
            "// Este é um comentário de linha",
            "<!-- Este é um comentário de linha -->",
            "/* Este é um comentário de linha */",
        ],
        correta: 0,
    },
    {
        pergunta: "Qual é o resultado da expressão '2 + '2' + 2' em JavaScript?",
        respostas: [
            "22",
            "4",
            "Erro",
        ],
        correta: 0,
    },
    {
        pergunta: "Qual é o operador usado para comparar igualdade de valor e tipo em JavaScript?",
        respostas: [
            "==",
            "===",
            "=",
        ],
        correta: 1,
    },
    {
        pergunta: "O que o método 'push()' faz em um array em JavaScript?",
        respostas: [
            "Remove o último elemento do array.",
            "Adiciona um elemento ao início do array.",
            "Adiciona um elemento ao final do array.",
        ],
        correta: 2,
    },
    {
        pergunta: "Qual é o método usado para converter uma string em um número inteiro em JavaScript?",
        respostas: [
            "parseInt()",
            "stringToNumber()",
            "toInteger()",
        ],
        correta: 0,
    },
    {
        pergunta: "Qual é o resultado da expressão 'typeof null' em JavaScript?",
        respostas: [
            "'null'",
            "'object'",
            "'undefined'",
        ],
        correta: 1,
    },
];

const quiz = document.querySelector("#quiz");
const template = document.querySelector("template");

//new- palavra reservada  para criar novos objetos
//Set() - é um conjunto e posso adicionar ou tirar (Nunca posso repetir o que tem dentro dele - vai haver uma unica informação)
const corretas = new Set();

const totalDePerguntas = perguntas.length; //tamanho do vetor

const mostrarTotal = document.querySelector("#acertos span");
// mostrarTotal.textContent = `${corretas.size} de ${totalDePerguntas}`;

//loop ou laço de repetição
for (const item of perguntas) {
    // o conteúdo do template é clonado e para copiar todos os nós filhos coloco true como argumento
    const quizItem = template.content.cloneNode(true);

    //pega o item clonado e busca o h3 e muda seu texto interno (a pergunta)
    quizItem.querySelector("h3").textContent = item.pergunta;

    for (let resposta of  item.respostas){
        //pega o item clonado e busca dentro do dl o dt e clona todos os elementos dentro
        const dt = quizItem.querySelector("dl dt").cloneNode(true);
        dt.querySelector("span").textContent = resposta;

        //seleciona o input e seta o atributo name
        dt.querySelector("input").setAttribute("name", "pergunta" + perguntas.indexOf(item));

        //pega o value dentro do input e altera recebendo a posição de cada resposta
        dt.querySelector("input").value = item.respostas.indexOf(resposta);

        //verificar se ao clicar no input se ele está certo ou errado, atraves do evento de mudança (change) do input
        dt.querySelector("input").onchange = (event) => {
            //compara se o indice do input clicado é igual ao da resposta correta e vai retornar (true ou false)
            const estaCorreta = event.target.value == item.correta;

            //caso ele encontre o item em corretas vai deletar
            corretas.delete(item);

            //se acertei
            if (estaCorreta) {
                //faz a contagem dos meus acertos
                corretas.add(item); //adicona o objeto  
            }

            // alert(corretas.size); //pega o tamanho
            mostrarTotal.textContent = `${corretas.size} de ${totalDePerguntas}`;
        }

        //pega o item clonado e busca o dl e adiciona como filho o dt
        quizItem.querySelector("dl").appendChild(dt);

    }

    //deleta o resposta A
    quizItem.querySelector("dl dt").remove();

    //adiciona um filho ao quiz
    quiz.appendChild(quizItem);
}
