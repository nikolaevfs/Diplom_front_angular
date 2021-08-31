import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AUTHENTICATED_USERNAME } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {



constructor(
  private http: HttpClient
) { }


  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${baseUrl}file/upload/`+localStorage.getItem(AUTHENTICATED_USERNAME), formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${baseUrl}file/download/`+ localStorage.getItem(AUTHENTICATED_USERNAME) + `/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  delete(filename: string): Observable<string[]> {
    return this.http.post<string[]>(`${baseUrl}file/delete/`+localStorage.getItem(AUTHENTICATED_USERNAME), filename);
  }


  getGroupFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${baseUrl}file/allfiles/`+localStorage.getItem(AUTHENTICATED_USERNAME));
  }
}
