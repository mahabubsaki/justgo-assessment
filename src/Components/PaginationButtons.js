import React, { useContext } from 'react';
import { ProjectContext } from '../App';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'
const PaginationButtons = () => {
    // extracting data from context
    const { btnIndex, pageArray, handleButtonChange } = useContext(ProjectContext)
    return (
        <div className='flex justify-end mt-7'>
            {/* previous button will be disabled if button index value is default */}
            <button className='btn btn-secondary mx-2' disabled={btnIndex === 1} onClick={() => handleButtonChange(btnIndex - 1)}><TbPlayerTrackPrev /></button>

            {pageArray.map(btn => <button onClick={() => handleButtonChange(btn)} className={`btn mx-2 ${btnIndex === btn ? 'btn-primary' : 'btn-success'}`}>{btn}</button>)}
            {/* next button will be disabled if user reaches last page which we calculated with pagearray state */}
            <button className='btn btn-secondary mx-2' disabled={btnIndex === pageArray.length} onClick={() => handleButtonChange(btnIndex + 1)}><TbPlayerTrackNext /></button>

        </div>
    );
};

export default PaginationButtons;