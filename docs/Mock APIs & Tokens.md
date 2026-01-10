Mock APIs & Tokens
Objetivo

Permitir que o front‑end Angular seja desenvolvido de forma independente do backend .NET, com a capacidade de alternar entre implementações mock e reais sem refatoração de código.

Padrão

Para cada serviço de dados (ex.: Customers, Auth), definimos:

Interface + InjectionToken: descrevem os métodos disponíveis e servem como chave para DI.

export interface CustomersApi {
list(req: PageRequest): Observable<PageResult<Customer>>;
get(id: string): Observable<Customer>;
create(data: CustomerCreate): Observable<Customer>;
update(id: string, data: CustomerUpdate): Observable<Customer>;
delete(id: string): Observable<void>;
}

export const CUSTOMERS_API = new InjectionToken<CustomersApi>('CUSTOMERS_API');


Implementação mock: geralmente armazena dados em arrays locais e utiliza of(...).pipe(delay(...)) para simular latência.

Implementação HTTP: usa HttpClient para chamar o backend real. Deve ler API_BASE_URL e usar interceptors para adicionar token e tenant.

Provider por rota: cada feature define no seu customers.routes.ts qual implementação usar. Para mock:

providers: [
CustomersApiMock,
{ provide: CUSTOMERS_API, useExisting: CustomersApiMock },
],

Benefícios

Desenvolvimento de front‑end destravado, mesmo sem endpoints prontos.

Alternância simples entre mock e real (altere apenas o provider).

Facilidade de testes unitários, já que as páginas sempre dependem da interface e do token.
