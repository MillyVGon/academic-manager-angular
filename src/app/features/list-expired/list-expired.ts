import { Component, inject } from '@angular/core';
import { List } from '../../shared/components/list/list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-expired',
  imports: [List],
  templateUrl: './list-expired.html',
  styleUrl: './list-expired.scss',
})
export class ListExpired {
  private route = inject(ActivatedRoute)

  mode = this.route.snapshot.data['mode'] ?? 'expired'
}
