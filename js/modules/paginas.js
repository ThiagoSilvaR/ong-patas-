/* Páginas da SPA: cada uma monta seu HTML a partir dos dados e dos templates. */
(function (Patas) {
  'use strict';

  const t = Patas.templates;
  const d = Patas.dados;

  const DESCRICAO_IMAGEM = 'Duas mãos humanas segurando com carinho as patas de um cachorro, uma delas com uma mancha em formato de coração, simbolizando o vínculo entre o Instituto Patas Que Acolhem e os animais resgatados.';
  const DESCRICAO_IMAGEM_PROJETOS = 'Duas mãos humanas segurando com carinho as patas de um cachorro, simbolizando as diferentes frentes de cuidado do Instituto Patas Que Acolhem.';

  function inicio() {
    return `
  <section class="destaque">
    <div class="caixa destaque-grade">
      <div class="destaque-conteudo">
        <span class="destaque-etiqueta">Proteção animal desde 2016</span>
        <h1>Toda vida de quatro patas merece um lugar para chamar de lar.</h1>
        <p class="destaque-texto">
          Há 9 anos resgatamos, cuidamos e encontramos famílias para animais abandonados,
          um focinho de cada vez.
        </p>
        <a href="#/inicio/contato" class="botao">Quero ajudar</a>
      </div>
      <div class="destaque-emblema" aria-hidden="true">
        <span>🐾</span>
      </div>
    </div>
  </section>

  <section id="sobre" class="secao sobre">
    <div class="caixa">
      <h2>Quem somos</h2>
      <div class="sobre-colunas">
        <div class="sobre-texto">
          <p>
            O <strong>Instituto Patas Que Acolhem</strong> nasceu em 2016, quando um grupo
            de amigos cansou de ver animais soltos e feridos nas ruas do bairro e decidiu
            fazer alguma coisa a respeito. Começamos com uma van emprestada e uma caixa de
            doações; hoje somos uma rede de mais de 150 voluntários, um abrigo temporário
            e dezenas de lares que abrem a porta para quem mais precisa.
          </p>
          <p>
            Trabalhamos com resgate de animais em situação de rua, cuidados veterinários,
            campanhas de castração e um processo de adoção responsável, sempre com
            acompanhamento antes e depois da adoção. Porque adotar é um compromisso,
            não um impulso.
          </p>
        </div>
        ${t.imagemPrincipal(DESCRICAO_IMAGEM)}
      </div>

      <div class="valores" id="valores">${t.juntar(d.valores, t.cartaoValor)}
      </div>
    </div>
  </section>

  <section id="projetos" class="secao projetos">
    <div class="caixa">
      <h2>Nossos projetos</h2>
      <div class="projetos-colunas">${t.juntar(d.projetos, function (p) { return t.cartaoProjeto(p, 'div'); })}
      </div>

      <p class="projetos-cta">
        <a href="#/projetos" class="botao">Conheça todos os projetos, como doar e como ser voluntário</a>
      </p>
    </div>
  </section>

  <section id="impacto" class="secao impacto">
    <div class="caixa">
      <h2>Impacto em números</h2>
      <div class="numeros-colunas">${t.juntar(d.numeros, t.itemNumero)}
      </div>
    </div>
  </section>

  <section id="depoimentos" class="secao depoimentos">
    <div class="caixa">
      <h2>Vozes que ganharam um novo lar</h2>
      <div class="depoimentos-colunas">${t.juntar(d.depoimentos, t.depoimento)}
      </div>
    </div>
  </section>

  <section id="contato" class="secao contato">
    <div class="caixa">
      <div class="contato-grade">
        <div class="contato-painel">
          <h2>Faça parte dessa matilha</h2>
          <p>
            Toda ajuda importa — uma doação, um fim de semana como voluntário, ou
            simplesmente compartilhar um animal para adoção. Fale com a gente.
          </p>
        </div>
        <div class="contato-dados">${t.juntar(d.contato, t.dadoContato)}
        </div>
      </div>
    </div>
  </section>`;
  }

  function projetos() {
    const alertaDoacao = t.alerta('sucesso', '✅', 'Toda doação recebe um recibo por e-mail, com o destino do valor.');
    const alertaVoluntario = t.alerta('aviso', '📌', 'Menores de 18 anos precisam da autorização de um responsável para participar.');
    const alertaGolpe = t.alerta('perigo', '⚠️', '<strong>Atenção:</strong> nunca pedimos senhas nem transferências fora dos canais oficiais desta página.', 'role="alert"');

    return `
  <section class="destaque">
    <div class="caixa destaque-grade">
      <div class="destaque-conteudo">
        <span class="destaque-etiqueta">Doação e voluntariado</span>
        <h1>Sua doação e seu tempo salvam vidas de verdade.</h1>
        <p class="destaque-texto">
          Conheça nossas frentes de atuação e todos os caminhos possíveis para ajudar:
          doando, apadrinhando ou dedicando algumas horas da sua semana como voluntário.
        </p>
        <a href="#/projetos/doacao" class="botao">Quero doar</a>
      </div>
      <div class="destaque-emblema" aria-hidden="true">
        <span>🐶</span>
      </div>
    </div>
  </section>

  <section id="frentes" class="secao projetos">
    <div class="caixa">
      <h2>Nossas frentes de atuação</h2>

      <div class="sobre-colunas frentes-intro">
        <div class="sobre-texto">
          <p>
            Cada frente de atuação nasceu de uma necessidade real que a equipe encontrou
            nas ruas: animais feridos sem atendimento, abrigos lotados e famílias que
            queriam adotar com responsabilidade, mas não sabiam por onde começar. Conheça
            abaixo os quatro projetos que sustentam o trabalho do Instituto Patas Que Acolhem.
          </p>
        </div>
        ${t.imagemPrincipal(DESCRICAO_IMAGEM_PROJETOS)}
      </div>

      <div class="projetos-colunas">${t.juntar(d.projetos, function (p) { return t.cartaoProjeto(p, 'article'); })}
      </div>
    </div>
  </section>

  <section id="doacao" class="secao doacao">
    <div class="caixa">
      <h2>Como doar</h2>
      <p class="secao-intro">
        Cada doação é registrada e destinada a uma das nossas frentes de atuação.
        Ao final do ano, publicamos um relatório aberto de prestação de contas.
      </p>
      ${alertaDoacao}

      <div class="doacao-colunas">
        <div class="doacao-metodo">
          <h3>Pix</h3>
          <p>A forma mais rápida de doar, com confirmação imediata.</p>
          <button type="button" class="botao botao-escuro" data-bs-toggle="modal" data-bs-target="#janela-pix">Ver chave Pix</button>
        </div>

        <div class="doacao-metodo">
          <h3>Transferência bancária</h3>
          <table class="doacao-tabela">
            <tbody>${t.juntar(d.conta, t.linhaTabela)}
            </tbody>
          </table>
        </div>

        <div class="doacao-metodo">
          <h3>Doação de itens</h3>
          <p>Recebemos itens em nossa sede, de terça a sábado:</p>
          <ul>${t.juntar(d.itensDoacao, function (item) { return `<li>${t.escapar(item)}</li>`; })}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="voluntariado" class="secao voluntariado">
    <div class="caixa">
      <h2>Como ser voluntário</h2>
      <p class="secao-intro">
        Não é preciso ter experiência prévia: cada novo voluntário recebe orientação
        e acompanhamento da equipe antes de começar.
      </p>

      <ol class="voluntariado-passos">${t.juntar(d.passosVoluntario, function (passo) {
        return `
        <li><strong>${t.escapar(passo[0])}</strong> ${t.escapar(passo[1])}</li>`;
      })}
      </ol>

      <h3>Áreas que precisam de voluntários agora</h3>
      <ul class="voluntariado-areas">${t.juntar(d.areasVoluntario, function (area) { return `<li>${t.escapar(area)}</li>`; })}
      </ul>
      ${alertaVoluntario}

      <p class="projetos-cta">
        <a href="#/cadastro" class="botao">Quero me cadastrar</a>
      </p>
    </div>
  </section>

  <section id="perguntas" class="secao perguntas">
    <div class="caixa">
      <h2>Perguntas frequentes</h2>${t.juntar(d.perguntas, t.pergunta)}
      ${alertaGolpe}
    </div>
  </section>`;
  }

  function cadastro() {
    const aviso = t.alerta(
      'informacao',
      'ℹ️',
      'Seus dados são usados apenas para contato sobre adoção, apadrinhamento e voluntariado — nunca compartilhamos suas informações com terceiros. Veja nossos <button type="button" class="link-botao" data-bs-toggle="modal" data-bs-target="#janela-termos">termos de uso</button>.'
    );

    return `
  <section class="secao cadastro">
    <div class="caixa cadastro-caixa">
      <h1>Cadastre-se para adotar, apadrinhar ou ser voluntário</h1>
      <p class="secao-intro">
        Preencha o formulário abaixo com seus dados. Nossa equipe entrará em contato
        para combinar os próximos passos.
      </p>
      ${aviso}

      <div id="rascunho-aviso" class="rascunho-aviso"></div>
      <div id="resumo-erros" tabindex="-1"></div>

      <form class="formulario" id="form-cadastro" action="#/cadastro" method="post" novalidate>

        <fieldset>
          <legend>Dados pessoais</legend>
          <div class="campos">
          ${t.campoEntrada({ id: 'nome', rotulo: 'Nome completo', autocomplete: 'name', placeholder: 'Digite seu nome completo', pattern: '[A-Za-zÀ-ÿ\\s]{3,100}', title: 'Digite apenas letras e espaços, com no mínimo 3 caracteres.' })}
          ${t.campoEntrada({ id: 'email', rotulo: 'E-mail', tipo: 'email', autocomplete: 'email', placeholder: 'voce@exemplo.com', classe: 'campo-metade' })}
          ${t.campoEntrada({ id: 'nascimento', rotulo: 'Data de nascimento', tipo: 'date', autocomplete: 'bday', max: '2010-01-01', classe: 'campo-metade' })}
          ${t.campoEntrada({ id: 'cpf', rotulo: 'CPF', inputmode: 'numeric', autocomplete: 'off', placeholder: '000.000.000-00', pattern: '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}', title: 'Digite o CPF no formato 000.000.000-00.', maxlength: 14, classe: 'campo-metade' })}
          ${t.campoEntrada({ id: 'telefone', rotulo: 'Telefone', tipo: 'tel', autocomplete: 'tel', placeholder: '(00) 00000-0000', pattern: '\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}', title: 'Digite o telefone no formato (00) 00000-0000.', classe: 'campo-metade' })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <div class="campos">
          ${t.campoEntrada({ id: 'cep', rotulo: 'CEP', inputmode: 'numeric', autocomplete: 'postal-code', placeholder: '00000-000', pattern: '\\d{5}-\\d{3}', title: 'Digite o CEP no formato 00000-000.', maxlength: 9, classe: 'campo-terco' })}
          ${t.campoEntrada({ id: 'endereco', rotulo: 'Endereço', autocomplete: 'address-line1', placeholder: 'Rua, número e complemento', classe: 'campo-dois-tercos' })}
          ${t.campoEntrada({ id: 'cidade', rotulo: 'Cidade', autocomplete: 'address-level2', placeholder: 'Sua cidade', classe: 'campo-metade' })}
          ${t.campoSelecao({ id: 'estado', rotulo: 'Estado', autocomplete: 'address-level1', opcoes: d.estados, classe: 'campo-metade' })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Como você quer ajudar</legend>
          <div class="campos">
          ${t.campoSelecao({ id: 'interesse', rotulo: 'Área de interesse', opcoes: d.interesses })}
          ${t.campoTextoLongo({ id: 'mensagem', rotulo: 'Mensagem (opcional)', maxlength: 500, placeholder: 'Conte um pouco sobre você, sua casa ou sua disponibilidade' })}
          </div>
        </fieldset>

        <button type="submit" class="botao">Enviar cadastro</button>
      </form>

      <div id="cadastros-salvos"></div>
    </div>
  </section>`;
  }

  function naoEncontrada() {
    return `
  <section class="secao">
    <div class="caixa cadastro-caixa">
      <h1>Página não encontrada</h1>
      <p class="secao-intro">O endereço que você tentou abrir não existe neste site.</p>
      <p class="projetos-cta"><a href="#/inicio" class="botao">Voltar para o início</a></p>
    </div>
  </section>`;
  }

  Patas.paginas = {
    inicio: { titulo: 'Instituto Patas Que Acolhem', nome: 'Início', renderizar: inicio },
    projetos: { titulo: 'Projetos, doação e voluntariado — Instituto Patas Que Acolhem', nome: 'Projetos, doação e voluntariado', renderizar: projetos },
    cadastro: { titulo: 'Cadastro — Instituto Patas Que Acolhem', nome: 'Cadastro', renderizar: cadastro },
    naoEncontrada: { titulo: 'Página não encontrada — Instituto Patas Que Acolhem', nome: 'Página não encontrada', renderizar: naoEncontrada }
  };
})(window.Patas = window.Patas || {});
