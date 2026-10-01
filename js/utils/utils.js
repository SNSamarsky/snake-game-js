export function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function isPositionInList(targetPos, list) {
    return list.some(pos => pos.x === targetPos.x && pos.y === targetPos.y);
}