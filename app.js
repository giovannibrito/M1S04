limpaFormulario();
const contasUsuarios = [
    {
        conta: 1000,
        senha: "123",
    },
];
const botaoEnviaCadastro = document.querySelector(".btn-enviar-cadastro");
const botaoEnviaLogin = document.querySelector(".btn-enviar-login");
const botaoLimpa = document.querySelector(".btn-limpar");

const regexCPF = /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/;
const regexCelular = /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/;

botaoEnviaCadastro.addEventListener("click", enviaFormularioCadastro);
botaoEnviaLogin.addEventListener("click", enviaFormularioLogin);
botaoLimpa.addEventListener("click", limpaFormulario);

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
    console.log(conta);
    console.log("saque", valor);
}

function realizaDeposito(conta, valor) {
    console.log(conta);
    console.log("deposito", valor);
}

function consultaSaldo(conta) {
    console.log(conta);
    console.log("saldo", conta.saldo);
}
