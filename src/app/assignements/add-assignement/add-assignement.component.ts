import { Component, OnInit } from '@angular/core';
import { AssignementsService } from 'src/app/shared/assignements.service';
import { Assignement } from '../assignement.model';
import { Subject } from "../../shared/subject.model";
import { SubjectService } from 'src/app/shared/subject.service';
import { first } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { waitForAsync } from '@angular/core/testing';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user.model';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-add-assignement',
  templateUrl: './add-assignement.component.html',
  styleUrls: ['./add-assignement.component.scss']
})
export class AddAssignementComponent implements OnInit {

  // @Output() newAssignementOutput = new EventEmitter<Assignement>();
  currentUser$: Observable<User | null>;
  assignementName: string = '';
  auteur: string = '';
  dateDelivery: Date;
  assignements: any;
  subjectList: Subject[] = []
  note!: number;
  notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  remarque: string = '';
  subjectInfoLoaded: boolean = false;
  subject: Subject;

  constructor(
    private assignementsService: AssignementsService,
    private subjectService: SubjectService,
    authService: AuthService
  ) {
    this.currentUser$ = authService.userObservable;
    console.log('currentUser =>', this.currentUser$);
  }

  firstFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required])
  });
  secondFormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.subjectService.getSubjects()
      .pipe(first())
      .subscribe(res => this.subjectList = res);
  }

  onStepChange(event: any){
    const selectedIndex = event.selectedIndex;
    if(selectedIndex === 2) {
      this.getSubjectDetails(this.firstFormGroup.value.subject);
    }
  }

  getSubjectDetails(subject: any): void {
    this.subjectService.getSubjectByName(subject)
      .pipe(first())
      .subscribe(res => {
        console.log(res);
        this.subject = res;
        this.subjectInfoLoaded = true;
      }) 
  }

  test() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

  async addAssignement() {
    const currentUser = await firstValueFrom(this.currentUser$);
    const newAssignement = new Assignement();
    newAssignement.nom = this.firstFormGroup.value.name as string;
    newAssignement.dateDeRendu = new Date(this.secondFormGroup.value.date as string);
    newAssignement.rendu = false;
    newAssignement.auteur = currentUser?.first_name || '';
    newAssignement.matiere = this.subject.name;
    newAssignement.note = 0 // note par défaut
    newAssignement.remarque = this.remarque;
    newAssignement.id = Math.floor(Math.random() * 999999);
    console.log(newAssignement);
    console.log(currentUser?.first_name);
  
    this.assignementsService.addAssignement(newAssignement)
      .subscribe(response => console.log(response.message));
  
    await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second (1000 ms)
  
    window.location.replace('/assignements');
  }
}
