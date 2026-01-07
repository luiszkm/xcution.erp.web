import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: unknown) => {
      // ponto central para mapear erros da API (.NET ProblemDetails)
      if (err instanceof HttpErrorResponse) {
        // TODO: você vai decidir o padrão de erro (ProblemDetails) na semana 4.
      }
      return throwError(() => err);
    })
  );
};
