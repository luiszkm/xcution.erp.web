Tenancy Guide

Este documento explica como o multi‑tenant é implementado e gerenciado na aplicação.

Fonte de verdade

O serviço TenantContextService é responsável por centralizar todas as informações relacionadas ao tenant. Ele expõe sinais computados para:

tenantId – identificador atual do tenant.

tenantFeatures – lista de features habilitadas pelo backend.

menuExtension – extensão de menu enviada pelo backend para adicionar, remover ou alterar itens do menu base.

boot – estado do bootstrap do app (idle, loading, ready ou error).

loginConfig – configuração pública para a tela de login (branding, tema, etc.).

Identificação do tenant

A tela de login aceita tenantId via query string (/login?tenantId=acme).

Se não houver tenantId, o fallback é default. É possível implementar tela de seleção de tenant no futuro.

Persistência do tenant

O TenantContextService salva o tenantId no localStorage com a chave erp.tenantId. Isso permite restaurar o tenant mesmo após refresh.

A inicialização do tenant ocorre no startup via provideAppInitializer (ex.: tenant.initFromStorage()).

Propagação em requisições

O tenantInterceptor injeta o header X-Tenant-Id em todas as requisições HTTP, exceto nas rotas públicas (/auth/login e /public/*).

Essa abordagem facilita a implementação no backend (.NET 10), que lê o tenant do header.

Troca de tenant

O logout deve sempre redirecionar para /login?tenantId=<tenantAtual> para garantir que o branding correto seja carregado.

Em ambientes B2B multi‑tenant, a troca de tenant normalmente requer logout e novo login.
