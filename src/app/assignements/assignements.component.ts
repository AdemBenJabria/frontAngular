import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AssignementsService } from '../shared/assignements.service';
import { Assignement } from './assignement.model';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import { IFilterParam } from '../shared/types';
import { MatPaginator } from '@angular/material/paginator';
import { first } from 'rxjs';

@Component({
  selector: 'app-assignements',
  templateUrl: './assignements.component.html',
  styleUrls: ['./assignements.component.scss']
})
export class AssignementsComponent implements OnInit {


  dataSource: MatTableDataSource<Assignement>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterEnum: typeof IFilterParam = IFilterParam;

  displayedColumns: string[] = ['nom', 'auteur', 'matiere','rendu', 'dateDeRendu'];

  filterRendu: IFilterParam = IFilterParam.NO_FILTER;

  assignements: Assignement[];

  addButtonActive = false;

  constructor(
    private assignementsService: AssignementsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.assignementsService.getAssignements()
      .pipe(first())
      .subscribe(res => {
        this.dataSource = new MatTableDataSource<Assignement>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: Assignement, filter: string) => {
      return data.nom.toLowerCase().indexOf(filter) !== -1;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAssignements(){
    this.assignementsService.getAssignements()
      .subscribe(res => {
        this.assignements = res.docs;
      });
  };

  deleteAssignement(event: Assignement) {
    this.assignementsService.deleteAssignement(event)
      .subscribe(message => console.log(message));
  }

  filterByStatus(filterValue: IFilterParam) {
    if(filterValue !== IFilterParam.NO_FILTER){
      this.dataSource.filterPredicate = (data: Assignement, filter: string) => {
        return data.rendu === (filter === IFilterParam.RETURNED_ONLY);
      }
      this.dataSource.filter = filterValue;
    } else {
      this.dataSource.filter = '';
    }
  }
}