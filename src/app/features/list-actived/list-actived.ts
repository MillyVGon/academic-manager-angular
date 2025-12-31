import { Component, inject } from '@angular/core';
import { List } from "../../shared/components/list/list";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-actived',
  imports: [List],
  templateUrl: './list-actived.html',
  styleUrl: './list-actived.scss',
})
export class ListActived {
  private route = inject(ActivatedRoute)

  mode = this.route.snapshot.data['mode'] ?? 'actived'
}
