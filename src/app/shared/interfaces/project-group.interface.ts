import { Project } from "./project.interface"

export interface ProjectGroup {
  dateKey: string
  dateLabel: string
  projects: Project[]
}