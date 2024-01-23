import {Item, Person, personItemSummary} from "../../context/types.ts";
import React from "react";

interface IBillSummary {
    billParticipants: Person[];
    billItems: Item[];
    calculateTotalSharePerPerson: (items: Item[], people: Person[]) => Map<string, number>;
    getPersonNameById: (personId: string, people: Person[]) => string;
    allParticipantsSummaries: Record<string, personItemSummary[]>;

}

const BillSummary: React.FC<IBillSummary> = ({
                                                 billParticipants,
                                                 billItems,
                                                 getPersonNameById,
                                                 calculateTotalSharePerPerson,allParticipantsSummaries
                                             }) => {
    const totalSharePerPerson = calculateTotalSharePerPerson(billItems, billParticipants);

    // Generate a summary list, associating each total share with the person's full name
    const summaryList = Array.from(totalSharePerPerson).map(([personId, totalShare]) => ({
        name: getPersonNameById(personId, billParticipants),
        totalShare
    }));
    console.log(allParticipantsSummaries)
    return (
        <div className="container mx-auto flex justify-end mb-10 flex-col w-11/12 md:w-2/3 lg:w-1/2">
            <p className="text-gray-300 uppercase font-bold mb-4">Summary</p>
            <div className="p-2 mb-4 bg-gray-800 rounded">
                <div className="p-4">
                    <ul className="w-full list-none">
                        {summaryList.map(({name, totalShare}) => (
                            <li key={name} className="flex justify-between font-semibold text-gray-300">
                                <div>
                                    <span>{name}</span>
                                </div>
                                <div>
                                    <span>{totalShare.toFixed(2)}</span>
                                </div>
                            </li>

                        ))}

                    </ul>
                </div>
            </div>
        </div>

    )
        ;
}

export default BillSummary;