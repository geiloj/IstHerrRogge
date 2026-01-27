import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WikiService {
  private http = inject(HttpClient);

  async getSatz(titel: string): Promise<string> {
    const url = `https://de.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&exsentences=1&origin=*&titles=${titel}`;

    const data = await firstValueFrom(this.http.get<any>(url));
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    return pages[pageId].extract || '';
  }
}
