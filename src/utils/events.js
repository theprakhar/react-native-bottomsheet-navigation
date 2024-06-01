 const emitter = {
  events: {},
  emit: function (event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => {
      callback(data);
    });
  },
  addEventListener: function (event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return {
      remove: () => this.removeEventListener(event, callback),
    };
  },
  removeEventListener: function (event, callback) {
    if (!this.events[event]) return;
    const index = this.events[event].indexOf(callback);
    if (index != -1) {
      this.events[event].splice(index, 1);
    }
  },
};


export const BOTTOMSHEET_NAVIGATION_EVENT = {
  PUSH: "PUSH",
  NAVIGATE: "NAVIGATE",
  CLOSE_ALL: "CLOSE_ALL",
  CLOSE: "CLOSE",
};

/**
 * for internal use only, avoid using directly
 */
export const dispatchSheetEvent = (eventType, descriptor) => {
  emitter.emit(eventType, descriptor);
};
/**
 * for internal use only, avoid using directly
 */
export const addNavigationEventListener = (event, callback) => {
  emitter.addEventListener(event, callback);
};