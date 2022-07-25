import React, { useContext } from 'react';
import { ProjectContext } from '../App';
import SingleCard from './SingleCard';

const CardParent = ({ children }) => {
    const { slicedUsers } = useContext(ProjectContext)
    return (
        <div className="flex flex-col justify-between p-2 border my-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {slicedUsers.map((user, index) => <SingleCard user={user} key={index} />)}
            </div>
            {children && <div>
                {children}
            </div>}
        </div>
    );
};

export default CardParent;