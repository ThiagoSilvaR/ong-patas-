/* Máscaras de digitação para CPF, telefone e CEP. */
(function (Patas) {
  'use strict';

  function apenasDigitos(valor) {
    return String(valor).replace(/\D/g, '');
  }

  function cpf(valor) {
    const d = apenasDigitos(valor).slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return d.slice(0, 3) + '.' + d.slice(3);
    if (d.length <= 9) return d.slice(0, 3) + '.' + d.slice(3, 6) + '.' + d.slice(6);
    return d.slice(0, 3) + '.' + d.slice(3, 6) + '.' + d.slice(6, 9) + '-' + d.slice(9);
  }

  function telefone(valor) {
    const d = apenasDigitos(valor).slice(0, 11);
    if (d.length === 0) return '';
    if (d.length <= 2) return '(' + d;
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }

  function cep(valor) {
    const d = apenasDigitos(valor).slice(0, 8);
    return d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d;
  }

  Patas.mascaras = {
    apenasDigitos: apenasDigitos,
    cpf: cpf,
    telefone: telefone,
    cep: cep
  };
})(window.Patas = window.Patas || {});
