import { Injectable } from '@angular/core';
import { Assignement } from '../assignements/assignement.model';
import { catchError, first, forkJoin, map, Observable, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IFilterParam } from './types';

@Injectable({
  providedIn: 'root'
})
export class AssignementsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };
  
  assignements: Assignement[] = []

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient,
  ) { }

  uri = "https://angularmiage-u4il.onrender.com/api/assignments";
  //uri = "https://api-cours-angular-2023.herokuapp.com/api/assignments";


  getAssignements(): Observable<any> {
    return this.http.get<any>(this.uri);
     //return of(this.assignments);
  }
  // renvoie comme Observable l'assignment dont l'id est passé
  // en paramètre, ou undefined s'il n'existe pas
  getAssignmentsPagine(page: number, limit: number, sortBy: string, sortOrder: number, returned: IFilterParam): Observable<any> {
    /*const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    if(a)

    console.log("getAssignment id= " + id + " nom = " + a.nom)*/
    //return of(a);
    const queryParams = {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
      returned: returned
    }
    return this.http.get<any>(this.uri,{params: queryParams});
  }

  addAssignement(assignement: Assignement): Observable<any> {
    //this.assignments.push(assignment);

    //this.logginService.log(assignment.nom, "ajouté !");

    //return of("Assignment ajouté");
    this.loggingService.log(assignement, 'ajouté');
    return this.http.post<Assignement>(this.uri, assignement, this.httpOptions);
  }


  updateAssignement(assignement: Assignement): Observable<any> {
    // On n'a besoin de rien faire pour le moment, puisque l'assignment est passé par référence
    // et que l'objet est modifié dans le tableau
    // Plus tard on utilisera un Web Service distant...
    console.table(this.assignements);
    this.loggingService.log(assignement, 'modifié');
    return this.http.put<Assignement>(this.uri, assignement);
  }

  getAssignementById(id: number): Observable<Assignement> {
    return this.http.get<Assignement>(`${this.uri}/${id}`)
      .pipe(catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id)),
      tap(_ => console.log(`tap : assignement id = ${id} requête GET envoyée sur mongoDB cloud`)));
  }

  deleteAssignement(assignement: Assignement): Observable<any> {
    const pos = this.assignements.indexOf(assignement);
    this.assignements.splice(pos, 1);
    this.loggingService.log(assignement, 'supprimé');
    const deleteUri = `${this.uri}/${assignement._id}`;
    return this.http.delete<Assignement>(deleteUri)
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué ' + error.message);
      return of(result as T);
    }
 };

}
