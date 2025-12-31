import { Component, computed, input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { ProjectGroup } from '../../../../interfaces/project-group.interface';

@Component({
  selector: 'app-date-projects',
  imports: [MatCardModule],
  templateUrl: './date-projects.html',
  styleUrl: './date-projects.scss',
})
export class DateProjects {
  group = input.required<ProjectGroup>()

  projectDate = computed(() => this.group().dateLabel)
}
