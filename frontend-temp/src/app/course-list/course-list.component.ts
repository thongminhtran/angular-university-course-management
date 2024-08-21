import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../course.service';
import {MatFormField} from "@angular/material/form-field";
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  standalone: true,
  styleUrls: ['./course-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    MatFormField,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CourseListComponent implements OnInit {
  displayedColumns: string[] = ['CourseName', 'CourseDescription', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private courseService: CourseService, private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(page: number = 0, size: number = 10) {
    this.courseService.getCourses(page, size).subscribe(data => {
      console.log('API response:', data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
    });
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }

  openCourseForm() {
    this.router.navigate(['/course-form']);
  }

}
