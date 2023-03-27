import { Injectable } from '@angular/core';
import { Assignement } from '../assignements/assignement.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignement: Assignement, action : string) {
    console.log(`Assignement ${assignement.nom} ${action}`);
  }
}
