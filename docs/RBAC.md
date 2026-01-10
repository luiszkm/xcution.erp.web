RBAC Guide
Visão Geral

A aplicação implementa RBAC (Role-Based Access Control) somado a controle de features. Cada permissão pode depender de roles do usuário e/ou features habilitadas pelo tenant.

Serviço de autorização

O AuthorizationService lê as roles do usuário (AuthStore) e as features do tenant (TenantContextService).

Possui métodos:

hasRole(role: string)

hasAnyRole(roles: string[])

hasFeature(feature: string)

canAccess({ roles?: string[], features?: string[] })

Três camadas de verificação

Guard de rota

Use requireAccessGuard({ roles?, features? }) para bloquear acesso a rotas não permitidas.

Em caso de negação, redirecione para uma rota segura (ex.: /app/dashboard).

Filtragem de menu

O NavigationService aplica canAccess em cada item do menu base + extensões do tenant.

Somente itens permitidos são retornados para o sidebar.

Diretiva de UI

AppCanDirective é uma diretiva estrutural (*appCan) que mostra ou oculta elementos de UI conforme a regra.

Exemplo:

<button *appCan="{ features: ['customers.write'] }">Novo Cliente</button>

Notas

A ocultação no front‑end melhora UX mas não substitui a validação no backend.

Ao criar novos módulos ou ações, sempre definir as roles e features necessárias e aplicar nos três pontos acima.
