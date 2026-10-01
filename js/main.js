/* Ponto de entrada: liga os módulos quando a página termina de carregar. */
(function (Patas) {
  'use strict';

  function iniciar() {
    Patas.roteador.iniciar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})(window.Patas);
