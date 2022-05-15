import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Person, SearchService } from '../shared';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnDestroy, OnInit {
  person!: Person;
  subscription!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private service: SearchService) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.service.get(id).subscribe(person => {
        if (person) {
          this.person = person;
        } else {
          this.gotoList();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async cancel(): Promise<void> {
    await this.router.navigate(['/search']);
  }

  async save(): Promise<void> {
    this.service.save(this.person);
    await this.gotoList();
  }

  private async gotoList(): Promise<void> {
    if(this.person) {
      await this.router.navigate(['/search', { term: this.person.name }]);
    } else {
      await this.router.navigate(['/search']);
    }
  }
}
