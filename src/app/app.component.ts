import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({ 
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent {
  
  public Editor = ClassicEditor;
  public ckEditoConfig = {toolbar: [ 'heading',
  '|',
  'bold',
  'italic',
  '|',
  'bulletedList',
  'numberedList',
  '|',
  'insertTable',
  '|',
  'undo',
  'redo' ]};

  questions: any = [];
  newQuestion = '';
  newOption: any;
  showQuestionModel = false;
  questionError = '';
  optionError = '';

  addOption(question: {
    showInput: boolean; options: { option: any; value: any; }[]; newOption: string; 
}) {
    if (!question.newOption) {
      this.optionError = 'Option field is required';
      return;
    }

    this.optionError = '';
    question.options.push({ option: question.newOption, value: question.newOption });
    question.newOption = '';
    question.showInput = false;
  }

  addQuestion() {
    if (!this.newQuestion || !this.newOption) {
      this.questionError = 'Question and option fields are required';
      return;
    }

    this.questionError = '';
    this.questions.push({ 
      question: this.newQuestion,
      options: [{ option: this.newOption, value: this.newOption }],
      showInput: false
    });
    this.newQuestion = '';
    this.newOption = '';
  }
  
  toggleOptionInput(question: { showInput: boolean; }) {
    question.showInput = !question.showInput;
  }

  toggleQuestionModal() {
    this.showQuestionModel = !this.showQuestionModel;
  }
  
  removeOption(questionIndex: string | number, optionIndex: any) {
    this.questions[questionIndex].options.splice(optionIndex, 1);
  }

  removeQuestion(questionIndex: number) {
    this.questions.splice(questionIndex, 1);
  }

  dropQuestion(event: CdkDragDrop<{ text: string; options: any[]; newOption: string; }>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }
  dropOption(questionIndex:number, event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions[questionIndex].options, event.previousIndex, event.currentIndex);
  }
  saveChanges() {
    const data = {
      questions: this.questions
    };
  
    const jsonData = JSON.stringify(data);
  console.log(jsonData);
  
    // save jsonData to a file or store it in a database
  }
}
// ClassicEditor.defaultConfig = {
//   toolbar: {
//     items: [
//       'heading',
//       '|',
//       'bold',
//       'italic',
//       '|',
//       'bulletedList',
//       'numberedList',
//       '|',
//       'insertTable',
//       '|',
//       'undo',
//       'redo'
//     ]
//   },
//   table: {
//     contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
//   },
//   language: 'en'
// };
