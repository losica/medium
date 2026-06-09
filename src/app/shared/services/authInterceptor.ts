import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { PersistenceService } from "./persistence.service";
import { STORAGE_KEYS } from "../constants/storage.constants";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const persistanceService = inject(PersistenceService);
    const token = persistanceService.get(STORAGE_KEYS.ACCESS_TOKEN);
    request = request.clone({
        setHeaders: {
            Authorization: token ? `Token ${token}` : ''
        }
    });
    return next(request);
}