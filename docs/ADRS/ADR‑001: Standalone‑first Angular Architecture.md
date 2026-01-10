ADR‑001: Standalone‑first Angular Architecture
Status

Aceito

Contexto

Angular 17+ oferece suporte nativo a componentes, diretivas e pipes standalone, eliminando a necessidade de NgModules para features. Isso reduz boilerplate, melhora tree‑shaking e simplifica a compreensão do código.

Decisão

Adotamos o paradigma standalone‑first: todos os componentes, diretivas e pipes são declarados como standalone: true. O roteamento lazy carrega diretamente componentes ou rotas, sem agrupar features em NgModules.

Consequências

Menos arquivos e código repetitivo.

Importações explícitas em cada componente, aumentando clareza.

Facilita migração para micro‑frontends.

Exige disciplina ao importar diretivas/pipes, pois nada é global.
