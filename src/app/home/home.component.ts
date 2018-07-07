import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

export enum State {
  Waiting,
  Loading,
  Done,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public cause: string;
  public valid: boolean;
  public states = State;
  public loading: State;
  public url: string;

  constructor(private locationService: Location, private router: Router, private route: ActivatedRoute) {}

  public submitCause(): void {
    this.loading = State.Loading;

    this.locationService.replaceState(this.formatToUrl(this.cause));
    this.url = window.location.href;

    timer(3000).subscribe(() => this.loading = State.Done);
  }

  private formatToUrl(content: string): string {
    content = content.split(' ').join('_');
    content = encodeURIComponent(content);
    return content;
  }

  private clearCause(content: string): string {
    return content.replace(new RegExp('_', 'g'), ' ');
  }

  ngOnInit() {
    this.loading = State.Waiting;
    this.route.params.subscribe(params => {
      this.cause = this.clearCause(params['id'] ? params['id'] : '');
    });
  }
}
