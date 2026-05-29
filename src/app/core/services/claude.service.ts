import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
function extractHtml(text: string): string {
    const match = text.match(/```html\s*([\s\S]*?)```/);
    return match ? match[1].trim() : text;
}
@Injectable({
    providedIn: 'root'
})
export class ClaudeService {
    private readonly ENDPOINT = environment.apiUrl + '/claude';
    constructor(private http: HttpClient) { }


    sendPrompt(prompt: string): Observable<string> {
        return new Observable(observer => {
            fetch(this.ENDPOINT + '/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                credentials: 'include',
                body: JSON.stringify({ prompt })
            }).then(res => {
                const reader = res.body!.getReader();
                const decoder = new TextDecoder();
                let buffer = '';
                let fullResponse = '';

                const read = () => {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            const html = extractHtml(fullResponse);
                            observer.next(html);
                            observer.complete();
                            return;
                        }

                        buffer += decoder.decode(value, { stream: true });
                        const lines = buffer.split('\n');
                        buffer = lines.pop()!;

                        for (const line of lines) {
                            if (line.startsWith('event: done')) {
                                observer.next(extractHtml(fullResponse));
                                observer.complete();
                                return;
                            }
                            if (line.startsWith('data:')) {
                                try {
                                    const json = JSON.parse(line.replace('data:', '').trim());
                                    if (json.text) fullResponse += json.text;
                                } catch { }
                            }
                        }

                        read();
                    }).catch(err => observer.error(err));
                };

                read();
            }).catch(err => observer.error(err));
        });
    }


}