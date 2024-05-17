import { dayInMs } from "./constants";

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

let globalMockData: MockData;

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
    const tenDaysAgo: number = Date.now() - 10 * dayInMs;
    [...new Array(10)].forEach((_, i) => {
        allTickers.forEach(ticker => {
            const isMarketGoingUp: boolean = coinflip();
            const isSocialMediaGoingUp: boolean = coinflip();

            let price: number;
            let socialMediaCount: number;

            if (i === 0) {
                price = numberRandomizer(1, 1000);
                socialMediaCount = numberRandomizer(1000, 100000);
            }
            else {
                const lastDayPrice: number = stocks[ticker][i - 1].price;
                const priceIncrement: number = lastDayPrice * 0.1;
                price = isMarketGoingUp ? numberRandomizer(lastDayPrice, lastDayPrice + priceIncrement) : numberRandomizer(lastDayPrice, lastDayPrice - priceIncrement);

                const lastDaySocialMediaCount: number = stocks[ticker][i - 1].socialMediaCount;
                const socialMediaCountIncrement: number = lastDaySocialMediaCount * 0.1;
                socialMediaCount = isSocialMediaGoingUp ? numberRandomizer(lastDaySocialMediaCount, lastDaySocialMediaCount + socialMediaCountIncrement) : numberRandomizer(lastDaySocialMediaCount, lastDaySocialMediaCount - socialMediaCountIncrement);
            }

            const newDataEntry: Stock = {
                ticker: ticker,
                timestamp: tenDaysAgo + i * dayInMs,
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

const coinflip = (): boolean => {
    return Math.round(Math.random()) === 0;
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
