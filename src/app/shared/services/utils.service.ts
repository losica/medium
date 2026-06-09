import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UtilsService {
    range(start: number, end: number): number[] {
        return Array.from({ length: end }, (_, i) => i + start)
    }
}