import React, { useContext } from 'react';
import { ProjectContext } from '../App';
import CardParent from './CardParent';
import PaginationButtons from './PaginationButtons';
import TableComponent from './TableComponent';

const UserData = () => {
    const { tileView, currentUsers, isSearching } = useContext(ProjectContext)
    return (
        <div className="min-h-[calc(100vh-160px)]">
            {tileView ? <CardParent users={currentUsers}>{!isSearching && <PaginationButtons />}</CardParent> : <TableComponent>{!isSearching && <PaginationButtons />}</TableComponent>}
        </div>
    );
};

export default UserData;