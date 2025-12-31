import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../shared/services/projects.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SNACK_BAR_CONFIG } from '../../app.config';
import { Form } from "../../shared/components/form/form";
import { Project } from '../../shared/interfaces/project.interface';
import { BackList } from "../../shared/components/back-list/back-list";

@Component({
  selector: 'app-create',
  imports: [Form, BackList],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})

export class Create {
  projectsService = inject(ProjectsService)
  matSnackBar = inject(MatSnackBar)
  router = inject(Router)

  onSubmit(project: Project) {
    this.projectsService.post(project).subscribe(() => {
      this.matSnackBar.open('Projeto Criado com Sucesso!!!', 'Ok', SNACK_BAR_CONFIG.success)
      this.router.navigateByUrl('/').catch(console.log)
    })
  }
}
