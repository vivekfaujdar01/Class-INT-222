const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Listener for 'greet' event
eventEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}! Welcome to the event-driven world of Node.js.`);
});

// Listener for 'farewell' event
eventEmitter.on('farewell', () => {
  console.log(`Goodbye! See you next time.`);
});

// Emitting 'greet' event
eventEmitter.emit('greet', 'Alice');

// Emitting 'farewell' event
eventEmitter.emit('farewell');

eventEmitter.once('oneTimeEvent', () => {
  console.log('This event will be handled only once.');
});

eventEmitter.emit('oneTimeEvent');
eventEmitter.emit('oneTimeEvent'); // This will not trigger the listener again

const showMessage = () => {
  console.log('This listener will be removed soon.');
};

eventEmitter.on('removeListenerEvent', showMessage);

eventEmitter.emit('removeListenerEvent');

eventEmitter.removeListener('removeListenerEvent', showMessage);

eventEmitter.emit('removeListenerEvent'); // This will not trigger the listener

// Demonstrating event listener count
const listenerFunction = () => {
  console.log('Listener function executed.');
};

eventEmitter.on('countEvent', listenerFunction);
eventEmitter.on('countEvent', listenerFunction);

console.log(`Number of listeners for 'countEvent': ${eventEmitter.listenerCount('countEvent')}`);

eventEmitter.removeAllListeners('countEvent');

console.log(`Number of listeners for 'countEvent' after removal: ${eventEmitter.listenerCount('countEvent')}`);

eventEmitter.on('data',()=>{
    console.log('Data event received.');
})
eventEmitter.on('data',()=>{
    console.log('Another data event received.');
})
eventEmitter.on('data',()=>{
    console.log('Yet another data event received.');
})

eventEmitter.emit('data');