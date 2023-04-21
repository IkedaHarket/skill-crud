import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../validators/form-validators';
import { environment } from 'src/environments/environment';
import { SkillsService } from '../../services/skills/skills.service';
import { Skill } from '../../interfaces';
import { AlertService } from 'src/app/core/services';

type SkillForm= 'percentage' | 'title' | 'color' | 'description';

@Component({
  selector: 'app-skill-input-card',
  templateUrl: './skill-input-card.component.html',
  styleUrls: ['./skill-input-card.component.scss']
})
export class SkillInputCardComponent implements OnInit{

  @ViewChild('coverAddButton') coverAddButton!: ElementRef<HTMLElement>
  @Input('skillToEdit') skillToEdit?: Skill;
  @Output() exitEditMode = new EventEmitter<boolean>()

  skillForm: FormGroup = this.fb.group({
    percentage  : [ 0 ,[Validators.required, Validators.max(100), Validators.min(0), Validators.maxLength(2)]],
    title       : ['' ,[Validators.required]],
    color       : [ environment.primaryColor,[Validators.required]],
    description : ['']
  },{
    validators:[
      this.formValidator.percentage('percentage')
    ]
  } )

  constructor(
    private readonly fb: FormBuilder,
    private readonly formValidator: FormValidators,
    private readonly skill: SkillsService,
    private readonly alert: AlertService,
  ){}

  ngOnInit(): void {
    this.turnInitialState();
  }

  changeColor(color:string): void{
    this.skillForm.get('color')?.setValue(color);
  }

  getFieldValue(field:SkillForm): any {
    return this.skillForm.get(field)?.value;
  }

  handlerCoverButton(term: 'show' | 'hide'): void{
    if(term === 'hide') this.coverAddButton?.nativeElement.classList.add('active');
    else this.coverAddButton?.nativeElement.classList.remove('active');
  }
  
  save(){
    if(this.skillForm.invalid) return

    if(this.skillToEdit){
      this.skill.editSkill(this.skillForm.value,this.skillToEdit.id)
    }else{
      this.skill.postSkill(this.skillForm.value)
    }
    
    this.turnInitialState()
  }

  remove(){
    if(this.skillToEdit){
      this.alert.display({title: '¿Desea borrar esta habilidad?'}).then(({isConfirmed})=>{
        if(isConfirmed) this.skill.deleteSkill(this.skillToEdit!.id)
      })
      return
    }
    this.turnInitialState()
  }

  turnInitialState(){
    if(this.skillToEdit){
      this.skillForm.get('color')?.setValue(this.skillToEdit.color)
      this.skillForm.get('percentage')?.setValue(this.skillToEdit.percentage)
      this.skillForm.get('title')?.setValue(this.skillToEdit.title)
    }else{
      this.skillForm.get('color')?.setValue(environment.primaryColor)
      this.skillForm.get('percentage')?.setValue(0)
      this.skillForm.get('title')?.setValue('')
    }
    this.handlerCoverButton('show')
  }

}
