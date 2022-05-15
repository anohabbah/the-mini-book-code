import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Person, SearchService } from "../shared";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy, OnInit {
  query: string = '';
  results: Person[] = [];

  sub!: Subscription;

  constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      if(params['term']) {
        this.query = decodeURIComponent(params['term']);
        this.search();
      }
    })
  }

  search(): void  {
    this.searchService.search(this.query).subscribe({
      next: (data: Person[]) => { this.results = data; },
      error: (err: any) => { console.log(err); }
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
