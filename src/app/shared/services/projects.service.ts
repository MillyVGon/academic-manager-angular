import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../interfaces/project.interface';
import { ProjectPayload } from '../interfaces/payload-project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  httpClient = inject(HttpClient)

  getAll() {
    return this.httpClient.get<Project[]>('/api/projects')
  }

  get(id: string) {
    return this.httpClient.get<Project[]>(`api/projects/${id}`)
  }

  post(payload: ProjectPayload) {
    return this.httpClient.post('api/projects', payload)
  }

  put(id: string, payload: ProjectPayload) {
    return this.httpClient.put(`api/projects/${id}`, payload)
  }

  delete(id: string) {
    return this.httpClient.delete(`api/projects/${id}`)
  }
}
