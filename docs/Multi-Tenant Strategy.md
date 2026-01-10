Multi-Tenant Strategy

Este documento define a estratégia multi-tenant de ponta a ponta (identificação, isolamento de dados, ciclo de vida do tenant e governança). Ele complementa o guia de Tenancy do front-end.

Objetivos

- Escalabilidade: permitir crescimento horizontal sem degradação por tenant.
- Segurança: isolamento efetivo entre tenants.
- Governança: regras claras para provisionamento e mudanças.

Resolução de tenant

Prioridade de resolução:

1. Subdomínio (ex.: https://acme.app.com) — recomendado para produção.
2. Header X-Tenant-Id — utilizado internamente pelo front-end e serviços.
3. Query string (ex.: /login?tenantId=acme) — apenas para telas públicas e bootstrap inicial.

Regras:

- O backend sempre valida o tenant com base na identidade do usuário e na origem da requisição.
- Em endpoints públicos, a validação do tenant acontece por whitelist do próprio tenant (branding + config).
- Não é permitido misturar dados entre tenants, mesmo que o header seja adulterado.

Isolamento de dados

Escolha recomendada: schema-per-tenant no banco relacional.

- Escalabilidade: permite crescimento gradual e tuning por tenant.
- Segurança: separação física lógica entre tenants.
- Operação: migrações e backups podem ser feitos por tenant.

Alternativas aceitas (para cenários iniciais):

- Row-level (tenant_id em todas as tabelas) com RLS no banco.
- DB-per-tenant para tenants estratégicos ou altamente isolados.

Lifecycle do tenant

Estados sugeridos:

- trial: tenant criado com limites reduzidos.
- active: tenant em operação.
- suspended: acesso bloqueado por inadimplência ou política.
- archived: dados preservados, sem acesso.

Provisionamento

- Criação por serviço de Admin: gera tenantId, schema/banco, branding default e features iniciais.
- O tenantId é imutável e deve ser usado como chave técnica.
- O branding e as features são armazenados como configuração do tenant.

Governança de features e RBAC

- Features são chaves estáveis e versionadas (ex.: customers.read, billing.export).
- Roles globais (ex.: super-admin) e roles por tenant são separadas.
- O backend sempre valida permissões; o front apenas reflete a decisão.

Segurança e compliance

- Tokens com expiração curta + refresh token rotacionado.
- Revogação de token por tenant em caso de incidente.
- Logs e auditoria devem incluir tenantId e userId.

Checklist de implementação mínima

- Resolução de tenant no backend (subdomínio + header).
- Middleware para injetar tenant context na request.
- Política de isolamento (schema-per-tenant ou row-level com RLS).
- Auditoria de ações sensíveis com tenantId.
