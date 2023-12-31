import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoDispositivo } from '../models/tipoDispositivo';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DispositivosXTiposDTO } from '../models/DispositivosXTiposDTO';
import { ConsumoHorasDispositivoDTO } from '../models/ConsumoHorasDispositivoDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class TipoDispositivoService {
  private url = `${base_url}/tipos-dispositivos`;
  private listaCambio = new Subject<TipoDispositivo[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<TipoDispositivo[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(dispo: TipoDispositivo) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, dispo,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: TipoDispositivo[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoDispositivo>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(td: TipoDispositivo) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, td,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });

  }

  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getDispositivosXtipo():Observable<DispositivosXTiposDTO[]>{
    let token = sessionStorage.getItem('token');

    return this.http.get<DispositivosXTiposDTO[]>(`${this.url}/CantidadDeDispositivosXTipo`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  getConsumoHorasByTipoDispositivo():Observable<ConsumoHorasDispositivoDTO[]>{
    let token = sessionStorage.getItem('token');

    return this.http.get<ConsumoHorasDispositivoDTO[]>(`${this.url}/ConsumoHorasByTipoDispositivo`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
}
