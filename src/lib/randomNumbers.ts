export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

export const getRandomNumberAvoiding = (min = 20, max = 81, minAvoid = 40, maxAvoid = 60) => {
    let position = getRandomNumber(min, max);
    const midPoint = (minAvoid + maxAvoid) / 2;
    if (position < midPoint && position >= minAvoid) {
        return minAvoid - 1
    }
    else if (position >= midPoint && position <= maxAvoid) {
        return maxAvoid + 1
    }
    else {
        return position
    }
};