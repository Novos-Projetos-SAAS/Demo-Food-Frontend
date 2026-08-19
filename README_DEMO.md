# Frontend - Ambiente DEMO

Esta cópia usa uma identidade visual neutra chamada **Demo Food**.

## Alterações visuais

- paleta principal em índigo + teal;
- variáveis globais para tema claro e escuro em `src/app/globals.css`;
- logo criada em HTML/CSS pelo componente `DemoBrand`;
- capa da página inicial criada em HTML/CSS, sem imagem de marca;
- favicon e imagem Open Graph neutros;
- imagens originais dos alimentos preservadas;
- imagens DEMO de produtos adicionadas em `public/produtos`.

## Login DEMO

- E-mail: `demo@demo.com`
- Senha: `Senhaforte123@`

A tela de login já vem preenchida para facilitar apresentações.

## Variáveis mínimas

Configure `NEXT_PUBLIC_API_URL` e `NEXT_PUBLIC_SITE_URL`. Veja `.env.example`.

## Tema

O tema claro é o padrão. O escuro acompanha `prefers-color-scheme: dark` e também pode ser forçado com `data-theme="dark"` no elemento `<html>`. Para forçar claro, use `data-theme="light"`.
