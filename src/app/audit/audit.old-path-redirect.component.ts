import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  template: ''
})
export class AuditOldPathRedirectComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.navigate(['/audit', this.route.snapshot.params['key']]);
  }
}
