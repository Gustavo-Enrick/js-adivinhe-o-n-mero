function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo Advinha');
    exibirTextoNaTela('p',`Digite um número de 1 à ${numeroLimite}`);
}
function exibirTextoNaTela(tag,texto){
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;
    falarTexto(texto);
}

function verificarChute(){
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
        let mensagem = `Parabéns,você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('h1','Acertou');
        exibirTextoNaTela('p',mensagem);
        habilitarBotao('reiniciar','sim');
        habilitarBotao('chute','não');
    }else{
        exibirTextoNaTela('h1','Você errou :(');
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor!');
        }else{
            exibirTextoNaTela('p','O número secreto é maior!');
        }
        limpaCampo();
        tentativas++;
    }
}

function gerarNumeroAleatorio(){
    const numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    const quantidadeDeElementosNaLista = numerosSorteados.length;
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

function limpaCampo(){
    document.querySelector('input').value = '';
}

function reiniciarJogo(){
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    limpaCampo();
    exibirMensagemInicial();
    habilitarBotao('reiniciar','não');
    habilitarBotao('chute','sim');
}
function habilitarBotao(nomeDoBotao, habilitar) {
    document.getElementById(nomeDoBotao).disabled = (habilitar === 'sim') ? false : true;
}

function falarTexto(textoFala){
    responsiveVoice.speak(textoFala,'Brazilian Portuguese Female',{rate:1.2});
}

let numerosSorteados = [];
const numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();