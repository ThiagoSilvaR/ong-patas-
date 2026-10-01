# Instituto Patas Que Acolhem

Site de uma ONG fictícia de proteção animal, feito como uma SPA em HTML, CSS e JavaScript, com Bootstrap nas janelas e avisos.

**Site publicado:** https://thiagosilvar.github.io/ong-patas-/

**Versão:** 1.0.0

## Requisitos

- Navegador atual e internet (o Bootstrap vem de um CDN).
- Git.
- Para o build: PowerShell e, se quiser comprimir a imagem, o ffmpeg.

## Instalação

```bash
git clone https://github.com/ThiagoSilvaR/ong-patas-.git
cd ong-patas-
git checkout develop
```

Não há dependências para instalar (o projeto não usa npm).

## Utilização

- **Ver o site:** abra `html/index.html` no navegador.
- **Gerar a versão de produção:** `powershell -ExecutionPolicy Bypass -File scripts/build.ps1` (cria a pasta `dist/`).
- **Publicar:** é automático. O workflow roda o build a cada pull request e publica no GitHub Pages a cada push na `main`.

## Estrutura

```
.github/    Workflow de deploy e modelo de pull request
html/       Página única (index.html)
css/        reset.css e styles.css
js/         dados.js, main.js e modules/ (um arquivo por tarefa)
imagens/    Foto do site (WebP)
scripts/    build.ps1
```

## Git

O projeto segue o GitFlow:

| Branch | Função |
|---|---|
| `main` | Versões prontas, com uma tag cada |
| `develop` | Desenvolvimento |
| `feature/*` | Uma funcionalidade, a partir da `develop` |
| `release/*` | Prepara uma versão |
| `hotfix/*` | Correção urgente, a partir da `main` |

Os commits seguem o padrão `tipo: descrição` (`feat`, `fix`, `perf`, `build`, `docs`, `chore`). As versões usam versionamento semântico (v1.0.0).

## Acessibilidade

WCAG 2.1 nível AA:

- HTML semântico e link "Pular para o conteúdo".
- Foco visível, navegação por teclado e `Esc` para fechar o submenu.
- Contraste mínimo de 4,5:1 no texto e 3:1 nos campos.
- Formulário com `label`, `aria-describedby` e `aria-invalid`.
- Modo escuro e alto contraste automáticos, que seguem o sistema.

O axe-core não aponta violações nas 3 páginas.

## Desempenho

| Arquivo | Original | Produção | Com gzip |
|---|---|---|---|
| CSS | 29,6 KB | 23,0 KB | 4,9 KB |
| JavaScript | 42,8 KB | 36,5 KB | 11,2 KB |
| Foto | 129,5 KB (JPG) | 36,1 KB (WebP) | |

## Manutenção

- **Mudar textos e projetos:** edite `js/dados.js`.
- **Mudar o visual:** edite `css/styles.css`.
- **Mudar uma validação:** edite `js/modules/validacao.js`.
- **Antes de entregar:** rode o build e confira as 3 páginas em `dist/`.
