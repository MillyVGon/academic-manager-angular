import { inject } from "@angular/core"
import { ActivatedRouteSnapshot } from "@angular/router"
import { ProjectsService } from "../services/projects.service"

export const GetProject = (route: ActivatedRouteSnapshot) => {
  const projectsService = inject(ProjectsService)
  return projectsService.get(route.paramMap.get('id') as string)
}

