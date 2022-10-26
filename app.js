limpaFormulario();
const contasUsuarios = [];
const botaoEnvia = document.querySelector(".btn-enviar");
const botaoLimpa = document.querySelector(".btn-limpar");
const regexCPF = /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/;
const regexCelular = /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/;
botaoEnvia.addEventListener("click", enviaFormulario);
botaoLimpa.addEventListener("click", limpaFormulario);

function enviaFormulario() {
    const novaConta = {};
    const inputs = document.querySelectorAll("form input:not([type=button])");
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

function limpaFormulario() {
    const inputs = document.querySelectorAll("form input:not([type=button])");
    inputs.forEach((input) => (input.value = ""));
}
