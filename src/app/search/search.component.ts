import { Component, OnInit } from '@angular/core';

import { Person, SearchService } from "../shared";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query: string = '';
  results: Person[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  search(): void  {
    this.searchService.search(this.query).subscribe({
      next: (data: Person[]) => { this.results = data; },
      error: (err: any) => { console.log(err); }
    })
  }
}
