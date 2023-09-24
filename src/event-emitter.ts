import TypedEmitter from "typed-emitter";

const EventEmitter = require("events");

type MessageEvents = {
  onSetPreview: () => void;
};

const messageEmitter = new EventEmitter() as TypedEmitter<MessageEvents>;

const resetEmitter = () => {
  messageEmitter.removeAllListeners();
};

export { messageEmitter, resetEmitter };
