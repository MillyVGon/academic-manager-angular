import { Project } from "./project.interface";

export type ProjectPayload = Omit<Project, 'id'>