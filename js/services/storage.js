import { storageGet, storageSet } from '../utils/utils.js';

export class RecordService {
    constructor() {
        this.STORAGE_KEY = 'snake_record';
        this.currentRecord = storageGet(this.STORAGE_KEY, { score: 0, time: Infinity });
    }

    getRecord() {
        return this.currentRecord;
    }

    checkAndUpdate(score, gameTime) {
        const isNewScoreHigher = score > this.currentRecord.score;
        const isTimeBetterAtEqualScore = score === this.currentRecord.score && gameTime < this.currentRecord.time;

        if (isNewScoreHigher || isTimeBetterAtEqualScore) {
            this.currentRecord = { score, time: gameTime };
            storageSet(this.STORAGE_KEY, this.currentRecord);
            return true;
        }

        return false;
    }
}