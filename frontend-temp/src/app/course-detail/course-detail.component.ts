import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  standalone: true,
  styleUrls: ['./course-detail.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule
  ]
})
export class CourseDetailComponent implements OnInit {
  courseForm!: FormGroup;
  isEdit: boolean = false;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!id;

    this.courseForm = this.fb.group({
      CourseName: ['', Validators.required],
      CourseDescription: ['', Validators.required],
      // other fields...
    });

    if (this.isEdit) {
      this.courseService.getCourse(id!).subscribe(course => {
        this.courseForm.patchValue(course);
      });
    }
  }

  save() {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      if (this.isEdit) {
        this.courseService.updateCourse(this.route.snapshot.paramMap.get('id')!, courseData).subscribe(() => {
          this.router.navigate(['/course-list']);  // Navigate back to the course list
        });
      } else {
        this.courseService.createCourse(courseData).subscribe(() => {
          this.router.navigate(['/course-list']);  // Navigate back to the course list
        });
      }
    }
  }

  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this course?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.deleteCourse(id!).subscribe(() => {
          this.router.navigate(['/course-list']);  // Navigate back to the course list
        });
      }
    });
  }
}
