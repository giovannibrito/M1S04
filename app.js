limpaFormulario();
const contasUsuarios = [];

const botaoNavInicio = document.querySelector(".btn-nav-inicio");
const botaoNavCadastro = document.querySelector(".btn-nav-cadastro");
const botaoEnviaLogin = document.querySelector(".btn-enviar-login");
const botaoEnviaCadastro = document.querySelector(".btn-enviar-cadastro");
const botaoLimpa = document.querySelector(".btn-limpar");
const formLogin = document.querySelector(".formulario-operacoes");
const formCadastro = document.querySelector(".formulario-cadastro");
const selectOperacao = document.querySelector("#operacao");

const regexCPF = /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/;
const regexCelular = /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/;

botaoNavInicio.addEventListener("click", exibeTelaInicio);
botaoNavCadastro.addEventListener("click", exibeTelaCadastro);
botaoEnviaCadastro.addEventListener("click", enviaFormularioCadastro);
botaoEnviaLogin.addEventListener("click", enviaFormularioLogin);
botaoLimpa.addEventListener("click", limpaFormulario);
selectOperacao.addEventListener("change", verificaOperacaoSelecionada);

function enviaFormularioCadastro() {
    const novaConta = {};
    const inputs = document.querySelectorAll(".formulario-cadastro input:not([type=button])");
    inputs.forEach((input) => (novaConta[input.name] = input.value));

    if (novaConta.nome == "") {
        alert("Por favor insira um nome");
        return;
    }
    if (!regexCPF.test(novaConta.cpf)) {
        alert("Por favor insira o CPF no formato correto");
        return;
    }
    if (!regexCelular.test(novaConta.celular)) {
        alert("Por favor insira o número de celular no formato correto");
        return;
    }
    if (novaConta.senha.length === 0 || novaConta.senha != novaConta.senha2) {
        alert("Por favor confira as senhas inseridas");
        return;
    }

    delete novaConta.senha2;
    novaConta.conta = Math.floor(1000 + Math.random() * 90000);
    novaConta.saldo = 0;
    alert(`Conta criada com sucesso. Número da conta: ${novaConta.conta}`);
    contasUsuarios.push(novaConta);
    limpaFormulario();
}

function enviaFormularioLogin() {
    const operacao = {};
    const inputs = document.querySelectorAll(
        ".formulario-operacoes input:not([type=button]), .formulario-operacoes select"
    );
    inputs.forEach((input) => (operacao[input.name] = input.value));
    verificaLogin(operacao);
}

function limpaFormulario() {
    const inputs = document.querySelectorAll("form input:not([type=button])");
    inputs.forEach((input) => (input.value = ""));
}

function verificaLogin(objetoLogin) {
    const contaLogin = contasUsuarios.find((conta) => conta.conta === Number(objetoLogin.numeroConta));
    if (!contaLogin) {
        alert("Conta não encontrada");
        return;
    }
    if (contaLogin.senha != objetoLogin.senha) {
        alert("Senha inválida");
        return;
    }

    switch (objetoLogin.operacao) {
        case "saque":
            realizaSaque(contaLogin, Number(objetoLogin.valorOperacao));
            break;
        case "deposito":
            realizaDeposito(contaLogin, Number(objetoLogin.valorOperacao));
            break;
        case "saldo":
            consultaSaldo(contaLogin);
            break;
    }
}

function realizaSaque(conta, valor) {
    if (valor <= 0) {
        alert("Valor inválido");
        return;
    }
    if (conta.saldo < valor) {
        alert(`Saldo insuficiente. Seu saldo atual é de R$ ${conta.saldo.toFixed(2)}`);
        return;
    }
    conta.saldo -= valor;
    alert(`Saque de R$ ${valor.toFixed(2)} efetuado com sucesso! Seu novo saldo é R$ ${conta.saldo.toFixed(2)}`);
    limpaFormulario();
}

function realizaDeposito(conta, valor) {
    if (valor <= 0) {
        alert("Valor inválido");
        return;
    }
    conta.saldo += valor;
    alert(`Depósito de R$ ${valor.toFixed(2)} efetuado com sucesso! Seu novo saldo é R$ ${conta.saldo.toFixed(2)}`);
    limpaFormulario();
}

function consultaSaldo(conta) {
    alert(`Seu saldo atual é de R$ ${conta.saldo.toFixed(2)}`);
    limpaFormulario();
}

function exibeTelaInicio(event) {
    event.preventDefault();
    limpaFormulario();
    formLogin.classList.remove("hidden");
    formCadastro.classList.add("hidden");
}

function exibeTelaCadastro(event) {
    event.preventDefault();
    limpaFormulario();
    formLogin.classList.add("hidden");
    formCadastro.classList.remove("hidden");
}

function verificaOperacaoSelecionada(event) {
    const inputValor = document.querySelector("#valorOperacao");
    if (event.target.value === "saldo") {
        inputValor.setAttribute("disabled", "");
        inputValor.value = "";
    } else {
        inputValor.removeAttribute("disabled");
    }
}
