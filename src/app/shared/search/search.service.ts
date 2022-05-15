import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.httpClient.get<Person[]>('assets/data/people.json');
  }

  search(q: string = ''): Observable<Person[]> {
    if (!q.trim() || q === '*') {
      q = '';
    }

    q.toLowerCase();

    return this.getAll().pipe(
      map((data) => data.map((item) => !!localStorage['person' + item.id] ? JSON.parse(localStorage['person' + item.id]) : item)
      .filter(item => JSON.stringify(item).toLowerCase().includes(q)))
    );
  }
  
  get(id: number): Observable<Person> {
    return this.getAll().pipe(
      map((data) => {
        if (localStorage['person' + id]) {
          return JSON.parse(localStorage['person' + id]);
        }
        return data.find((item) => item.id === id)
      })
    )
  }

  save(person: Person): void {
    localStorage['person' + person.id] = JSON.stringify(person);
  }
}

export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(obj?: any) {
    this.street = obj?.street || null;
    this.city = obj?.city || null;
    this.state = obj?.state || null;
    this.zip = obj?.zip || null;
  }
}

export class Person {
  id: number;
  name: string;
  phone: string;
  address: Address;

  constructor(obj?: any) {
    this.id = obj?.id || null;
    this.name = obj?.name || null;
    this.phone = obj?.phone || null;
    this.address = new Address(obj?.address);
  }
}