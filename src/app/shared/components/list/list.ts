import { Component, computed, inject, input, signal } from '@angular/core';
import { Card } from './components/card/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoProjects } from './components/no-projects/no-projects';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project.interface';
import { SNACK_BAR_CONFIG } from '../../../app.config';
import { ProjectGroup } from '../../interfaces/project-group.interface';
import { DateProjects } from "./components/date-projects/date-projects";

@Component({
  selector: 'app-list',
  imports: [Card, NoProjects, RouterLink, MatButtonModule, DateProjects],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})

export class List {
  private projectsService = inject(ProjectsService)
  private router = inject(Router)
  private confirmationDialogService = inject(ConfirmationDialogService)
  private matSnackBar = inject(MatSnackBar)
  private route = inject(ActivatedRoute)

  private rawProjects = signal<Project[]>(this.route.snapshot.data['projects'] ?? [])
  
  groupedProjects = computed<ProjectGroup[]>(() => {
    const projects = this.processProject(this.rawProjects())
    const groups = new Map<string, Project[]>()

    for (const project of projects) {
      const key = this.getDateKey(project.datetime)

      if (!groups.has(key)) groups.set(key, [])

      groups.get(key)!.push(project)
    }
    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, projects]) => {
        const [year, month, day] = key.split('-').map(Number)
        const date = new Date(year, month - 1, day)
        return { dateKey: key, dateLabel: this.formatDateLabel(date), projects }
      })
  })

  mode = input.required<'active' | 'expired'>()

  onEdit(project: Project) {
    this.router.navigate(['/editar-projeto', project.id])
  }

  onDelete(project: Project) {
    this.confirmAction(
      'Excluir Projeto',
      'Realmente deseja excluir este projeto?',
      'Projeto Excluido com Sucesso!!!',
      () => this.projectsService.delete(project.id),
    )
  }

  onDone(project: Project) {
    this.confirmAction(
      'Finalizar Projeto',
      'Realmente deseja finalizar este projeto?',
      'Projeto Finalizado com Sucesso!!!',
      () => this.projectsService.put(project.id, { ...project, done: true }),
    )
  }

  onReopen(project: Project) {
    this.confirmAction(
      'Retomar Projeto',
      'Realmente deseja retomar este projeto?',
      'Projeto Retomado com Sucesso!!!',
      () => this.projectsService.put(project.id, { ...project, done: false }),
    )
  }

  private getDateKey(date: Date): string {
    const _currentYear = date.getFullYear()
    const _currentMonth = String(date.getMonth() + 1).padStart(2, '0')
    const _currentDate = String(date.getDate()).padStart(2, '0')

    return `${_currentYear}-${_currentMonth}-${_currentDate}`
  }

  private formatDateLabel(date: Date): string {
    const _dateFormatted = date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
    })

    return _dateFormatted
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  private confirmAction(
    dialogTitle: string,
    dialogMessage: string,
    sucessMessage: string,
    action: () => Observable<any>
  ) {
    this.confirmationDialogService.openDialog({
      title: dialogTitle,
      message: dialogMessage
    })
      .pipe(
        filter(Boolean),
        switchMap(() => action()),
        tap(() => this.matSnackBar
          .open(sucessMessage, 'Ok', SNACK_BAR_CONFIG.success)
        ),
        switchMap(() => this.projectsService.getAll()),
        map(projects => this.processProject(projects))
      )
      .subscribe(projects => this.rawProjects.set(projects))
  }

  private processProject(projects: Project[]): Project[] {
    const priorityOrder: Record<Project['priority'], number> = {
      high: 3,
      medium: 2,
      low: 1,
    }

    return [...projects]
      .map(proj => ({ ...proj, datetime: new Date(proj.datetime) }))
      .filter(proj => this.mode() === 'active'
        ? !this.isExpired(proj)
        : this.isExpired(proj)
      )
      .sort((a, b) => {
        if (a.done !== b.done) return Number(a.done) - Number(b.done)

        const dateDiff = a.datetime.getTime() - b.datetime.getTime()
        return dateDiff !== 0
          ? dateDiff
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      })
  }

  private isExpired(project: Project): boolean {
    return project.datetime.getTime() < Date.now()
  }
}