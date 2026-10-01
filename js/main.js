/* Ponto de entrada: liga os módulos quando a página termina de carregar. */
(function (Patas) {
  'use strict';

  function iniciar() {
    Patas.roteador.iniciar();

    // O link "Pular" vai direto ao conteúdo, sem acionar o roteador por hash.
    document.querySelector('.link-pular').addEventListener('click', function (evento) {
      evento.preventDefault();
      const principal = document.getElementById('aplicacao');
      principal.focus();
      principal.scrollIntoView();
    });

    // Esc fecha o submenu aberto pelo foco (WCAG 1.4.13).
    document.addEventListener('keydown', function (evento) {
      const ativo = document.activeElement;
      if (evento.key === 'Escape' && ativo && ativo.closest('.nav-suspenso')) ativo.blur();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})(window.Patas);
