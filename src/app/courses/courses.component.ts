import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KurserService } from '../service/kurser.service';
import { Course } from '../model/course';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {
  courselist: Course[] = [];
  courselist_orginal:Course[] = [];
  inputform: FormGroup;
  constructor(private kurserService: KurserService,private formBuilder: FormBuilder,) {
    
  this.inputform = this.formBuilder.group({
    sokord: ''
    });


   }

  ngOnInit() {
      this.kurserService.getCourses().subscribe((data) => {
      this.courselist = data;
      //Sparar för att slippa api anrop mellan filteringssökning
      this.courselist_orginal = this.courselist;
    });
  }


  sort_code()
  {
    this.courselist = this.courselist.sort((a,b) => (a.code>b.code)?1 :-1);
  }

  sort_coursename()
  {
    this.courselist = this.courselist.sort((a,b) => (a.coursename>b.coursename)?1 :-1);
  }

  sort_progression()
  {
    this.courselist = this.courselist.sort((a,b) => (a.progression>b.progression)?1 :-1);   
  }

  filtersokord()
  {
    //sätter orginal innan filtering påbörjas
    this.courselist=this.courselist_orginal ;
    //hanterar ifall det inte står nåt värde. 
    const sokord = this.inputform.get('sokord')?.value || '';
    this.courselist = this.courselist.filter(item => item.code.toLowerCase().includes(sokord.toLowerCase())||item.coursename.toLowerCase().includes(sokord.toLowerCase()));
  }


}
