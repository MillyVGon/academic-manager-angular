import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from '../../shared/services/projects.service';
import { SNACK_BAR_CONFIG } from '../../app.config';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../shared/interfaces/project.interface';
import { Form } from '../../shared/components/form/form';
import { BackList } from '../../shared/components/back-list/back-list';

@Component({
  selector: 'app-edit',
  imports: [Form, BackList],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit {
  projectsService = inject(ProjectsService)
  matSnackBar = inject(MatSnackBar)
  router = inject(Router)

  project: Project = inject(ActivatedRoute).snapshot.data['project']

  onSubmit(project: Project) {
    this.projectsService.put(this.project.id, project).subscribe(() => {
      this.matSnackBar.open('Projeto Editado com Sucesso!!!', 'Ok', SNACK_BAR_CONFIG.success)
      this.router.navigateByUrl('/').catch(console.log)
    })
  }
}
