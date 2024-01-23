import Card from "../UI/Card/Card.tsx";

interface IBillCard{
  billName:string;
  payer:string;
  date:string;
  amount:number;
  taxPercent:number;
}

export default function BillCard({billName,payer,date,amount,taxPercent}:IBillCard) {
  return (
        <Card title={billName}>
          <div className="flex justify-between px-2 py-1 mb-2 ">
            <p className="text-indigo-400 text-xl">Payer</p>
            <p className="text-gray-400 font-bold"><strong>{payer}</strong></p>
          </div>

          <div className="flex justify-between px-2 py-1 mb-2">
            <p className="text-indigo-400 text-xl">Date</p>
            <p className="text-gray-400 font-bold"><strong>{date}</strong></p>
          </div>
          <div className="flex justify-between px-2 py-1 mb-2">
            <p className="text-indigo-400 text-xl">Tax</p>
            <p className="text-gray-400 font-bold"><strong>{taxPercent}%</strong></p>
          </div>

          <div className="flex justify-between px-2 py-1 mb-2">
            <p className="text-indigo-400 text-xl">Amount</p>
            <p><span className="text-gray-200 font-bold">${amount}</span></p>
          </div>
        </Card>
  );
}
