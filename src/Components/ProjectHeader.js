import React from 'react';
import FilterPart from './FilterPart';
import SearchBar from './SearchBar';
import ToggleButton from './ToggleButton';

const ProjectHeader = () => {
    return (
        <div className="bg-[#F7EDDB] rounded-2xl p-4">
            <h2 className="text-2xl">User List</h2>
            <div className="flex md:flex-wrap md:items-center md:flex-row  md:justify-between mt-6 mb-3 flex-col">
                <SearchBar />
                <FilterPart />
                <ToggleButton />
            </div>
        </div>
    );
};

export default ProjectHeader;