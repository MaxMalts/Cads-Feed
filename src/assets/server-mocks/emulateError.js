const ERROR_PROBABILITY = 0.05;

export default function emulateError() {
    if (Math.random() < ERROR_PROBABILITY) {
        throw new Error("Emulated error. Everything is ok.");
    }
}