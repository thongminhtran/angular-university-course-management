import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getCourses(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_courses?page=${page}&size=${size}`);
  }

  getCourse(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_courses/${id}`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create_course`, course);
  }

  updateCourse(id: string, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update_course/${id}`, course);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete_course/${id}`);
  }
}
