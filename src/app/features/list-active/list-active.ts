import { Component, inject } from '@angular/core';
import { List } from "../../shared/components/list/list";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-active',
  imports: [List],
  templateUrl: './list-active.html',
  styleUrl: './list-active.scss',
})
export class ListActive {
  private route = inject(ActivatedRoute)

  mode = this.route.snapshot.data['mode'] ?? 'active'
}
