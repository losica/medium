import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ArticleInterface } from "../types/article.interface";
import { environment } from "../../../environments/environment";
import { ArticleResponseInterface } from "../types/articleReponse.interface";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private http = inject(HttpClient);

    getArticle(slug: string): Observable<ArticleInterface> {
        const fullUrl = `${environment.apiUrl}/articles/${slug}`;
        return this.http.get<ArticleResponseInterface>(fullUrl).pipe(
            map(response => response.article)
        );
    }
}