import React from 'react';

interface CardProps {
    title?: string;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({title, children}) => {
    return (
        <div className="bg-gray-800 rounded shadow-md m-2 hover:shadow-lg w-11/12 md:w-2/3 lg:w-1/2 mx-auto mb-10">
            {title ? <div className="flex p-4 items-center justify-between">
                <h2 className="text-gray-300 text-xl font-bold">{title}</h2>
            </div> : null}
            <div className="flex flex-col p-4 gap-2 text-gray-400">{children}</div>
        </div>
    );
};

export default Card;
