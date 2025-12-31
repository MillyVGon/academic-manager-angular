import { Component, inject } from '@angular/core';
import { List } from "../../shared/components/list/list";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-active',
  imports: [MatButtonModule, List, RouterLink],
  templateUrl: './list-active.html',
  styleUrl: './list-active.scss',
})
export class ListActive {
  private route = inject(ActivatedRoute)

  mode = this.route.snapshot.data['mode'] ?? 'active'
}
