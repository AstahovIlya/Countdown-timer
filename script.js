'use strict'
const countdownTimers = document.querySelectorAll('[data-countdow-timer]');

class CountdowTimer {
   carentDate = new Date();
   countdownTimer;
   countdownSeconds;
   countdownMinuts;
   countdownHours;
   countdownDays;
   endCountdow;

   constructor(elemTimerDocument) {
      this.countdownTimer = elemTimerDocument;
      this.countdownSeconds = this.countdownTimer.querySelector('[data-countdow-seconds]');
      this.countdownMinuts = this.countdownTimer.querySelector('[data-countdow-minuts]');
      this.countdownHours = this.countdownTimer.querySelector('[data-countdow-hours]');
      this.countdownDays = this.countdownTimer.querySelector('[data-countdow-days]');

      if (this.countdownTimer.getAttribute('data-countdow-timer') != "") {
         this.endCountdow = new Date(this.countdownTimer.getAttribute('data-countdow-timer'));
      } else {
         this.endCountdow = new Date(this.carentDate.getFullYear(), this.carentDate.getMonth(), this.carentDate.getDate() + 1)
      }
   }


   getTimeLeft() { return this.endCountdow - new Date(); }

   getDaysLeft() { return Math.floor(this.getTimeLeft() / 8.64e+7); }

   getHoursLeft() { return Math.floor(this.getTimeLeft() / 3.6e+6) - this.getDaysLeft(this.getTimeLeft()) * 24; }

   getMinutesLeft() {
      return Math.floor(this.getTimeLeft() / (1000 * 60)) - this.getDaysLeft(this.getTimeLeft()) * 1440 - this.getHoursLeft(this.getTimeLeft()) * 60;
   }

   getSecondsLeft() {
      return Math.floor(this.getTimeLeft() / 1000) - this.getDaysLeft(this.getTimeLeft()) * 86400 - this.getHoursLeft(this.getTimeLeft()) * 3600 -
         this.getMinutesLeft(this.getTimeLeft()) * 60
   }

   addZeroStart(unitTime) {
      if (String(unitTime).length < 2) {
         return '0' + unitTime;
      } else {
         return unitTime;
      }
   }

   showRemainingTime() {
      if (this.countdownSeconds !== null) {
         let second = this.countdownSeconds;
         second.classList.add('_flip-animation')
         setTimeout(() => {
            second.innerHTML = `<span>${this.addZeroStart(this.showRemainingSecond())}</span>`;
            second.classList.remove('_flip-animation')
         }, 500)
      }
      if (this.countdownMinuts !== null) {
         if (this.showRemainingSecond() == 0) {
            let minut = this.countdownMinuts;
            minut.classList.add('_flip-animation')
            setTimeout(() => {
               minut.innerHTML = `<span>${this.addZeroStart(this.showRemainingMinuts())}</span>`;
               minut.classList.remove('_flip-animation')
            }, 500)
         }
      }
      if (this.countdownHours !== null) {
         if (this.showRemainingMinuts() == 0) {
            let hour = this.countdownHours;
            hour.classList.add('_flip-animation')
            setTimeout(() => {
               hour.innerHTML = `<span>${this.addZeroStart(this.showRemainingHours())}</span>`;
               hour.classList.remove('_flip-animation')
            }, 500)
         }
      }
      if (this.countdownDays !== null) {
         if (this.showRemainingHours() == 23) {
            let day = this.countdownDays;
            day.classList.add('_flip-animation')
            setTimeout(() => {
               day.innerHTML = `<span>${this.addZeroStart(this.showRemainingDays())}</span>`;
               day.classList.remove('_flip-animation')
            }, 500)
         }
      }
   }

   showRemainingSecond() {
      return this.getSecondsLeft(this.getTimeLeft());
   }
   showRemainingMinuts() {
      return this.getMinutesLeft(this.getTimeLeft());
   }
   showRemainingHours() {
      return this.getHoursLeft(this.getTimeLeft());
   }
   showRemainingDays() {
      return this.getDaysLeft(this.getTimeLeft())
   }

   getIntervalTimer() {
      if (this.endCountdow - this.carentDate <= 0) {
         if (this.countdownSeconds !== null) {
            this.countdownSeconds.textContent = '00';
         }
         if (this.countdownMinuts !== null) {
            this.countdownMinuts.textContent = '00';
         }
         if (this.countdownHours !== null) {
            countdownHours.textContent = '00';
         }
         if (this.countdownDays !== null) {
            this.countdownDays.textContent = '00';
         }

         clearInterval(idIntervalTimer);

         throw new Error("The specified date is less than the current one. Change the end date.");
      }
      this.showRemainingTime()
   }

   startingCountdow() {
      if (this.countdownSeconds !== null) {
         this.countdownSeconds.innerHTML = `<span>${this.addZeroStart(this.getSecondsLeft(this.getTimeLeft()))}</span>`;
      }
      if (this.countdownMinuts !== null) {
         this.countdownMinuts.innerHTML = `<span>${this.addZeroStart(this.getMinutesLeft(this.getTimeLeft()))}</span>`;
      }
      if (this.countdownHours !== null) {
         this.countdownHours.innerHTML = `<span>${this.addZeroStart(this.getHoursLeft(this.getTimeLeft()))}</span>`;
      }
      if (this.countdownDays !== null) {
         this.countdownDays.innerHTML = `<span>${this.addZeroStart(this.getDaysLeft(this.getTimeLeft()))}</span>`;
      }
      let idIntervalTimer = setInterval(() => { this.getIntervalTimer() }, 1000)
   }
}

for (let timer of countdownTimers) {
   let newTimer = new CountdowTimer(timer)
   newTimer.startingCountdow()
}
