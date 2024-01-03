function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo Advinha');
    exibirTextoNaTela('p','Digite um número de 1 à 10');
}
function exibirTextoNaTela(tag,texto){
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

function verificarChute(){
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
        let mensagem = `Parabéns,você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('h1','Acertou');
        exibirTextoNaTela('p',mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        exibirTextoNaTela('h1','Você errou :(');
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor!');
        }else{
            exibirTextoNaTela('p','O número secreto é maior!');
        }
        limparTela();
        tentativas++;
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = numerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        numerosSorteados = [];
    }
    if(numerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparTela(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    limparTela();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled','true');
}

exibirMensagemInicial();
let numerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;