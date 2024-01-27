import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc:number,
  price_def:number,
  ratio:number,
  timestamp:Date,
  upper_bound:number,
  lower_bound:number,
  trigger_alert:number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]):Row {
    const priceABC = serverRespond[0].top_ask.price;
    const priceDEF = serverRespond[1].top_bid.price;
    const ratio = priceABC/priceDEF;
    const upper_bound = 1.05;
    const lower_bound = 0.99;
    let triggerALert: number | undefined;
    if(ratio > upper_bound || ratio < lower_bound){
      triggerALert = ratio;
    }
    return{
      price_abc:priceABC,
      price_def:priceDEF,
      ratio,
      timestamp:serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound:upper_bound,
      lower_bound:lower_bound,
      trigger_alert:triggerALert,
    };
  };
}

