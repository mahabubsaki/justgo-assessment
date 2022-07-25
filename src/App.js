import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import ProjectHeader from './Components/ProjectHeader';
import toast, { Toaster } from 'react-hot-toast';
import UserData from './Components/UserData';
import axios from 'axios';
export const ProjectContext = createContext()

function App() {
  const inputRef = useRef()

  const [allUsers, setAllUsers] = useState([])
  const [currentUsers, setCurrentUsers] = useState([])
  const [slicedUsers, setSlicedUsers] = useState([])
  const [filterOption, setFilterOption] = useState('all')
  const [tileView, setTileView] = useState(false)
  const [searchType, setSearchType] = useState('')
  const [pageArray, setPageArray] = useState([])
  const [btnIndex, setBtnIndex] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('https://randomuser.me/api/?results=50')
      setAllUsers(data.results)
      setCurrentUsers(data.results)
      setSlicedUsers(data.results.slice(0, 10))
    }
    fetchData()
  }, [])
  useEffect(() => {
    const initialArr = []
    for (let i = 1; i <= Math.ceil(currentUsers.length / 10); i++) {
      initialArr.push(i)
    }
    setPageArray(initialArr)
    if (currentUsers.length < 10) {
      setSlicedUsers(currentUsers.slice(0, currentUsers.length))
    }
    else {
      setSlicedUsers(currentUsers.slice(0, 10))
    }
    setBtnIndex(1)
  }, [currentUsers])
  const handleSearchUser = () => {
    setIsSearching(true)
    const userInput = inputRef.current.value
    if (!userInput) {
      toast.error('Please fill the input field before searcging')
      return
    }
    let searchedUser
    if (searchType === 'fname') {
      searchedUser = allUsers.find(user => user.name.first.toUpperCase() === userInput.toUpperCase())
    }
    else if (searchType === 'lname') {
      searchedUser = allUsers.find(user => user.name.last.toUpperCase() === userInput.toUpperCase())
    }
    else if (searchType === 'email') {
      searchedUser = allUsers.find(user => user.email.toUpperCase() === userInput.toUpperCase())
    }
    else {
      searchedUser = allUsers.find(user => user.login.username.toUpperCase() === userInput.toUpperCase())
    }
    inputRef.current.value = ''
    if (searchedUser) {
      setBtnIndex(1)
      setCurrentUsers([searchedUser])
      setSlicedUsers([searchedUser])
    }
    else {
      setFilterOption('all')
      toast.error('No user found with given keyword and category')
      setCurrentUsers([])
      setSlicedUsers([])
    }
  }
  const handleButtonChange = (index) => {
    const starting = (index - 1) * 10
    let ending = starting + 10
    if (ending > currentUsers.length) {
      ending = currentUsers.length
    }

    setSlicedUsers(currentUsers.slice(starting, ending))
    setBtnIndex(index)
  }
  useEffect(() => {
    setIsSearching(false)
    if (filterOption === 'all') {
      setCurrentUsers(allUsers)
      setBtnIndex(1)
    }
    else if (filterOption === 'male') {
      setCurrentUsers(allUsers.filter(user => user.gender === 'male'))

    }
    else {
      setCurrentUsers(allUsers.filter(user => user.gender === 'female'))
    }
  }, [filterOption, allUsers])
  return (
    <ProjectContext.Provider value={{ allUsers, currentUsers, setCurrentUsers, filterOption, setFilterOption, tileView, setTileView, searchType, setSearchType, inputRef, handleSearchUser, btnIndex, setBtnIndex, pageArray, handleButtonChange, slicedUsers, setSlicedUsers, isSearching, setIsSearching }}>
      <div className="App">
        <Toaster />
        <ProjectHeader />
        <UserData />
      </div>
    </ProjectContext.Provider>
  );
}

export default App;
