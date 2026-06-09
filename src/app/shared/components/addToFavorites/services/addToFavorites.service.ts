import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ArticleInterface } from "../../../types/article.interface";
import { environment } from "../../../../../environments/environment";
import { ArticleResponseInterface } from "../../../types/articleReponse.interface";

@Injectable()
export class AddToFavoritesService {
    private http = inject(HttpClient);

    addToFavorites(slug: string): Observable<ArticleInterface> {
        const fullUrl = this.getUrl(slug);
            
        return this.http
            .post<ArticleResponseInterface>(fullUrl, {})
            .pipe(map(this.getArticle));
    }

    removeFromFavorites(slug: string): Observable<ArticleInterface> {
        const fullUrl = this.getUrl(slug);
            
        return this.http
            .delete<ArticleResponseInterface>(fullUrl)
            .pipe(map(this.getArticle));
    }

    private getUrl(slug: string): string {
        return `${environment.apiUrl}/articles/${slug}/favorite`;
    }

    private getArticle(response: ArticleResponseInterface): ArticleInterface {
        return response.article;
    }
}