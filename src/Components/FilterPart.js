import React, { useContext } from 'react';
import { ProjectContext } from '../App';

const FilterPart = () => {
    const { filterOption, setFilterOption } = useContext(ProjectContext)
    return (
        <div className="flex items-center gap-5 justify-center md:mx-[14px] my-[14px] md:my-0">
            <p>Filter by:</p>
            <label class="label cursor-pointer">
                <span class="label-text mr-3">All</span>
                <input type="radio" value="all" checked={filterOption === 'all'} class="radio checked:bg-black" onChange={(e) => setFilterOption(e.target.value)} />
            </label>
            <label class="label cursor-pointer">
                <span class="label-text mr-3">Male</span>
                <input type="radio" value="male" checked={filterOption === 'male'} class="radio checked:bg-black" onChange={(e) => setFilterOption(e.target.value)} />
            </label>
            <label class="label cursor-pointer">
                <span class="label-text mr-3">Female</span>
                <input type="radio" value="female" checked={filterOption === 'female'} class="radio checked:bg-black" onChange={(e) => setFilterOption(e.target.value)} />
            </label>
        </div>
    );
};

export default FilterPart;