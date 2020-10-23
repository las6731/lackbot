import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private responses: any;
  $responses: Subject<any>;

  constructor(private httpClient: HttpClient) {
    this.$responses = new Subject();
    this.$responses.subscribe(responses => this.responses = responses);
  }

  public getResponses(): void {
    this.httpClient.get(`${environment.API_URL}/response`)
      .subscribe(responses => this.$responses.next(responses));
  }

  public postResponse(phrase: string, response: string): void {
    this.httpClient.post(`${environment.API_URL}/response/${phrase}`, [response])
      .subscribe(() => this.getResponses());
  }

  public deletePhrase(phrase: string): void {
    this.httpClient.delete<boolean>(`${environment.API_URL}/response/${phrase}`)
      .subscribe(() => this.getResponses());
  }

  public deleteResponse(phrase: string, responseIndex: number): void {
    this.httpClient.delete<boolean>(`${environment.API_URL}/response/${phrase}/${responseIndex}`)
      .subscribe(() => this.getResponses());
  }

}
