import { Component, Input, OnInit } from '@angular/core';
import { Assignement } from '../assignements/assignement.model';

@Component({
  selector: 'app-status-tag',
  templateUrl: './status-tag.component.html',
  styleUrls: ['./status-tag.component.scss']
})
export class StatusTagComponent implements OnInit {

  @Input() assignement: Assignement;
  isLate: boolean;

  constructor() { }

  ngOnInit(): void {
    if(!this.assignement.rendu){
      this.isLate = (new Date(this.assignement.dateDeRendu) < new Date());
    }
  }
}
