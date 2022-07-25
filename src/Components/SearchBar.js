import React, { useContext } from 'react';
import { ProjectContext } from '../App';

const SearchBar = () => {
    const { searchType, setSearchType, handleSearchUser, inputRef, setCurrentUsers, allUsers, setSlicedUsers, setBtnIndex, setIsSearching } = useContext(ProjectContext)
    return (
        <div class="form-control md:mb-3">
            <div class="input-group flex justify-center">
                <select class="select select-bordered" onChange={(e) => {
                    if (e.target.value) {
                        setSearchType(e.target.value)
                    }
                    else {
                        setIsSearching(false)
                        setBtnIndex(1)
                        setSlicedUsers(allUsers.slice(0, 10))
                        setCurrentUsers(allUsers)
                        inputRef.current.value = ''
                        setSearchType('')
                    }
                }}>
                    <option value="">All</option>
                    <option value="fname">Firstname</option>
                    <option value="lname">Lastname</option>
                    <option value="email">Email</option>
                    <option value="uname">Username</option>
                </select>

                <input ref={inputRef} type="text" placeholder="Search…" class="input input-bordered" disabled={!searchType} />
                <button class="btn btn-square" onClick={handleSearchUser} disabled={!searchType}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;