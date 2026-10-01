/* Roteador da SPA: lê o endereço (#/pagina/secao), desenha a página e cuida de foco e rolagem. */
(function (Patas) {
  'use strict';

  const ROTA_PADRAO = 'inicio';
  let rotaAtual = null;
  let primeiraVez = true;

  function lerEndereco() {
    const partes = window.location.hash.replace(/^#\/?/, '').split('/');
    return {
      rota: decodeURIComponent(partes[0] || ROTA_PADRAO),
      secao: partes[1] ? decodeURIComponent(partes[1]) : ''
    };
  }

  function marcarLinkAtivo(rota) {
    document.querySelectorAll('nav a').forEach(function (link) {
      if (link.getAttribute('href') === '#/' + rota) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function fecharMenuMovel() {
    const chave = document.getElementById('menu-chave');
    if (chave) chave.checked = false;
  }

  function rolarPara(secao) {
    const alvo = secao ? document.getElementById(secao) : null;
    if (alvo) {
      alvo.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }

  function desenhar(rota) {
    const pagina = Patas.paginas[rota] || Patas.paginas.naoEncontrada;
    const principal = document.getElementById('aplicacao');

    principal.innerHTML = pagina.renderizar();
    document.title = pagina.titulo;

    if (rota === 'cadastro') Patas.formulario.montar(principal);

    const anuncio = document.getElementById('anuncio-pagina');
    if (anuncio) anuncio.textContent = 'Você está em: ' + pagina.nome;
  }

  function aoMudarEndereco() {
    const endereco = lerEndereco();

    if (endereco.rota !== rotaAtual) {
      desenhar(endereco.rota);
      rotaAtual = endereco.rota;
      marcarLinkAtivo(endereco.rota);
      if (!primeiraVez) document.getElementById('aplicacao').focus({ preventScroll: true });
    }

    fecharMenuMovel();
    rolarPara(endereco.secao);
    primeiraVez = false;
  }

  function iniciar() {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/' + ROTA_PADRAO);
    }
    window.addEventListener('hashchange', aoMudarEndereco);
    aoMudarEndereco();
  }

  Patas.roteador = { iniciar: iniciar, lerEndereco: lerEndereco };
})(window.Patas = window.Patas || {});
