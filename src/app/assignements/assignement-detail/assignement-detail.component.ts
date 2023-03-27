import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignementsService } from 'src/app/shared/assignements.service';
import { Assignement } from '../assignement.model';
import { ActivatedRoute, Router } from '@angular/router'
import { NgSelectOption } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { switchMap } from 'rxjs';
import { SubjectService } from 'src/app/shared/subject.service';
import { Subject } from 'src/app/shared/subject.model';

@Component({
  selector: 'app-assignement-detail',
  templateUrl: './assignement-detail.component.html',
  styleUrls: ['./assignement-detail.component.scss']
})
export class AssignementDetailComponent implements OnInit {
  
  // @Input()
  assignement: Assignement;
  subject: Subject;
  loaded: boolean = false;

  @Output()
  assignementToDelete = new EventEmitter<Assignement>;

  constructor(
    private assignementsService: AssignementsService,
    private subjectsService: SubjectService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAssignement()
  }

  getAssignement() {
    const id = this.route.snapshot.params['id'];
    this.assignementsService.getAssignementById(parseInt(id))
      .pipe(switchMap(assignement => {
        this.assignement = assignement;
        return this.subjectsService.getSubjectByName(assignement.matiere);
      }))
      .subscribe(res => {
        this.subject = res;
        this.loaded = true;
      });
  }

  onDeleteButtonClick(): void {
    this.assignementsService.deleteAssignement(this.assignement)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/assignements']);
      });
  }

  onClickEdit(): void {
    this.router.navigate(['/assignement', this.assignement.id, 'edit'], {queryParams: {nom: this.assignement.nom}, fragment:'edition'});
  }

  isAdmin(): boolean {
    return this.authService.loggedIn;
  }

  setRendu(event: boolean) {
    this.assignement.rendu = event;
    this.assignementsService.updateAssignement(this.assignement)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/assignements']);
      });
  }

}
