/* Avisos não obstrutivos (toast do Bootstrap) para dar retorno às ações da pessoa. */
(function (Patas) {
  'use strict';

  const ESTILOS = {
    sucesso: 'text-bg-success',
    informacao: 'text-bg-primary',
    perigo: 'text-bg-danger'
  };

  function mostrar(mensagem, tipo) {
    const area = document.getElementById('area-avisos');
    if (!area) return;

    const aviso = document.createElement('div');
    aviso.className = 'toast align-items-center border-0 ' + (ESTILOS[tipo] || ESTILOS.sucesso);
    aviso.setAttribute('role', tipo === 'perigo' ? 'alert' : 'status');
    aviso.setAttribute('aria-live', tipo === 'perigo' ? 'assertive' : 'polite');
    aviso.setAttribute('aria-atomic', 'true');
    aviso.innerHTML =
      '<div class="d-flex">' +
        '<div class="toast-body"></div>' +
        '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Fechar aviso"></button>' +
      '</div>';
    aviso.querySelector('.toast-body').textContent = mensagem;
    area.appendChild(aviso);

    aviso.addEventListener('hidden.bs.toast', function () {
      aviso.remove();
    });

    if (window.bootstrap && window.bootstrap.Toast) {
      new window.bootstrap.Toast(aviso, { delay: 6000 }).show();
    } else {
      aviso.classList.add('show');
      window.setTimeout(function () { aviso.remove(); }, 6000);
    }
  }

  Patas.avisos = { mostrar: mostrar };
})(window.Patas = window.Patas || {});
