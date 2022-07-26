import React, { useContext } from 'react';
import { ProjectContext } from '../App';
import CardParent from './CardParent';
import PaginationButtons from './PaginationButtons';
import TableComponent from './TableComponent';

const UserData = () => {
    // extracting data from context
    const { tileView, currentUsers, isSearching } = useContext(ProjectContext)
    return (
        // we checking the status of tileview and if it is on we displaying cardparent component and if it is off we displaying table component
        // we sending paginationButtons component as children with conditon where it will be not shown if search status is true
        <div className="min-h-[calc(100vh-160px)]">
            {tileView ? <CardParent users={currentUsers}>{!isSearching && <PaginationButtons />}</CardParent> : <TableComponent>{!isSearching && <PaginationButtons />}</TableComponent>}
        </div>
    );
};

export default UserData;