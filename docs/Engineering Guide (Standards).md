Engineering Guide (Standards)

Este guia reúne convenções e padrões de desenvolvimento para o ERP multi‑tenant em Angular e .NET. O objetivo é alinhar toda a equipe e qualquer LLM colaborador a uma arquitetura consistente, escalável e preparada para portfólio internacional.

Princípios

Standalone‑first: todos os componentes, diretivas e pipes são standalone. Não usamos NgModules para features, apenas lazy routes.

Feature‑first: pastas organizadas por domínio de negócio. Camadas técnicas ficam internas a cada feature.

Tenant‑aware: a camada core mantém o contexto do tenant (ID, features, extensão de menu, tema). Qualquer interação deve considerar esse contexto.

RBAC centralizado: autorização baseada em roles e features deve ser verificada em três camadas: guard de rota, filtragem de menu e diretiva de UI.

PageState unificado: cada página usa um estado único com dados e status (idle | loading | error) para evitar flicker de UI durante carregamento ou erro.

Mock via tokens: APIs são abstraídas via InjectionToken. Implementações mock e HTTP são injetadas por rota, permitindo trabalhar sem backend.

Organização de pastas
src/app/
core/        # infraestrutura global (auth, tenant, navigation, http)
features/    # módulos de negócio (customers, dashboard, auth/login)
shared/      # utilidades reutilizáveis (state helpers, UI primitives)

Core vs Features

core/: contém serviços singleton, interceptors, tokens e guardas. Nunca deve depender de features.

features/: cada módulo encapsula páginas, componentes, modelos e data‑access de um domínio de negócio. Só pode depender de core e shared.

shared/: utilidades comuns a várias features (helpers de estado, directivas UI, componentes básicos). Não deve depender de features.

Regras de código

Prefira inject() ao invés de injeção via construtor.

Use sinais (signals) para estado de UI. RxJS fica restrito a chamadas HTTP ou fluxos assíncronos complexos.

Sempre use takeUntilDestroyed() em subscriptions.

Empregue o novo controle de fluxo @if/@for/@switch ao invés de *ngIf/*ngFor quando possível.

Mantenha as páginas finas: elas orquestram dados e interações; a lógica de UI fica em componentes reutilizáveis.

Definition of Done (DoD)

Uma nova feature ou página é considerada pronta quando:

A rota lazy está configurada.

O estado da página utiliza PageState<T> ou helper equivalente.

RBAC aplicado: guard de rota, menu filtrado e elementos de UI protegidos pela diretiva appCan.

Funciona com implementação mock via token; nenhuma dependência direta do backend.

A UI não pisca: dados anteriores são preservados durante loading/erro.

Documentação atualizada se novas convenções forem introduzidas.
