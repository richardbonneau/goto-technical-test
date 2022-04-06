interface Stock {
    ticker: string,
    timestamp: number,
    price: number,
    socialMediaCount: number
}

interface StockList {
    [path: string]: Array<Stock>
}

export const generateMockData = (): void => {
    // Generate a list of stock tickers
    let stocks: StockList = {};
    let allTickers: Array<string> = [];

    [...new Array(100)].forEach((_, i) => {
        const newTicker: string = tickerGenerator(allTickers);
        allTickers = allTickers.concat(newTicker);
        stocks[newTicker] = [];

    });


    // Stocks prices and Social Media counts over 24h
    const yesterday: number = Date.now() - 24 * 60 * 60;
    [...new Array(24)].forEach((_, i) => {
        console.log("~ aai", i);
        allTickers.forEach(ticker => {
            const isMarketGoingUp: boolean = numberRandomizer(0, 1) === 0 ? true : false;
            const isSocialMediaGoingUp: boolean = numberRandomizer(0, 1) === 0 ? true : false;

            let price: number;
            let socialMediaCount: number;

            if (i === 0) {
                price = numberRandomizer(1, 1000);
            }
            else {
                console.log("~ stocks[ticker]", stocks[ticker]);
                const lastHourPrice: number = stocks[ticker][i - 1].price;
                console.log("~ lastHourPrice", lastHourPrice, lastHourPrice * 0.005);
                console.log("~ lastHourPrice", lastHourPrice, lastHourPrice * -0.005);
                price = isMarketGoingUp ? numberRandomizer(lastHourPrice, lastHourPrice + lastHourPrice * 0.1) : numberRandomizer(lastHourPrice,lastHourPrice - lastHourPrice * 0.1);
                console.log("~ price", price);


            }

            const newDataEntry: Stock = {
                ticker: ticker,
                timestamp: yesterday + i * 60 * 60,
                price: price,
                socialMediaCount: numberRandomizer(1000, 100000)
            };

            stocks[ticker] = stocks[ticker].concat(newDataEntry);
            console.log("~ stocks[ticker]", stocks[ticker]);
        });
    });
    console.log(stocks)
    // return stocks;
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
        console.log("already exists")
        return tickerGenerator(stocksGeneratedSoFar);
    }

    return generatedTicker;
}
