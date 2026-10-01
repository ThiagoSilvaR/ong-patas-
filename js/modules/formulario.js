/* Comportamento do formulário de cadastro: máscaras, validação, rascunho e envio. */
(function (Patas) {
  'use strict';

  const t = Patas.templates;

  function rotuloInteresse(valor) {
    const item = Patas.dados.interesses.find(function (opcao) { return opcao[0] === valor; });
    return item ? item[1] : valor;
  }

  function mostrarErro(campo, mensagem) {
    const erro = document.getElementById('erro-' + campo.id);
    if (erro) erro.textContent = mensagem;
    if (mensagem) {
      campo.setAttribute('aria-invalid', 'true');
    } else if (campo.value.trim() !== '' || campo.required) {
      campo.setAttribute('aria-invalid', 'false');
    } else {
      campo.removeAttribute('aria-invalid');
    }
  }

  function validarEMostrar(campo) {
    const mensagem = Patas.validacao.validarCampo(campo);
    mostrarErro(campo, mensagem);
    return mensagem;
  }

  function coletarDados(formulario) {
    const dados = {};
    Array.prototype.forEach.call(formulario.elements, function (campo) {
      if (campo.name && campo.type !== 'submit') dados[campo.name] = campo.value;
    });
    return dados;
  }

  function limparEstados(formulario) {
    Array.prototype.forEach.call(formulario.elements, function (campo) {
      if (!campo.name) return;
      campo.removeAttribute('aria-invalid');
      const erro = document.getElementById('erro-' + campo.id);
      if (erro) erro.textContent = '';
    });
    delete formulario.dataset.tentouEnviar;
    atualizarContador(formulario);
  }

  function atualizarContador(formulario) {
    const mensagem = formulario.elements.mensagem;
    const contador = document.getElementById('contador-mensagem');
    if (mensagem && contador) {
      contador.textContent = mensagem.value.length + ' / ' + mensagem.maxLength;
    }
  }

  function preencher(formulario, dados) {
    Object.keys(dados).forEach(function (nome) {
      const campo = formulario.elements[nome];
      if (campo && typeof dados[nome] === 'string') campo.value = dados[nome];
    });
    atualizarContador(formulario);
  }

  function rascunhoTemConteudo(dados) {
    return !!dados && Object.keys(dados).some(function (nome) { return String(dados[nome]).trim() !== ''; });
  }

  function mostrarAvisoRascunho(raiz, formulario) {
    const area = raiz.querySelector('#rascunho-aviso');
    area.innerHTML = t.alerta(
      'sucesso',
      '💾',
      'Recuperamos os dados que você tinha começado a preencher. <button type="button" class="link-botao" id="descartar-rascunho">Descartar rascunho</button>'
    );
    area.querySelector('#descartar-rascunho').addEventListener('click', function () {
      Patas.armazenamento.limparRascunho();
      formulario.reset();
      limparEstados(formulario);
      area.innerHTML = '';
      Patas.avisos.mostrar('Rascunho descartado.', 'informacao');
    });
  }

  function mostrarResumoErros(raiz, erros) {
    const resumo = raiz.querySelector('#resumo-erros');
    if (erros.length === 0) {
      resumo.innerHTML = '';
      return;
    }
    const itens = t.juntar(erros, function (erro) {
      const rotulo = document.querySelector('label[for="' + erro.campo.id + '"]');
      return '<li>' + t.escapar(rotulo ? rotulo.textContent : erro.campo.name) + ': ' + t.escapar(erro.mensagem) + '</li>';
    });
    resumo.innerHTML =
      '<div class="alerta alerta-perigo" role="alert">' +
        '<span class="alerta-icone" aria-hidden="true">⚠️</span>' +
        '<div><p><strong>Não foi possível enviar o cadastro.</strong> Corrija ' +
        (erros.length === 1 ? 'o campo abaixo' : 'os ' + erros.length + ' campos abaixo') + ':</p>' +
        '<ul>' + itens + '</ul></div>' +
      '</div>';
  }

  function mostrarCadastrosSalvos(raiz) {
    const area = raiz.querySelector('#cadastros-salvos');
    const lista = Patas.armazenamento.listarCadastros();

    if (lista.length === 0) {
      area.innerHTML = '';
      return;
    }

    const recentes = lista.slice(-5).reverse();
    const itens = t.juntar(recentes, function (cadastro) {
      const data = new Date(cadastro.criadoEm).toLocaleDateString('pt-BR');
      return '<li>' + t.escapar(cadastro.nome) + ' — ' + t.escapar(rotuloInteresse(cadastro.interesse)) + ' (' + data + ')</li>';
    });

    area.innerHTML =
      '<div class="cadastros-salvos">' +
        '<h2>Cadastros guardados neste navegador (' + lista.length + ')</h2>' +
        '<ul>' + itens + '</ul>' +
        '<button type="button" class="botao" id="limpar-cadastros">Apagar cadastros guardados</button>' +
      '</div>';

    area.querySelector('#limpar-cadastros').addEventListener('click', function () {
      Patas.armazenamento.limparCadastros();
      mostrarCadastrosSalvos(raiz);
      Patas.avisos.mostrar('Os cadastros guardados foram apagados.', 'informacao');
    });
  }

  function montar(raiz) {
    const formulario = raiz.querySelector('#form-cadastro');
    if (!formulario) return;

    const mascaras = {
      cpf: Patas.mascaras.cpf,
      telefone: Patas.mascaras.telefone,
      cep: Patas.mascaras.cep
    };

    const rascunho = Patas.armazenamento.lerRascunho();
    if (rascunhoTemConteudo(rascunho)) {
      preencher(formulario, rascunho);
      mostrarAvisoRascunho(raiz, formulario);
    }
    mostrarCadastrosSalvos(raiz);

    Array.prototype.forEach.call(formulario.elements, function (campo) {
      if (!campo.name) return;

      campo.addEventListener('input', function () {
        if (mascaras[campo.name]) campo.value = mascaras[campo.name](campo.value);
        if (campo.name === 'mensagem') atualizarContador(formulario);
        if (formulario.dataset.tentouEnviar || campo.getAttribute('aria-invalid') === 'true') validarEMostrar(campo);
        Patas.armazenamento.salvarRascunho(coletarDados(formulario));
      });

      campo.addEventListener('blur', function () {
        if (campo.value.trim() !== '' || formulario.dataset.tentouEnviar) validarEMostrar(campo);
      });
    });

    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      formulario.dataset.tentouEnviar = 'true';

      const resultado = Patas.validacao.validarFormulario(formulario);
      Array.prototype.forEach.call(formulario.elements, function (campo) {
        if (campo.name) validarEMostrar(campo);
      });
      mostrarResumoErros(raiz, resultado.erros);

      if (!resultado.valido) {
        resultado.erros[0].campo.focus();
        return;
      }

      const total = Patas.armazenamento.adicionarCadastro(coletarDados(formulario));
      Patas.armazenamento.limparRascunho();
      formulario.reset();
      limparEstados(formulario);
      raiz.querySelector('#rascunho-aviso').innerHTML = '';
      mostrarCadastrosSalvos(raiz);
      Patas.avisos.mostrar('Cadastro enviado! Nossa equipe entrará em contato em breve. (' + total + ' guardado(s) neste navegador)', 'sucesso');
    });
  }

  Patas.formulario = { montar: montar };
})(window.Patas = window.Patas || {});
