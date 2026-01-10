Authentication Guide

Este documento descreve como a autenticação é implementada no front‑end e como deve se integrar com o backend .NET.

Persistência de sessão

O AuthService salva o token de acesso (accessToken) no localStorage com a chave erp.access_token (ou chave equivalente definida em ACCESS_TOKEN_STORAGE_KEY).

Também persiste um objeto AuthUser contendo id, name, email, roles e tenantId em erp.auth.session.

No startup, o AuthService chama initFromStorage() via provideAppInitializer, restaurando o token e o usuário.

Refresh do usuário

Após restaurar o token, o aplicativo chama /me (mock ou endpoint real) no resolver de bootstrap. Esse endpoint deve retornar:

user: dados completos do usuário.

tenantFeatures: lista de features habilitadas.

menuExtension: alterações específicas no menu base.

O bootstrap atualiza AuthStore com o usuário retornado e TenantContextService com as features e o menu.

Logout

O método logout() do AuthService remove o token e o user do storage, limpa o AuthStore e redireciona para /login?tenantId=<tenantAtual>. O TenantContextService também deve ser limpo.

Boas práticas

Nunca manipule o token diretamente fora do AuthService.

Evite armazenar claims sensíveis no front‑end; o backend deve validar roles e policies.

Use um header Authorization: Bearer <token> para todas as chamadas autenticadas via interceptor.

Assegure que o token seja renovado (refresh token) se necessário; isso será implementado no backend e refletido no front.
