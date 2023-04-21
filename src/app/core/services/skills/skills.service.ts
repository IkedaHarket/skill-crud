import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { CreateSkillDTO, Skill } from '../../interfaces';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/core/services';
import SkillsData from "../skills-data";

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private _skills = new BehaviorSubject<Skill[] | null>(SkillsData);
  public skills$ = this._skills.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly alert: AlertService,
  ) { }

  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${environment.backendUrl}skills`).pipe(
      tap((resp) => this._skills.next(resp)),
      catchError((e) => this.handleErrorApi(e))
    )
  }
  
  postSkill(skill:CreateSkillDTO){
      this.alert.displayToast({icon:'success',title:'Habilidad creada'})
      this._skills.next([...<[]>this._skills.value, {...skill, id: uuidv4()}])
  }

  editSkill(newSkill:CreateSkillDTO, idSkill:string){
      this.alert.displayToast({icon:'success',title:'Habilidad editada'})
      const newSkills = this._skills.value?.map((skill) => (skill.id === idSkill)? {...newSkill, id: idSkill}: skill ) || []
      this._skills.next(newSkills)
  }
  
  deleteSkill(idSkill:string){
    this.alert.displayToast({icon:'success',title:'Habilidad borrada'})
    this._skills.next([...<[]>this._skills.value?.filter(({id}) => id !== idSkill)])
  }

  private handleErrorApi(error : HttpErrorResponse, crudType?: 'agregar' | 'eliminar' | 'editar' ){

    if(crudType){
      this.alert.displayToast({icon: 'error', title: `Error al ${crudType} la habilidad`})
    }

    return throwError(
      () => new Error(`Un error ha ocurrido; por favor reintente mas tarde.`)
    );
  }

}
