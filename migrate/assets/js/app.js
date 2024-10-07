
class UI {
    constructor() {
       this.preloading = document.querySelector('.preloading');
 
       //variables for questions
 
 
       //vaiables for form
       this.modalStart_div           = document.querySelector('#modalStart');
       this.start_form               = document.querySelector('#formStart');
       this.rounds_input             = document.querySelector('#rounds');
       this.roundsError_div          = document.querySelector('#roundsError');
       this.questionsAmount_put      = document.querySelector('#questionsAmount');
       this.questionsAmountError_div = document.querySelector('#questionsAmountError');
       this.secondsAmount_input      = document.querySelector('#secondsAmount');
       this.showRange_div            = document.querySelector('#showRange')
       this.participant_input        = document.querySelector('#participant');
       this.participantError_div     = document.querySelector('#participantError');
       this.participantsList_div     = document.querySelector('#participantsList');
       this.participant_btn          = document.querySelector('#btnParticipant');
       this.oldTestament_div         = document.querySelector('#oldTestament');
       this.newTestament_div         = document.querySelector('#newTestament');
       this.submit_btn               = document.querySelector('#btnSubmitForm');
       this.closeForm_btn            = document.querySelector('#btnCloseForm');
       
       //game
       this.game_div                = document.querySelector('#game')
       this.mainContent             = document.querySelector('#main-content');
       this.nameParticipant_span    = document.querySelector('.name-participant .name');
       this.roundGame_span          = document.querySelector('.round-participant .round');
       this.roundCanceled_span      = document.querySelector('.round-participant .round-cancel');
       this.question_h3             = document.querySelector('.question h3');
       this.answers_div             = document.querySelector('.answers');
       this.clock_div               = document.querySelector('.clock .content');
       this.clock;
       this.seconds;
 
       //Settings
       this.secondsAmount_input.value = 30;
       this.oldBooksList = [];
       this.newBooksList = [];
 
       this.messageError = [
          'El valor mínimo para las rondas es 1',
          'El valor maxímo para las rondas es 3',
          'El valor mínimo para las preguntas es 5',
          'El valor máximo para las preguntas es 15',
          'La cantidad mínima de participantes son 2.',
          'No debe haber dos participantes con el mismo nombre.',
          'La cantidad Maxíma de participantes son 4.',
          'las preguntas seleccionadas serán de toda la biblia.',
          'La cantidad de preguntas requeridas excede las preguntas disponibles'
       ];
      
    }
 
    isFormComplete() {
       let listParticipants = this.participantsList_div.querySelectorAll('li');
       if( 
          this.rounds_input.value < 1 ||
          this.rounds_input.value > 3 ||
          this.questionsAmount_put.value < 5 ||
          this.questionsAmount_put.value > 15 ||
          listParticipants.length < 2 ||
          listParticipants.length > 4) {
          this.submit_btn.disabled = true;
       } 
       else {
          this.submit_btn.disabled = false;
       }  
    }
 
    showPreloading() {               
       setTimeout(() => {
           this.preloading.style.display = 'none';
       }, 8000);
 
      return  this.juego.visiblePreloading;
    }
 
    showError(element,msg) {
       this.clearContent(element);
 
       let div = document.createElement('div');
       div.className = 'msg-error';
       div.textContent = msg;
 
       element.appendChild(div);
    }
 
    showParticipants(participants) {
       participants.forEach(participant => {
          let li = document.createElement('li');
          let span = document.createElement('span');
          
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          span.className = 'badge badge-warning badge-pill close';
          span.setAttribute('style', 'font-size: 0.9rem;');
          span.id = 'removeParticipant';
          span.textContent = 'X';
          li.textContent = participant
          li.appendChild(span);
          this.participantsList_div.appendChild(li);
       });
      
    }
 
    showGamePanel() {
       this.game_div.classList.remove('d-none');
    }
 
    showQuestion(question) {
       const answers = question.respuestas;
 
       this.question_h3.textContent = question.descripcion;
       this.showAnswers(answers);
   }
 
   showAnswers(answers) {
       answers.forEach((answer, index) => {
          let div = document.createElement('div');
          let input = document.createElement('input');
          let label = document.createElement('label');
 
          div.className = 'form-check mb-3';
 
          let id = `answer-${index}`;;
          input.type = 'radio';
          input.name = 'answer';
          input.id = id;
          input.className = 'form-check-input';
          input.value = answer.descripcion;
 
          label.className = 'form-check-label';
          label.textContent = answer.descripcion;
          label.setAttribute('for', id);
 
          div.appendChild(input);
          div.appendChild(label);
 
          this.answers_div.appendChild(div);
 
       });
    // <div class="custom-control custom-radio mb-3">
    //    <input type="radio"  name="answers" class="custom-control-input" >
    //    <label class="custom-control-label"></label>
    // </div>
   }
 
   showClock() {
    this.clock_div.textContent = this.seconds;
   }
 
    hideMainContent() {
       this.mainContent.style.display = 'none';
    }
 
    clearContent(element) {
       while(element.firstElementChild) {
          element.removeChild(element.firstElementChild);
       }
    }
 
    closeModalStart() {
       this.closeForm_btn.click();
    }
 
    isValidRound(value) {
       if(value < 1) {
          this.showError(this.roundsError_div, this.messageError[0]);
          this.isFormComplete();
       }
       else if (value > 3) {
          this.showError(this.roundsError_div, this.messageError[1]);
          this.isFormComplete();
       } 
       else {
          this.clearContent(this.roundsError_div);
          this.isFormComplete();
       }
    }
 
    isValidQuestionsAmount(value) {
       if(value < 5) {
          this.showError(this.questionsAmountError_div, this.messageError[2]);
          this.isFormComplete();
       } 
       else if(value > 15) {
          this.showError(this.questionsAmountError_div, this.messageError[3]);
          this.isFormComplete();
       } 
       else {
          this.clearContent(ui.questionsAmountError_div);
          this.isFormComplete();
       }
    }
 
    loadTestament() {
       
       let urlOldTestament =  '/assets/DB/old_testament.json';
       let urlNewTestament =  '/assets/DB/new_testament.json';
 
       fetch(urlOldTestament)
       .then(  (res) => {
           return res.json();
       })
       .then( (oldTestament) => { 
          this.fillOldTestament(oldTestament);
       });
 
       fetch(urlNewTestament)
       .then(  (res) => {
           return res.json();
       })
       .then( (newTestament) => { 
          this.fillNewTestament(newTestament);
       });
    }
 
    fillOldTestament(oldTestament) {
       oldTestament.forEach( (book, index) => {
          let id = book+"-"+index;
          if(book === 'Todos') {
             id = 'Todos-old-' + index;
          }
          this.oldTestament_div.innerHTML += `
          <div class="acordeon-item d-inline-block mr-2">
             <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input old-testament-item"
                id="${id}" onClick="checkOldBook('${book}')" value="${book}">
                <label class="custom-control-label text-capitalize" for="${id}">${book}</label> 
             </div>
          </div>
          `;
       });
    } 
 
    fillNewTestament(newTestament) {
    newTestament.forEach( (book, index) => {
       this.newTestament_div.innerHTML += `
       <div class="acordeon-item d-inline-block mr-2">
          <div class="custom-control custom-checkbox">
             <input type="checkbox" class="custom-control-input new-testament-item"
             id="${book}-${index}" onClick="checkNewBook('${book}')" value="${book}">
             <label class="custom-control-label text-capitalize" for="${book}-${index}">${book}</label> 
          </div>
       </div>
       `;
    });
    } 
 
    checkAllOldTestament(book) {
       if(book === 'Todos') {
          let allOldBooks_input =  Array.from(document.querySelectorAll('.old-testament-item'));
          let allBook = allOldBooks_input[0];
 
          this.verifyOldChecked(allBook, allOldBooks_input);
          this.addNewBook(book);
       }
 
       this.addOldBook(book);
    }
 
    checkAllNewTestament(book) {
       if(book === 'Todos') {
          let allNewBooks_input =  Array.from(document.querySelectorAll('.new-testament-item'));
          let allBook = allNewBooks_input[0];
 
          this.verifyNewChecked(allBook, allNewBooks_input);
          this.addNewBook(book);
       }
 
       this.addNewBook(book);
    }
 
    checkOldBooks(books) {
       books.forEach((book) => {
          if( book.checked === false ) {
             book.checked = true;
             this.addOldBook(book.value);
          }
       });
    }
 
    uncheckOldBooks(books) {
       books.forEach((book) => {
          book.checked = false;
          this.oldBooksList = [];
       });
    }
 
    checkNewBooks(books) {
       books.forEach((book) => {
          if( book.checked === false ) {
             book.checked = true;
             this.addNewBook(book.value);
          }
       });
    }
 
    uncheckNewBooks(books) {
       books.forEach((book) => {
          book.checked = false;
          this.newBooksList = [];
       });
    }
 
    verifyOldChecked(book, all) {
       if( book.checked === true ) {
          this.checkOldBooks(all);
       } else {
          this.uncheckOldBooks(all);
       }
    }
 
    verifyNewChecked(book, all) {
       if( book.checked === true ) {
          this.checkNewBooks(all);
       } else {
          this.uncheckNewBooks(all);
       }
    }
 
    addOldBook(book) {
       if(this.oldBooksList.indexOf(book) === -1) {
          this.oldBooksList.push(book);
       } else {
          this.oldBooksList = this.oldBooksList.filter((b) => b !== book);
       }
    }
 
    addNewBook(book) {
       if(this.newBooksList.indexOf(book) === -1) {
          this.newBooksList.push(book);
       } else {
          this.newBooksList = this.newBooksList.filter((b) => b !== book);
       }
    }
 
    resetForm() {
       this.start_form.reset();
    }
 
    startClock(gameSecond) {
       this.seconds  = gameSecond;
       this.showClock();
       this.clock = setInterval( () => {
          this.seconds--;
          this.showClock();
          if( ui.seconds  <= 0) {
             clearInterval(this.clock);
             Swal.fire({
               title: 'Tiempo terminado, favor pasar a la siguiente pregunta.',
               icon: 'info',
               showClass: {
                   popup: 'animated fadeInDown faster'
               },
               hideClass: {
                   popup: 'animated fadeOutUp faster'
               }}
               ); 
         }
       }, 1000);
   }
   pararReloj() {
    clearInterval(this.clock);
 }
 };
 
 class Question {
     constructor(UI) {
         this.ui = UI;
         this.current = 0;
     }
 
     
  
    
 };
 
 class Game {
    constructor(ui) {
       this.rounds;
       this.questionsAmount;
       this.secondsAmount = 30;
       this.participants = [];
       this.questionRepository = [];
       this.questionRepositoryDB = [];
 
       this.ui = UI;
       this.currentQuestion = 0;
       this.currentRound = 1;
       this.currentParticipant = 0;
       this.roundCanceled = 0;
    }
 
    removeParticipant(participant) {
       this.participants =  this.participants.filter(p => p !== participant);
    }
 
    getQuestionsRequired() {
       return this.rounds * this.questionsAmount * this.participants.length;
    }
 
    getQuestionRepositoryDB() {
       let url =  '/assets/DB/question_repository.json';
 
       fetch(url)
       .then(  (res) => {
           return res.json();
       })
       .then( (questions) => { 
          this.questionRepositoryDB = questions[0];
       });
    }
 
    showParticipantName() {
      ui.nameParticipant_span.textContent = this.participants[this.currentParticipant];
    }
 
    showRound() {
       ui.roundGame_span.textContent = this.currentRound;
    }
 
    showRoundCanceled() {
       ui.roundCanceled_span.textContent = this.roundCanceled;
    }
 
    getCurrentQuestion() {
       return this.questionRepository[this.currentQuestion];
    }
 
    showNextQuestion() {
       this.current++;
       this.show();
    }
 
    start() {
       ui.resetForm();
       ui.hideMainContent();
       ui.showGamePanel();
       this.showParticipantName();
       this.showRound();
       this.showRoundCanceled();
       ui.showQuestion(this.getCurrentQuestion());
       ui.startClock(this.secondsAmount);
       ui.closeModalStart();
    }
 };
 
 const ui = new UI();
 const game = new Game(ui);
 
 window.addEventListener('DOMContentLoaded', () => {
     /*question.show();*/
     //ui.showPreloading();
     ui.loadTestament();
     game.getQuestionRepositoryDB();
 });
 
 //Forms
 ui.modalStart_div.addEventListener('change', (e) => {
    e.preventDefault();
    if(e.target.id === 'rounds') {
       ui.isValidRound(e.target.value);
       game.rounds = Number(e.target.value);
    }
    else if(e.target.id === 'questionsAmount') {
       ui.isValidQuestionsAmount(e.target.value);
       game.questionsAmount = Number(e.target.value);
    }
 });
 
 //set time in seconds
 ui.secondsAmount_input.addEventListener('input', (e) => {
    e.preventDefault();
    game.secondsAmount = Number(ui.secondsAmount_input.value);
 });
 
 //add participants
 ui.participant_btn.addEventListener('click', (e) => {
    e.preventDefault();
 
    ui.clearContent(ui.participantError_div);
 
    let participant = ui.participant_input.value;
 
    if(game.participants.length < 1) {
       ui.showError(ui.participantError_div, ui.messageError[4]);
       game.participants.push(participant);
    }
    else if(game.participants.length < 4) {
       ui.clearContent(ui.participantError_div);
 
       if( game.participants.indexOf(participant) !== -1) {
          ui.showError(ui.participantError_div, ui.messageError[5]);
       } else {
          game.participants.push(participant);
       }
    }
    else {
       ui.showError(ui.participantError_div, ui.messageError[6]);
       ui.participant_input.disabled = true;
    }
    
    ui.clearContent(ui.participantsList_div);
    ui.showParticipants(game.participants);
 
    ui.participant_input.value = '';
    ui.participant_btn.disabled = true;
 
    ui.isFormComplete();
 
 });
 
 ui.participant_input.addEventListener('input', (e) => {
    e.preventDefault();
 
    if(ui.participant_input.value !== '') {
       ui.participant_btn.disabled = false;
    }
 });
 
 ui.participantsList_div.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.id === 'removeParticipant') {
       let participant = e.target.parentElement;
       participant = participant.textContent;
       participant =  participant.substr(0, participant.length-1);
       
       game.removeParticipant(participant);
       ui.clearContent(ui.participantsList_div);
       ui.showParticipants(game.participants);
       ui.participant_input.disabled = false;
       ui.isFormComplete();
    }
 
 });
 
 ui.submit_btn.addEventListener('click', (e) => {
    e.preventDefault();
 
    if ( ! isBookSelected() ) { 
       let allQuestions = getAllQuestions(game.questionRepositoryDB);
 
       const msg = {
          title: 'No has seleccionado un libro',
          icon: 'warning',
          text: 'Las preguntas seran de todas la biblia.', 
          showCancelButton: true, 
          cancelButtonText: 'No continuar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, continuar'
       };
 
       showMessageAlert(msg, questionseAvailable, game, allQuestions);
  
    }  
    else {
       if (ui.oldBooksList.length > 0) {
          ui.oldBooksList.forEach((book) => {
             if( game.questionRepositoryDB[book] ) {
                questionseAvailable(game, getQuestionSelected(ui.oldBooksList, game.questionRepositoryDB));
             }
          });
       }  
       else if(ui.newBooksList.length > 0) {
          questionseAvailable(game, getQuestionSelected(ui.newBooksList, game.questionRepositoryDB));
       }
    }
 })
 
 function checkOldBook(book) {
    ui.checkAllOldTestament(book);
 }
 
 function checkNewBook(book) {
    ui.checkAllNewTestament(book);
 }
 
 function getAllQuestions(questionRepositoryDB) {
    let questions = [];
    
    for(const book in questionRepositoryDB) {
       questions = questions.concat(questionRepositoryDB[book]);
    }
 
    return questions;
 }
 
 function getQuestionSelected(bookList, questionRepositoryDB) {
    let questions = [];
 
    bookList.forEach((book) => {
       if( game.questionRepositoryDB[book] ) {
          questions = questions.concat(questionRepositoryDB[book]);
       }
    });
    
    return questions;
 }
 
 function questionseAvailable(game, repositories) {
    console.log('game.getQuestionsRequired(): ', game.getQuestionsRequired() )
    console.log('repositories.length: ', repositories.length)
    if(game.getQuestionsRequired() > repositories.length) {
       const msg = {
          title: 'Preguntas Excedidas',
          icon: 'error',
          text: ui.messageError[8],
       };
       showMessageAlert(msg, gameStart);
    } 
    else {
       game.questionRepository = repositories;
       const msg = {
          title: 'Inicialización de Juego',
          icon: 'success',
          text: 'Todo listo vamos a jugar.',
       };
       showMessageAlert(msg, gameStart);
       
    }
 }
 
 function isBookSelected() {
    return ui.oldBooksList.length > 0 || ui.newBooksList.length > 0 ;
 }
 
 function gameStart() {
    game.start();
 }
 
 //Next question
 // ui.btnNext.addEventListener('click', () => {
 //     question.showNext();
 // });
 
 function showMessageAlert(msg, callback = null, param1 = null, param2 = null) {
    Swal.fire(msg).then( (result) => {
       if(result.value) {
          if(callback !== null) {
             if(param1 !== null && param2 !== null) {
                callback(param1, param2);
             } else if((param1 !== null && param2 == null)) {
                callback(param1);
             } else {
                callback();
             }
             
          }
       }
     });
 }
 /***************************************************************************** */
 