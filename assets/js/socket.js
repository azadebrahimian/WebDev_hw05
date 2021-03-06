import { Socket } from "phoenix";

let socket = new Socket(
  "/socket",
  { params: { token: "" } }
);
socket.connect();

let channel = socket.channel("game:1", {});

let state = {
  gameStarted: false,
  guess: "",
  history: [],
  guesses: 0,
  invalidGuess: false,
  won: false
};

let callback = null;

function state_update(st) {
  console.log("New state", st);
  state = st;
  if (callback) {
    callback(st);
  }
}

export function ch_join(cb) {
  callback = cb;
  callback(state);
}

export function ch_begin() {
  channel.push("begin", {})
    .receive("ok", state_update)
    .receive("error", resp => { console.log("Unable to push", resp) });
}

export function ch_enter(val) {
  channel.push("enter", val)
    .receive("ok", state_update)
    .receive("error", resp => { console.log("Unable to push", resp) });
}

export function ch_push(guess) {
  channel.push("guess", guess)
    .receive("ok", state_update)
    .receive("error", resp => { console.log("Unable to push", resp) });
}

export function ch_reset() {
  channel.push("reset", {})
    .receive("ok", state_update)
    .receive("error", resp => { console.log("Unable to push", resp) });
}

channel.join()
  .receive("ok", state_update)
  .receive("error", resp => { console.log("Unable to join", resp) });
