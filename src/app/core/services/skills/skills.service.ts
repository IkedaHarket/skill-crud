import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject} from 'rxjs';

import { AlertService } from 'src/app/core/services';
import { CreateSkillDTO, Skill } from '../../interfaces';
import SkillsData from "../skills-data";

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private _skills = new BehaviorSubject<Skill[] | null>(SkillsData);
  public skills$ = this._skills.asObservable();

  constructor(
    private readonly alert: AlertService,
  ) { 

    this.getSkills();
  }

  getSkills(){
    const skills = this.readLocalStorage();
    if(skills.length <= 0 ) return;
    this._skills.next(skills);
  }
  
  postSkill(skill:CreateSkillDTO){
      this.alert.displayToast({icon:'success',title:'Habilidad creada'})
      this._skills.next([...<[]>this._skills.value, {...skill, id: uuidv4()}])
      this.writeLocalStorage(this._skills.value!)
  }

  editSkill(newSkill:CreateSkillDTO, idSkill:string){
      this.alert.displayToast({icon:'success',title:'Habilidad editada'})
      const newSkills = this._skills.value?.map((skill) => (skill.id === idSkill)? {...newSkill, id: idSkill}: skill ) || []
      this._skills.next(newSkills)
      this.writeLocalStorage(newSkills)
  }
  
  deleteSkill(idSkill:string){
    this.alert.displayToast({icon:'success',title:'Habilidad borrada'})
    this._skills.next([...<[]>this._skills.value?.filter(({id}) => id !== idSkill)])
    this.writeLocalStorage(this._skills.value!)
  }

  private readLocalStorage(): Skill[]{
    return JSON.parse(localStorage.getItem('skills') || '[]') || []
  }

  private writeLocalStorage(skills: Skill[]): void{
    localStorage.setItem('skills', JSON.stringify(skills))
  }
}
