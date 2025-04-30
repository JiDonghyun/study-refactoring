// 리팩토링 후
const hospital = {
    name: 'ji',
    subscriptionStart: new Date(),
    subscriptionEnd: new Date(),
}
const start = new Date();
const end = new Date();

// 리팩토링 전
hasOverlapSubscription(start, end, hospital)

function hasOverlapSubscription(start, end, hospital) {
    const subscriptionStart = start;
    const subscriptionEnd = end;
}

// 리팩토링 후
hasOverlapSubscription(hospital)

function hasOverlapSubscription(hospital) {
    const subscriptionStart = hospital.subscriptionStart;
    const subscriptionEnd = hospital.subscriptionEnd;
}
