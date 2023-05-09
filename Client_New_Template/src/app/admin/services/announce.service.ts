import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApplicationHttpClient } from 'src/app/core/helper';
import { AnnounceModel } from 'src/app/core/models/announce';

@Injectable({
  providedIn: 'root'
})
export class AnnounceService {

  private announceSubject: BehaviorSubject<AnnounceModel>;
  public annount: Observable<AnnounceModel>;
  subUri: string;
  constructor(
    private http: ApplicationHttpClient) 
  { 
    this.announceSubject = new BehaviorSubject<AnnounceModel>(null);
    this.subUri = "gateway/Announce/";
    this.annount = this.announceSubject.asObservable();
  }

  getAnnounce(id: number) {
    const endPoint = `${this.http._urlAPI}${this.subUri}${id}`;
    return this.http.Get(endPoint);
  }

  public get announceValue(): AnnounceModel {
    return this.announceSubject.value;
  }

  updateAnnounce(item: AnnounceModel) {
    this.announceSubject.next(item);
  }
}
