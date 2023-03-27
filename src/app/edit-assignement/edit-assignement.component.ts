import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignement } from '../assignements/assignement.model';
import { AssignementsService } from '../shared/assignements.service';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './edit-assignement.component.html',
  styleUrls: ['./edit-assignement.component.scss'],
})
export class EditAssignementComponent implements OnInit {
  nomAssignment!: string;
  assignment!: Assignement | undefined;
  remarques: string;
  note: number;
  dateDeRendu!: Date;

  constructor(
    private assignmentsService: AssignementsService,
    private currentRoute: ActivatedRoute,
    private appRouter: Router
  ) {}

  ngOnInit(): void {
    this.fetchAssignment();

    console.log('Query Params : ', this.currentRoute.snapshot.queryParams);
    console.log('Snapshot : ', this.currentRoute.snapshot.fragment);
  }

  fetchAssignment() {
    const assignmentID = +this.currentRoute.snapshot.params['id'];
    this.assignmentsService.getAssignementById(assignmentID).subscribe((assignment) => {
      if (!assignment) return;
      this.nomAssignment = assignment.nom;
      this.assignment = assignment;
      this.remarques = assignment.remarque;
      this.note = assignment.note
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }
  onSaveAssignment() {
    if (!this.assignment) return;
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.remarque = this.remarques;
    this.assignment.note = this.note;
    this.assignmentsService
      .updateAssignement(this.assignment)
      .subscribe((message) => {
        console.log(message);
  
        console.log(this.assignment);
        // navigation vers la home page
        this.appRouter.navigate(['/assignements']);
      });
  }
  }