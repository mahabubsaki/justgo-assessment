import React, { useContext } from 'react';
import { ProjectContext } from '../App';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'
const PaginationButtons = () => {
    const { btnIndex, pageArray, handleButtonChange } = useContext(ProjectContext)
    return (
        <div className='flex justify-end mt-7'>
            <button className='btn btn-secondary mx-2' disabled={btnIndex === 1} onClick={() => handleButtonChange(btnIndex - 1)}><TbPlayerTrackPrev /></button>
            {pageArray.map(btn => <button onClick={() => handleButtonChange(btn)} className={`btn mx-2 ${btnIndex === btn ? 'btn-primary' : 'btn-success'}`}>{btn}</button>)}
            <button className='btn btn-secondary mx-2' disabled={btnIndex === pageArray.length} onClick={() => handleButtonChange(btnIndex + 1)}><TbPlayerTrackNext /></button>

        </div>
    );
};

export default PaginationButtons;