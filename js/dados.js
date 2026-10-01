/* Dados do site: o conteúdo fica separado da marcação para ser reaproveitado pelos templates. */
(function (Patas) {
  'use strict';

  Patas.dados = {
    projetos: [
      {
        selo: 'selo-resgate',
        categoria: 'Resgate',
        titulo: 'Resgate de Rua',
        texto: 'Equipe de plantão que atende chamados de animais feridos, doentes ou abandonados em vias públicas. Já são mais de 900 resgates realizados.'
      },
      {
        selo: 'selo-acolhimento',
        categoria: 'Acolhimento',
        titulo: 'Lar Temporário',
        texto: 'Rede de voluntários que hospedam animais resgatados até a adoção definitiva, evitando a superlotação do abrigo físico.'
      },
      {
        selo: 'selo-adocao',
        categoria: 'Adoção',
        titulo: 'Feira de Adoção',
        texto: 'Eventos mensais que já conectaram mais de 600 animais a novas famílias, sempre com entrevista prévia e contrato de adoção responsável.'
      },
      {
        selo: 'selo-saude',
        categoria: 'Saúde',
        titulo: 'Educação e Castração',
        texto: 'Campanhas gratuitas de castração e palestras sobre posse responsável em escolas e associações de bairro.'
      }
    ],

    valores: [
      { icone: '🤲', titulo: 'Resgate com respeito', texto: 'Cada resgate é feito com calma e técnica, respeitando o medo e o tempo de cada animal.' },
      { icone: '📋', titulo: 'Adoção responsável', texto: 'Toda adoção passa por entrevista e acompanhamento, para que o novo lar seja definitivo.' },
      { icone: '🔎', titulo: 'Transparência', texto: 'Prestamos contas de cada doação recebida e do destino de cada recurso arrecadado.' }
    ],

    numeros: [
      { valor: '920', legenda: 'animais resgatados' },
      { valor: '640', legenda: 'adoções concluídas' },
      { valor: '1.200+', legenda: 'castrações realizadas' },
      { valor: '150', legenda: 'voluntários ativos' }
    ],

    depoimentos: [
      { texto: 'Adotei a Mel há dois anos e ela virou a razão de eu acordar mais cedo pra passear. Foi a melhor decisão da minha vida.', autor: 'Renata, adotante da cadela Mel' },
      { texto: 'Ser lar temporário mudou minha rotina, mas também mudou minha forma de ver o mundo. Já acolhi seis cachorros até hoje.', autor: 'Diego, voluntário de lar temporário' },
      { texto: 'A equipe me acompanhou em todo o processo de adoção do Tico. Hoje ele dorme aos meus pés todas as noites.', autor: 'Fábio, adotante do gato Tico' }
    ],

    contato: [
      { rotulo: 'E-mail', valor: 'contato@patasqueacolhem.org.br' },
      { rotulo: 'Telefone', valor: '(11) 4003-7715' },
      { rotulo: 'Endereço', valor: 'Rua dos Girassóis, 88 — Bairro Vila Nova, São Paulo/SP' }
    ],

    conta: [
      { rotulo: 'Banco', valor: 'Banco Comunidade S.A.' },
      { rotulo: 'Agência', valor: '0002' },
      { rotulo: 'Conta corrente', valor: '00000-1' },
      { rotulo: 'Titular', valor: 'Instituto Patas Que Acolhem' }
    ],

    itensDoacao: [
      'Ração para cães e gatos, filhotes e adultos',
      'Medicamentos e antipulgas dentro da validade',
      'Cobertores, toalhas e caixas de transporte',
      'Areia higiênica e produtos de limpeza'
    ],

    passosVoluntario: [
      ['Preencha o formulário de interesse', 'com seus dados e disponibilidade de horário.'],
      ['Participe de uma conversa', 'com a equipe de voluntariado, presencial ou por vídeo.'],
      ['Escolha uma frente de atuação', 'de acordo com seu perfil e disponibilidade.'],
      ['Comece sua jornada', 'acompanhado por um voluntário mais experiente nas primeiras semanas.']
    ],

    areasVoluntario: [
      'Resgate e transporte de animais — projeto Resgate de Rua',
      'Hospedagem temporária em casa — projeto Lar Temporário',
      'Apoio na organização das feiras — projeto Feira de Adoção',
      'Divulgação e cadastro em campanhas — projeto Educação e Castração'
    ],

    perguntas: [
      { pergunta: 'Posso destinar minha doação a um animal específico?', resposta: 'Sim. Basta informar o nome do animal na mensagem da transferência ou avisar pelo e-mail de contato após doar pelo Pix.' },
      { pergunta: 'Existe idade mínima para ser voluntário?', resposta: 'Sim, a partir de 16 anos, com autorização de um responsável para menores de 18 anos.' },
      { pergunta: 'Posso ser lar temporário morando de aluguel?', resposta: 'Sim, desde que o contrato ou o proprietário permita animais no imóvel. Pedimos apenas uma confirmação simples antes de encaminhar um animal.' },
      { pergunta: 'Como acompanho o uso das doações recebidas?', resposta: 'Publicamos anualmente um relatório de transparência com a origem e o destino de cada recurso arrecadado, disponível mediante solicitação por e-mail.' }
    ],

    estados: [
      ['AC', 'Acre'], ['AL', 'Alagoas'], ['AP', 'Amapá'], ['AM', 'Amazonas'], ['BA', 'Bahia'],
      ['CE', 'Ceará'], ['DF', 'Distrito Federal'], ['ES', 'Espírito Santo'], ['GO', 'Goiás'],
      ['MA', 'Maranhão'], ['MT', 'Mato Grosso'], ['MS', 'Mato Grosso do Sul'], ['MG', 'Minas Gerais'],
      ['PA', 'Pará'], ['PB', 'Paraíba'], ['PR', 'Paraná'], ['PE', 'Pernambuco'], ['PI', 'Piauí'],
      ['RJ', 'Rio de Janeiro'], ['RN', 'Rio Grande do Norte'], ['RS', 'Rio Grande do Sul'],
      ['RO', 'Rondônia'], ['RR', 'Roraima'], ['SC', 'Santa Catarina'], ['SP', 'São Paulo'],
      ['SE', 'Sergipe'], ['TO', 'Tocantins']
    ],

    interesses: [
      ['adotar', 'Quero adotar um animal'],
      ['lar-temporario', 'Quero ser lar temporário'],
      ['voluntario', 'Quero ser voluntário de resgate ou eventos'],
      ['apadrinhar', 'Quero apadrinhar um animal']
    ]
  };
})(window.Patas = window.Patas || {});
