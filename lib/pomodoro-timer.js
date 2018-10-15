'use babel';

import PomodoroTimerView from './pomodoro-timer-view';
import { CompositeDisposable } from 'atom';

export default {

  pomodoroTimerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pomodoroTimerView = new PomodoroTimerView(state.pomodoroTimerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pomodoroTimerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pomodoro-timer:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pomodoroTimerView.destroy();
  },

  serialize() {
    return {
      pomodoroTimerViewState: this.pomodoroTimerView.serialize()
    };
  },

  toggle() {
    console.log('PomodoroTimer was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
