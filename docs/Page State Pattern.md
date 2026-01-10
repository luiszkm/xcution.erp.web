Page State Pattern
Problema

Em aplicativos enterprise, páginas geralmente exibem listas ou formulários. Quando ocorrem carregamentos ou erros, as telas não podem simplesmente desaparecer ou piscar, pois isso prejudica a experiência do usuário e dificulta o entendimento do estado atual.

Solução

Utilize um tipo PageState<T> para descrever o estado de qualquer página que necessita carregar dados assíncronos:

export type PageState<T> =
| { status: 'idle'; data: T }
| { status: 'loading'; data: T }
| { status: 'error'; data: T; message: string };

Regras

Dados sempre presentes: Mesmo em loading ou erro, data deve conter a última versão válida. Assim, a UI não fica vazia.

Loading/Error centralizados: Em vez de múltiplos sinais (loading, error, data), mantenha um único sinal com o tipo PageState<T>.

Helpers: Forneça funções para mudar o estado de forma consistente:

const state = createPageState(initialData);

setLoading(state); // status=loading, preserva data
setData(state, newData); // status=idle, atualiza data
setError(state, 'Falha ao carregar'); // status=error, preserva data


Template: Use computed properties para extrair mensagens de erro ou status no template e evite acesso direto a campos opcionais.

Benefícios

UI previsível e sem flicker.

Código das páginas simplificado.

Padrão reutilizável em diferentes features (Clientes, Pedidos, etc.).
