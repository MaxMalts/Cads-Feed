const ERROR_PROBABILITY = 0.05;

export default function emulateError() {
    if (Math.random() > 0.5) {
        throw new Error("Emulated error");
    }
}