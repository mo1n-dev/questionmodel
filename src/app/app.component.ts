// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// import { Component } from '@angular/core';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// @Component({ 
//   selector: 'app-root',
//   templateUrl:'./app.component.html',
//   styleUrls:['./app.component.css']
// })
// export class AppComponent {
  
//   public Editor = ClassicEditor;

//   questions: any = [];
//   newQuestion = '';
//   newOption: any;
//   showQuestionModel = false;
//   questionError = '';
//   optionError = '';

//   addOption(question: {
//     showInput: boolean; options: { option: any; value: any; }[]; newOption: string; 
// }) {
//     if (!question.newOption) {
//       this.optionError = 'Option field is required';
//       return;
//     }

//     this.optionError = '';
//     question.options.push({ option: question.newOption, value: question.newOption });
//     question.newOption = '';
//     question.showInput = false;
//   }

//   addQuestion() {
//     if (!this.newQuestion || !this.newOption) {
//       this.questionError = 'Question and option fields are required';
//       return;
//     }

//     this.questionError = '';
//     this.questions.push({ 
//       question: this.newQuestion,
//       options: [{ option: this.newOption, value: this.newOption }],
//       showInput: false
//     });
//     this.newQuestion = '';
//     this.newOption = '';
//   }
  
//   toggleOptionInput(question: { showInput: boolean; }) {
//     question.showInput = !question.showInput;
//   }

//   toggleQuestionModal() {
//     this.showQuestionModel = !this.showQuestionModel;
//   }
  
//   removeOption(questionIndex: string | number, optionIndex: any) {
//     this.questions[questionIndex].options.splice(optionIndex, 1);
//   }

//   removeQuestion(questionIndex: number) {
//     this.questions.splice(questionIndex, 1);
//   }

//   dropQuestion(event: CdkDragDrop<{ text: string; options: any[]; newOption: string; }>) {
//     moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
//   }
//   dropOption(questionIndex:number, event: CdkDragDrop<string[]>) {
//     moveItemInArray(this.questions[questionIndex].options, event.previousIndex, event.currentIndex);
//   }
//   saveChanges() {
//     const data = {
//       questions: this.questions
//     };
  
//     const jsonData = JSON.stringify(data);
//   console.log(jsonData);
  
//     // save jsonData to a file or store it in a database
//   }
// }
// // ClassicEditor.defaultConfig = {
// //   toolbar: {
// //     items: [
// //       'heading',
// //       '|',
// //       'bold',
// //       'italic',
// //       '|',
// //       'bulletedList',
// //       'numberedList',
// //       '|',
// //       'insertTable',
// //       '|',
// //       'undo',
// //       'redo'
// //     ]
// //   },
// //   table: {
// //     contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
// //   },
// //   language: 'en'
// // };

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
        {
          option: this.questionForm.value.option
        }
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


