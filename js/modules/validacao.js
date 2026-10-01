/* Regras de validação do formulário de cadastro. */
(function (Patas) {
  'use strict';

  function digitos(valor) {
    return String(valor).replace(/\D/g, '');
  }

  function validarNome(valor) {
    const nome = String(valor).trim();
    return nome.length >= 3 && nome.length <= 100 && /^[A-Za-zÀ-ÿ\s]+$/.test(nome);
  }

  function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(valor).trim());
  }

  function validarCPF(valor) {
    const d = digitos(valor);
    if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;

    function digitoVerificador(quantidade) {
      let soma = 0;
      for (let i = 0; i < quantidade; i++) {
        soma += Number(d[i]) * (quantidade + 1 - i);
      }
      const resto = (soma * 10) % 11;
      return resto === 10 ? 0 : resto;
    }

    return digitoVerificador(9) === Number(d[9]) && digitoVerificador(10) === Number(d[10]);
  }

  function validarTelefone(valor) {
    return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(String(valor).trim());
  }

  function validarCEP(valor) {
    return /^\d{5}-\d{3}$/.test(String(valor).trim());
  }

  function validarNascimento(valor, dataMaxima) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return 'invalida';
    const data = new Date(valor + 'T00:00:00');
    if (Number.isNaN(data.getTime()) || data.toISOString().slice(0, 10) !== valor) return 'invalida';
    if (data.getFullYear() < 1900) return 'invalida';
    if (dataMaxima && valor > dataMaxima) return 'muito-recente';
    return 'ok';
  }

  const MENSAGENS_VAZIO = {
    SELECT: 'Escolha uma opção da lista.',
    padrao: 'Preencha este campo.'
  };

  const regras = {
    nome: function (valor) {
      return validarNome(valor) ? '' : 'Digite o nome completo, só com letras e espaços (mínimo de 3 caracteres).';
    },
    email: function (valor) {
      return validarEmail(valor) ? '' : 'Digite um e-mail válido, como voce@exemplo.com.';
    },
    nascimento: function (valor, campo) {
      const resultado = validarNascimento(valor, campo.getAttribute('max'));
      if (resultado === 'invalida') return 'Informe uma data de nascimento válida.';
      if (resultado === 'muito-recente') return 'A data precisa ser anterior ao limite de idade permitido.';
      return '';
    },
    cpf: function (valor) {
      if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor)) return 'Digite o CPF no formato 000.000.000-00.';
      return validarCPF(valor) ? '' : 'Esse CPF não é válido. Confira os números digitados.';
    },
    telefone: function (valor) {
      return validarTelefone(valor) ? '' : 'Digite o telefone no formato (00) 00000-0000.';
    },
    cep: function (valor) {
      return validarCEP(valor) ? '' : 'Digite o CEP no formato 00000-000.';
    },
    mensagem: function (valor, campo) {
      const limite = Number(campo.getAttribute('maxlength')) || 500;
      return valor.length <= limite ? '' : 'A mensagem pode ter no máximo ' + limite + ' caracteres.';
    }
  };

  function validarCampo(campo) {
    const valor = campo.value.trim();
    const obrigatorio = campo.required;

    if (valor === '') {
      return obrigatorio ? (MENSAGENS_VAZIO[campo.tagName] || MENSAGENS_VAZIO.padrao) : '';
    }

    const regra = regras[campo.name];
    return regra ? regra(valor, campo) : '';
  }

  function validarFormulario(formulario) {
    const erros = [];
    Array.prototype.forEach.call(formulario.elements, function (campo) {
      if (!campo.name || campo.type === 'submit' || campo.type === 'button') return;
      const mensagem = validarCampo(campo);
      if (mensagem) erros.push({ campo: campo, mensagem: mensagem });
    });
    return { valido: erros.length === 0, erros: erros };
  }

  Patas.validacao = {
    validarNome: validarNome,
    validarEmail: validarEmail,
    validarCPF: validarCPF,
    validarTelefone: validarTelefone,
    validarCEP: validarCEP,
    validarNascimento: validarNascimento,
    validarCampo: validarCampo,
    validarFormulario: validarFormulario
  };
})(window.Patas = window.Patas || {});
