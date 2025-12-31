import { Component, computed, ElementRef, EventEmitter, input, output, Output, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { Project } from '../../../../interfaces/project.interface';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, NgClass],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  project = input.required<Project>()

  expanded = signal(false)
  showToggle = signal(false)

  @Output() edit = new EventEmitter()
  @Output() delete = new EventEmitter()
  @Output() done = new EventEmitter()
  @Output() reopen = new EventEmitter()

  @ViewChild('desc') descriptionEl!: ElementRef<HTMLParagraphElement>

  projectTitle = computed(() => this.project().title)
  projectDiscipline = computed(() => this.project().discipline)
  projectDatetime = computed(() => this.project().datetime)
  projectDescription = computed(() => this.project().description)
  projectDone = computed(() => this.project().done)
  projectPriority = computed(() => this.project().priority)

  toggleExpand() {
    this.expanded.update(v => !v)
  }

  ngAfterViewInit() {
    queueMicrotask(() => {
      const el = this.descriptionEl.nativeElement
      this.showToggle.set(el.scrollHeight > el.clientHeight)
    })
  }

  cardColor(): string {
    const expired = this.projectDatetime().getTime() < Date.now()
    return expired
      ? 'project-expired'
      : (this.projectDone() ? 'project-done' : `priority-${this.projectPriority()}`)
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      day: "2-digit",
      month: "2-digit"
    })
  }

  formatHour(date: Date): string {
    return date.toLocaleTimeString('pt-BR', {
      hour: "2-digit",
      minute: "2-digit"
    })
  }
}
