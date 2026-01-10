Architecture Overview

Este documento apresenta uma visão geral da arquitetura da aplicação ERP multi‑tenant em Angular e .NET.

Objetivos

Prover uma arquitetura corporativa, escalável e alinhada a práticas modernas (Standalone Angular, Signals, multi‑tenant).

Preparar o projeto para crescimento (monorepo, micro‑frontends) e para ser utilizado como portfólio internacional.

Áreas de execução
Área Pública

Rotas como /login e /public/*.

Permitem carregar configurações do tenant (/public/tenants/{id}/login-config) sem autenticação.

Podem receber tenantId via query param (ex.: /login?tenantId=acme).

Área da Aplicação (protegia)

Rotas /app/**.

Protegidas por authGuard (exige token válido).

Executa um bootstrap via resolver (appBootstrapResolver) que:

Chama /me (ou serviço mock) para recuperar dados do usuário e do tenant (roles, features, menu extension).

Preenche o AuthStore e TenantContextService.

Seta o estado de boot para ready ou error.

Renderiza AppShellComponent, que contém AppHeaderComponent e AppSidebarComponent, além do <router-outlet> para children.

Padrão de roteamento

Cada módulo de negócio é lazily loaded via loadChildren.

O shell é carregado via loadComponent.

O resolver do bootstrap garante que dados críticos estejam prontos antes de renderizar.

Dependências

As páginas dependem apenas de tokens de API (CUSTOMERS_API, AUTH_API, etc.), nunca de implementações concretas. Isso permite alternar entre mocks e serviços HTTP sem refatorar.

O TenantContextService e o AuthService são singletons fornecidos pelo core. Outros serviços devem ser injecionados via tokens em nível de rota.
