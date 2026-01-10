API Contracts

Este documento define padrões para contratos de API entre front-end e backend em um cenário multi-tenant.

Headers obrigatórios

- Authorization: Bearer <token>
- X-Tenant-Id: <tenantId> (obrigatório em endpoints autenticados)

Versionamento

- Versões via URL (/api/v1/...) ou header (X-Api-Version).
- Mudanças incompatíveis exigem nova versão.

Padrão de resposta

- Sucesso: payload consistente com envelope opcional (data, meta).
- Erro: retornar código HTTP e corpo padronizado.

Erro padronizado (exemplo)

{
  "code": "TENANT_ACCESS_DENIED",
  "message": "Tenant inválido ou sem permissão",
  "details": {
    "tenantId": "acme"
  }
}

Contratos de multi-tenant

- Toda resposta deve refletir o tenant válido.
- Não retornar dados de outro tenant em qualquer hipótese.
- Em endpoints públicos, permitir acesso somente ao escopo do tenant solicitado.
