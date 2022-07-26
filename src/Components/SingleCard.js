import React, { useContext } from 'react';
import { FaUser } from 'react-icons/fa'
import { BsFillCalendarDateFill } from 'react-icons/bs'
import { ProjectContext } from '../App';
const SingleCard = ({ user }) => {
    // extracting temporary data to getting the index of each element
    const { currentUsers } = useContext(ProjectContext)
    return (
        <div className="rounded-lg shadow-lg flex flex-col p-4 items-center">
            <span className="py-2 px-4 rounded-full bg-[red]">{currentUsers.indexOf(user) + 1}</span>

            <div className="flex items-center">
                <img src={user.picture.thumbnail} alt="" className='rounded-full mr-4' />
                <div className="flex flex-col gap-2">
                    <b className="text-2xl">{user.name.first},{user.name.last}</b>
                    <p>{user.email}</p>
                    <p className="flex gap-2 items-center"><FaUser /> <span>{user.login.username}</span></p>
                    <p className="flex gap-2 items-center"><BsFillCalendarDateFill /> <span>{user.registered.date.split('').slice(0, 10).join('')}</span></p>
                </div>
            </div>
        </div>
    );
};

export default SingleCard; 