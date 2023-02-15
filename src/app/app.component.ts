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
      option: new FormControl(['', Validators.required]),
      option2: new FormControl(['', Validators.required])
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
        { option: this.questionForm.value.option, isCorrect: false},
        { option: this.questionForm.value.option2, isCorrect: false}
      ],
      showInput: false,
    };

    this.questions.push(question);
    this.toggleQuestionModal();
  }
  
  setCorrectOption(quesIndex:number, optionindex: number){
    this.questions[quesIndex].options = this.questions[quesIndex].options.map((item:{ option: any; isCorrect:boolean }, idx:number) => 
      ({...item, isCorrect: optionindex === idx ? true: false })
    );
  }

  addOption(question: { options: { option: any; isCorrect:boolean }[]; showInput: boolean; }) {
    question.options.push({ option: this.optionForm.value.newOption, isCorrect: false });
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
  // SPOSTARE IL RISPOSTA
  dropOption(questionIndex:number, event: CdkDragDrop<string[]>) {
    const question = this.questions[questionIndex];
    moveItemInArray(question.options, event.previousIndex, event.currentIndex);
  }

  //SPOSTARE IL DOMANDE
  dropQuestion(event: CdkDragDrop<{ text: string; options: any[]; newOption: string; }>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }
  saveChanges() {
    // Check that each question has at least one option selected as correct
    const isQuestionsValid = this.questions.every((question: any) => {
      return question.options.some((option: any) => {
        return option.isCorrect;
      });
    });
  
    //CHECKING QUESTION ARE VALID AND QUESTION MODEL R CLOSED
    //SAVING FORMDATA AS JASONEDITOR FORMATE
    if (isQuestionsValid && !this.showQuestionModel) {
      const surveyJSData = this.questions.map((q: { options: any[]; question: any; }) => {
        const options = q.options.map((o) => {
          return {
            text: o.option,
            value: o.isCorrect
          };
        });
  
        return {
          type: "radiogroup",
          name: q.question,
          title: q.question,
          choices: options,
          correctAnswer: q.options.find(option => option.isCorrect).option
        };
      });
  
      const surveyJSObject = {
        "locale": "it",
        "title": {
        "it": "Amgular reactive Question Form"
      },
        pages: [{
          "name": "page 1",
          "elements": surveyJSData
        }],
        "showPrevButton": false,
        "showPageTitles": false,
        "progressBarType": "questions",
        "checkErrorsMode": "onComplete",
        "completeText": {
         "fr": "Envoyer"
        },
        "questionsOnPageMode": "questionPerPage",
        "widthMode": "responsive",
        "width": "1000px"
      };
  
      console.log(JSON.stringify(surveyJSObject));
  
      return surveyJSObject;
    } else {
      alert("Please select at least one correct option for each question or complete the question");
      return null; // add a return statement
    }
  }
  
}  
    
