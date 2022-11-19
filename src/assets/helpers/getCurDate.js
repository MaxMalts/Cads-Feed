export default function getCurDate() {
    return new Date().toISOString().split('T')[0];
}

