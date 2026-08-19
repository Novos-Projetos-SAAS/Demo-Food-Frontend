# Design System - Demo Food

A versão DEMO usa uma identidade neutra e independente da marca do cliente de produção. As cores de interface devem ser consumidas pelas variáveis declaradas em `src/app/globals.css`.

## Paleta

- Primária: `--brand-primary` (índigo)
- Secundária: `--brand-secondary` (teal)
- Fundo: `--color-page-bg`
- Superfície: `--color-surface`
- Textos: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
- Bordas: `--color-border`, `--color-border-strong`

## Temas

O tema claro está em `:root`/`html[data-theme="light"]`. O escuro está em `html[data-theme="dark"]` e acompanha `prefers-color-scheme: dark` quando o claro não é forçado.

## Marca

`src/components/branding/DemoBrand.jsx` renderiza a marca “DEMO FOOD” apenas com HTML/CSS. A capa da home também é feita em HTML/CSS, sem depender da identidade do cliente de produção.

## Regra

Novos componentes devem preferir as variáveis globais para manter claro/escuro consistentes e permitir futuras trocas de identidade sem alterar cada módulo.
