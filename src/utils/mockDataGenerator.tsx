export interface Stock {
    ticker: string,
    timestamp: number,
    price: number,
    socialMediaCount: number
}

export interface StockList {
    [path: string]: Array<Stock>
}

export interface MockData {
    stocks: StockList,
    allTickers: Array<string>
}

// Usually I would have used Redux here but because of a lack of time I am taking this shortcut to have access to the data anywhere
let globalMockData:MockData;

export const generateMockData = (): MockData => {
    // Generate a list of stock tickers
    let stocks: StockList = {};
    let allTickers: Array<string> = [];

    [...new Array(50)].forEach((_, i) => {
        const newTicker: string = tickerGenerator(allTickers);
        allTickers = allTickers.concat(newTicker);
        stocks[newTicker] = [];

    });

    // Stocks prices and Social Media counts over 24h
    const tenDaysAgo: number = Date.now() - 10 * 86400000;
    [...new Array(10)].forEach((_, i) => {
        allTickers.forEach(ticker => {
            const isMarketGoingUp: boolean = numberRandomizer(0, 1) === 0 ? true : false;
            const isSocialMediaGoingUp: boolean = numberRandomizer(0, 1) === 0 ? true : false;

            let price: number;
            let socialMediaCount: number;

            if (i === 0) {
                price = numberRandomizer(1, 1000);
                socialMediaCount = numberRandomizer(1000, 100000);
            }
            else {
                const lastHourPrice: number = stocks[ticker][i - 1].price;
                price = isMarketGoingUp ? numberRandomizer(lastHourPrice, lastHourPrice + lastHourPrice * 0.1) : numberRandomizer(lastHourPrice, lastHourPrice - lastHourPrice * 0.1);

                const lastHourSocialMediaCount: number = stocks[ticker][i - 1].socialMediaCount;
                socialMediaCount = isSocialMediaGoingUp ? numberRandomizer(lastHourSocialMediaCount, lastHourSocialMediaCount + lastHourSocialMediaCount * 0.1) : numberRandomizer(lastHourSocialMediaCount, lastHourSocialMediaCount - lastHourSocialMediaCount * 0.1);
            }

            const newDataEntry: Stock = {
                ticker: ticker,
                timestamp: tenDaysAgo + i * 86400000,
                price: price,
                socialMediaCount: socialMediaCount
            };

            stocks[ticker] = stocks[ticker].concat(newDataEntry);
        });
    });
    globalMockData = { stocks, allTickers };
    return globalMockData;
}

const numberRandomizer = (lowest: number, highest: number): number => {
    const randomNumber = Math.random() * (highest - lowest);
    return Math.round(randomNumber + lowest);
}

const tickerGenerator = (stocksGeneratedSoFar: Array<string>): string => {
    const letters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const tickerLength: number = numberRandomizer(3, 4);
    let generatedTicker: string = "";

    for (let i = 0; i < tickerLength; i++) {
        const newLetter: string = letters[numberRandomizer(0, letters.length - 1)];
        generatedTicker = generatedTicker.concat(newLetter);
    };

    // Make sure the generated Ticker wasn't already in use
    const tickerAlreadyExists: string | undefined = stocksGeneratedSoFar.find(ticker => ticker === generatedTicker);
    if (tickerAlreadyExists) {
        return tickerGenerator(stocksGeneratedSoFar);
    }

    return generatedTicker;
}
