import mut from './stock-portfolio.js'; // MUT = Module Under Test

test('Testing stock portfolio - existence', () => {
    const stockPortfolio = new mut.StockPortfolio();
    expect(stockPortfolio).toBeInstanceOf(mut.StockPortfolio);
});

test('Testing stock portfolio - empty', () => {
    const stockPortfolio = new mut.StockPortfolio()
    expect(stockPortfolio.getStockDict()).toEqual({});
    expect(stockPortfolio.getStockDict()).not.toEqual(3);
});

test('Testing stock portfolio - numStocks', () => {
    const sp = new mut.StockPortfolio()
    expect(sp.getNumStocks()).toEqual(0);
    sp.purchaseStock("GME",5);
    expect(sp.getNumStocks()).toEqual(1);
    sp.purchaseStock("RBLX",10);
    expect(sp.getNumStocks()).toEqual(2);
});

test('Testing stock portfolio - purchaseStock', () => {
    const sp = new mut.StockPortfolio()
    sp.purchaseStock("GME",5);
    expect(sp.getStockDict()).toEqual({"GME":5});
    sp.purchaseStock("RBLX",10);
    expect(sp.getStockDict()).toEqual({"GME":5, "RBLX":10});
    sp.purchaseStock("RBLX",8);
    expect(sp.getStockDict()).toEqual({"GME":5,"RBLX":18});
    expect(() => sp.purchaseStock("RBLX",-8)).toThrowError("Can't purchase negative stock");

});

test('Testing stock portfolio - sellStock', () => {
    const sp = new mut.StockPortfolio()
    sp.purchaseStock("GME",5);
    sp.purchaseStock("RBLX",10);
    sp.sellStock("RBLX",8);
    expect(sp.getStockDict()).toEqual({"GME":5,"RBLX":2});
    expect(() => sp.sellStock("AAPL",4)).toThrowError("Can't sell stock you don't have!");
    expect(() => sp.sellStock("RBLX",8)).toThrowError("Not enough shares");
    expect(() => sp.sellStock("RBLX",8)).toThrow(mut.ShareSaleException);     
    expect(() => sp.sellStock("RBLX",-8)).toThrowError("Can't sell negative stock");
    expect(() => sp.sellStock("RBLX",8)).toThrowError("Not enough shares");

});

test('Testing stock portfolio - getShares', () => {
    const sp = new mut.StockPortfolio()
    sp.purchaseStock("GME",5);
    sp.purchaseStock("RBLX",10);    
    expect(sp.getShares("GME")).toEqual(5);
    expect(() => sp.getShares("AAPL")).toThrowError("You don't have shares of this stock");
});

test('Testing stock portfolio - purchase/sell- quantity 0 cases', () => {
    const sp = new mut.StockPortfolio()
    sp.purchaseStock("GME",5);
    sp.sellStock("GME",5);
    expect(sp.getStockDict()).toEqual({});
    expect(() => sp.purchaseStock("GME",0)).toThrowError("At least one share required");   
});






