export interface Project {
  id: string;
  title: string;
  discipline?: string;
  datetime: Date;
  priority: 'low' | 'medium' | 'high';
  description?: string;
  done: boolean;
}
