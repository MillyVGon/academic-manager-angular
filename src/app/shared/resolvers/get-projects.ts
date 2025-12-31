import { inject } from "@angular/core"
import { ProjectsService } from "../services/projects.service"

export const GetProjects = () => {
  const projectsService = inject(ProjectsService)
  return projectsService.getAll()
}
