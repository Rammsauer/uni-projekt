import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldsService implements Resolve<string[]> {
  baseUrl = `${environment.baseUrl}/fields`;

  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string[]> {
    return this.fields();
  }

  fields(typeId?: Number) {
    return this.http.get<string[]>([this.baseUrl, typeId].join('/')).pipe(
      map((res: any) => {
        return res.fields;
      })
    );
  }
}
