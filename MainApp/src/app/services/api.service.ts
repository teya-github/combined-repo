import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "https://localhost:7176/api/Cards"
  urlUser = "https://localhost:7176/api/Users"
  urlRole = "https://localhost:7176/api/Roles"
  urlStatus = "https://localhost:7176/api/Status"

  //inject httpclient
  constructor(private httpclient: HttpClient) { }

  getAlbums(): Observable<any>
  {
    return this.httpclient.get("https://jsonplaceholder.typicode.com/albums");
  }

  getPhotosForSelectedAlbumByParameter(selectedAlbumId:string): Observable<any>
  {
    let params1 = new HttpParams().set('albumId',selectedAlbumId);
    return this.httpclient.get("https://jsonplaceholder.typicode.com/photos",{params:params1});
  }

  getCards(): Observable<Card[]>
  {
    return this.httpclient.get<Card[]>(this.baseUrl);
  }

  addCard(card: Card): Observable<Card>
  {
    card.id = '00000000-0000-0000-0000-000000000000';
    return this.httpclient.post<Card>(this.baseUrl, card);
  }

  updateCard(card: Card): Observable<Card>
  {
    return this.httpclient.put<Card>(this.baseUrl + '/' + card.id, card);
  }

  deleteCard(id: string): Observable<Card>
  {
    return this.httpclient.delete<Card>(this.baseUrl + '/' + id);
  }
  
  GetCard(id: string): Observable<Card>
  {
    return this.httpclient.get<Card>(this.baseUrl + '/' + id);
  }

  // Get(pageNumber: number, pageSize: number,searchYear: number)
  // {
  //   return this.httpclient.get<Card>('');
  // }
  // Get(pageNumber: number): Observable<any>
  // {
  //   return this.httpclient.get<Card>('https://localhost:7176/test/pagination', { params: { pageNumber: pageNumber.toString(), pageSize: '10', search: '2022' } });
  // }

  //Users
  getUsers(): Observable<User[]>
  {
    return this.httpclient.get<User[]>(this.urlUser);
  }

  addUser(user: User): Observable<User>
  {
    user.id = '00000000-0000-0000-0000-000000000000';
    return this.httpclient.post<User>(this.urlUser, user);
  }
  
  GetUserbyEmail(email: any): Observable<User>{
    return this.httpclient.get<User>(this.urlUser+'/'+email);
  }

  updateUser(user: User): Observable<User>
  {
    return this.httpclient.put<User>(this.urlUser + '/' + user.id, user);
  }

  deleteUser(id: string): Observable<User>
  {
    return this.httpclient.delete<User>(this.urlUser + '/' + id);
  }
  //is logged in
  isloggedin(){
    return sessionStorage.getItem('name')!=null;
  }

  //Roles
  getRoles(): Observable<Role[]>
  {
    return this.httpclient.get<Role[]>(this.urlRole);
  }

  // addRole(user: Roles): Observable<User>
  // {
  //   user.id = '00000000-0000-0000-0000-000000000000';
  //   return this.httpclient.post<User>(this.urlUser, user);
  // }
  
  GetRoles(id: any): Observable<Role>{
    return this.httpclient.get<Role>(this.urlRole+'/'+id);
  }

  // updateUser(user: User): Observable<User>
  // {
  //   return this.httpclient.put<User>(this.urlUser + '/' + user.id, user);
  // }

  // deleteUser(id: string): Observable<User>
  // {
  //   return this.httpclient.delete<User>(this.urlUser + '/' + id);
  // }

  getStatuses(): Observable<Status[]>
  {
    return this.httpclient.get<Status[]>(this.urlStatus);
  }
}
