import React, { useContext } from 'react';
import { ProjectContext } from '../App';

const TableRow = ({ user }) => {
    // extracting temporary data to getting the index of each element
    const { currentUsers } = useContext(ProjectContext)
    return (
        <tr>
            <th>{currentUsers.indexOf(user) + 1}</th>
            <td className="flex px-10">
                <img src={user.picture.thumbnail} alt="" className="rounded-full mr-4" />
                <div className="text-center">
                    <b className="text-2xl">{user.name.first},{user.name.last}</b>
                    <p>{user.email}</p>
                </div>
            </td>
            <td className=" px-10">{user.registered.date.split('').slice(0, 10).join('')}</td>
            <td className=" px-10">{user.login.username}</td>
        </tr>
    );
};

export default TableRow;