import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public Editor = ClassicEditor;
  public ckEditorConfig = {toolbar: [ 'heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'insertTable', '|','undo', 'redo' ]};
  
  questionForm: FormGroup;
  optionForm: FormGroup;
  showQuestionModel = false;
  questions: any = [];

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      question: new FormControl(['', Validators.required]),
      option: new FormControl(['', Validators.required])
    });

    this.optionForm = this.fb.group({
      newOption: ['', Validators.required]
    });
  }

  get questionControl() {
    return this.questionForm.get('question');
  }

  get optionControl() {
    return this.questionForm.get('option');
  }

  toggleQuestionModal() {
    this.showQuestionModel = !this.showQuestionModel;
    this.questionForm.reset();
  }

  addQuestion() {
    const question = {
      question: this.questionForm.value.question,
      options: [
        { option: this.questionForm.value.option}
      ],
      showInput: false
    };

    this.questions.push(question);
    this.toggleQuestionModal();
  }
  addOption(question: { options: { option: any; }[]; showInput: boolean; }) {
    question.options.push({ option: this.optionForm.value.newOption });
    question.showInput = false;
    this.optionForm.reset();
  }
  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  toggleOptionInput(question: { showInput: boolean; }) {
    question.showInput = !question.showInput;
    this.optionForm.reset();
  }

  removeOption(questionIndex: number, optionIndex: any) {
    this.questions[questionIndex].options.splice(optionIndex, 1);
  }

    dropOption(questionIndex:number, event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions[questionIndex].options, event.previousIndex, event.currentIndex);
  }
    dropQuestion(event: CdkDragDrop<{ text: string; options: any[]; newOption: string; }>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }
  saveChanges() {
    // implement logic for saving changes to backend
    const data = {
      questions : this.questions
    }
    console.log(data);
    
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   template: `
//     <form [formGroup]="questionForm">
//       <div>
//         <label for="question">Question:</label>
//         <input type="text" id="question" formControlName="question">
//       </div>
//       <div>
//         <label for="option1">Option 1:</label>
//         <input type="text" id="option1" formControlName="option1">
//       </div>
//       <div>
//         <label for="option2">Option 2:</label>
//         <input type="text" id="option2" formControlName="option2">
//       </div>
//       <button (click)="addQuestion()">Save</button>
//     </form>

//     <h3>Questions and Options:</h3>
//     <ul>
//       <li *ngFor="let q of questions">
//         {{q.question}}
//         <ul>
//           <li *ngFor="let o of q.options">{{o}}</li>
//         </ul>
//         <div>
//           <input type="text" [(ngModel)]="newOption">
//           <button (click)="addOption(q, newOption)">Add Option</button>
//         </div>
//       </li>
//     </ul>
//     <button (click)="save()"> save changes</button>
//   `
// })
// export class AppComponent implements OnInit {
//   questionForm!: FormGroup;
//   questions: any[] = [];
//   newOption!: string;
//   optionForm!: FormGroup;
//   ngOnInit() {
//     this.questionForm = new FormGroup({
//       question: new FormControl('', Validators.required),
//       option1: new FormControl('', Validators.required),
//       option2: new FormControl('', Validators.required)
//     });
//     this.optionForm = new FormGroup({
//             newOption: ['', Validators.required]
//           });
//   }
//     toggleOptionInput(question: { showInput: boolean; }) {
//     question.showInput = !question.showInput;
//     this.optionForm.reset();
//   }
//   addQuestion() {
//     this.questions.push({
//       question: this.questionForm.value.question,
//       options: [this.questionForm.value.option1, this.questionForm.value.option2]
//     });

//     this.questionForm.reset();
//   }

//   addOption(question: { options: any[]; }, option: any) {
//     question.options.push(option);
//   }
//   save(){
//     console.log(this.questions);
    
//   }
// }

