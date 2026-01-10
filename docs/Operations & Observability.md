Operations & Observability

Este documento define requisitos mínimos de observabilidade e operação para um ERP multi-tenant escalável.

Logs estruturados

- Sempre incluir tenantId, userId, requestId e featureKey.
- Padrão JSON com níveis (info, warn, error).
- Dados sensíveis devem ser mascarados.

Métricas essenciais

- Throughput por tenant (req/s).
- Latência p95 e p99 por endpoint.
- Taxa de erro por tenant.
- Consumo de recursos (CPU, memória) por serviço.

Auditoria

- Eventos sensíveis devem gerar trilha de auditoria: quem, quando, o que, qual tenant.
- Auditoria deve ser imutável e consultável.

Alertas mínimos

- Pico de erros por tenant.
- Latência acima do SLA.
- Tentativas de acesso negado em excesso.

SLA e limites

- Definir quotas por tenant (ex.: chamadas/minuto, usuários ativos).
- Rate limiting por tenant e por usuário.
- Estratégia de cache para leituras frequentes.
