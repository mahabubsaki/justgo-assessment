import React, { useContext } from 'react';
import { ProjectContext } from '../App';
import TableRow from './TableRow';

const TableComponent = ({ children }) => {
    // extracting visible data and mapping it
    const { slicedUsers } = useContext(ProjectContext)
    return (
        <div className="border rounded-t-[10px] border-[#999393] w-[95%] mx-auto">
            <div class="overflow-x-auto">
                <table class="table w-full bg-[#dfdddd] rounded-t-[10px] ">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Registration Date</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slicedUsers.map((user, index) => <TableRow user={user} key={index} />)}
                    </tbody>
                </table>
            </div>
            {children && <div>
                {children}
            </div>}
        </div>
    );
};

export default TableComponent;