
class ShareSaleException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ShareSaleException';
    }
}


class StockPortfolio{
    constructor(){
        this.dict = {};
    }

    purchaseStock(symbol,num){
        if (num<0){
            throw new Error("Can't purchase negative stock")
        }else if(num==0){
            throw new Error("At least one share required")
        }
        if (symbol in this.dict){
            this.dict[symbol] = this.dict[symbol] + num;
        }else{
            this.dict[symbol] = num;
        }
    }

    sellStock(symbol,num){
        if (num<0){
            throw new Error("Can't sell negative stock")
        }
        if (!(symbol in this.dict)){
            throw new Error("Can't sell stock you don't have!")
             
        }else{
             /*checks for negative values */ 
            const updateVal = this.dict[symbol] - num;
            if (updateVal > 0){
                this.dict[symbol] = this.dict[symbol] - num;
            }else if(updateVal == 0){
                delete this.dict[symbol]   
            }else{
                throw new ShareSaleException("Not enough shares");
            }
        }
    }

    //the entire dictionary
    getStockDict(){
        return this.dict;
    }

    //total number of stocks
    getNumStocks(){
        return Object.entries(this.dict).length;
    }

    //gets the number of shares based on symbol
    getShares(symbol){
        if (!(symbol in this.dict)){
            throw new Error("You don't have shares of this stock")
        }else{
            return this.dict[symbol]
        }    
    }

}

export default { StockPortfolio, ShareSaleException };
