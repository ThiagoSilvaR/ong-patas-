/* Templates reutilizáveis: cada função recebe dados e devolve um trecho de HTML. */
(function (Patas) {
  'use strict';

  function escapar(texto) {
    return String(texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function juntar(lista, gerar) {
    return lista.map(gerar).join('');
  }

  function cartaoValor(valor) {
    return `
      <div class="valor-item">
        <span class="valor-icone" aria-hidden="true">${valor.icone}</span>
        <h3>${escapar(valor.titulo)}</h3>
        <p>${escapar(valor.texto)}</p>
      </div>`;
  }

  function cartaoProjeto(projeto, etiqueta) {
    const tag = etiqueta || 'div';
    return `
      <${tag} class="projeto-item">
        <span class="selo ${escapar(projeto.selo)}">${escapar(projeto.categoria)}</span>
        <h3>${escapar(projeto.titulo)}</h3>
        <p>${escapar(projeto.texto)}</p>
      </${tag}>`;
  }

  function itemNumero(numero) {
    return `
      <div class="numero-item">
        <span class="numero">${escapar(numero.valor)}</span>
        <span class="numero-legenda">${escapar(numero.legenda)}</span>
      </div>`;
  }

  function depoimento(item) {
    return `
      <blockquote>
        <p>“${escapar(item.texto)}”</p>
        <cite>— ${escapar(item.autor)}</cite>
      </blockquote>`;
  }

  function pergunta(item) {
    return `
      <details class="pergunta">
        <summary>${escapar(item.pergunta)}</summary>
        <p>${escapar(item.resposta)}</p>
      </details>`;
  }

  function dadoContato(item) {
    return `
        <div>
          <strong>${escapar(item.rotulo)}</strong>
          <p>${escapar(item.valor)}</p>
        </div>`;
  }

  function linhaTabela(item) {
    return `<tr><th scope="row">${escapar(item.rotulo)}</th><td>${escapar(item.valor)}</td></tr>`;
  }

  function alerta(tipo, icone, conteudoHtml, extras) {
    return `
      <div class="alerta alerta-${tipo}" ${extras || 'role="status"'}>
        <span class="alerta-icone" aria-hidden="true">${icone}</span>
        <p>${conteudoHtml}</p>
      </div>`;
  }

  function imagemPrincipal(descricao) {
    return `
        <img
          src="../imagens/maos-e-patas.webp"
          alt="${escapar(descricao)}"
          class="sobre-imagem"
          width="1000"
          height="667"
          loading="lazy">`;
  }

  /* Campos de formulário: rótulo, controle e espaço para a mensagem de erro. */
  function campoEntrada(config) {
    const atributos = [
      `type="${config.tipo || 'text'}"`,
      `id="${config.id}"`,
      `name="${config.id}"`,
      `aria-describedby="erro-${config.id}"`,
      config.autocomplete ? `autocomplete="${config.autocomplete}"` : '',
      config.inputmode ? `inputmode="${config.inputmode}"` : '',
      config.placeholder ? `placeholder="${escapar(config.placeholder)}"` : '',
      config.pattern ? `pattern="${escapar(config.pattern)}"` : '',
      config.title ? `title="${escapar(config.title)}"` : '',
      config.maxlength ? `maxlength="${config.maxlength}"` : '',
      config.max ? `max="${config.max}"` : '',
      'required'
    ].filter(Boolean).join('\n              ');

    return `
          <div class="campo${config.classe ? " " + config.classe : ""}">
            <label for="${config.id}">${escapar(config.rotulo)}</label>
            <input
              ${atributos}>
            <p class="campo-erro" id="erro-${config.id}" aria-live="polite"></p>
          </div>`;
  }

  function campoSelecao(config) {
    return `
          <div class="campo${config.classe ? " " + config.classe : ""}">
            <label for="${config.id}">${escapar(config.rotulo)}</label>
            <select id="${config.id}" name="${config.id}" aria-describedby="erro-${config.id}"${config.autocomplete ? ` autocomplete="${config.autocomplete}"` : ''} required>
              <option value="">Selecione</option>
              ${juntar(config.opcoes, function (opcao) {
                return `<option value="${escapar(opcao[0])}">${escapar(opcao[1])}</option>`;
              })}
            </select>
            <p class="campo-erro" id="erro-${config.id}" aria-live="polite"></p>
          </div>`;
  }

  function campoTextoLongo(config) {
    return `
          <div class="campo">
            <label for="${config.id}">${escapar(config.rotulo)}</label>
            <textarea
              id="${config.id}"
              name="${config.id}"
              rows="4"
              maxlength="${config.maxlength}"
              aria-describedby="erro-${config.id} contador-${config.id}"
              placeholder="${escapar(config.placeholder)}"></textarea>
            <span class="campo-contador" id="contador-${config.id}">0 / ${config.maxlength}</span>
            <p class="campo-erro" id="erro-${config.id}" aria-live="polite"></p>
          </div>`;
  }

  Patas.templates = {
    escapar: escapar,
    juntar: juntar,
    cartaoValor: cartaoValor,
    cartaoProjeto: cartaoProjeto,
    itemNumero: itemNumero,
    depoimento: depoimento,
    pergunta: pergunta,
    dadoContato: dadoContato,
    linhaTabela: linhaTabela,
    alerta: alerta,
    imagemPrincipal: imagemPrincipal,
    campoEntrada: campoEntrada,
    campoSelecao: campoSelecao,
    campoTextoLongo: campoTextoLongo
  };
})(window.Patas = window.Patas || {});
