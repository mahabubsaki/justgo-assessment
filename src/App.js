import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import ProjectHeader from './Components/ProjectHeader';
import toast, { Toaster } from 'react-hot-toast';
import UserData from './Components/UserData';
import axios from 'axios';
export const ProjectContext = createContext()

function App() {
  // search input reference
  const inputRef = useRef()

  // storing all data,temporary data and visible data,, currentusers is temporary and slicedusers are visible data
  const [allUsers, setAllUsers] = useState([])
  const [currentUsers, setCurrentUsers] = useState([])
  const [slicedUsers, setSlicedUsers] = useState([])
  // defalut value of filter
  const [filterOption, setFilterOption] = useState('all')
  // defalut tileview wiill not be shown
  const [tileView, setTileView] = useState(false)
  // defalut search type will be empty
  const [searchType, setSearchType] = useState('')
  // this array will create when the temporary data change
  const [pageArray, setPageArray] = useState([])
  // defalut first button will be active
  const [btnIndex, setBtnIndex] = useState(1)
  // storing the current search data
  const [isSearching, setIsSearching] = useState(false)
  // on first page load this effect will fetch 50 data, all users will save on alldata and temporary data. first 10 data will save on visible data
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('https://randomuser.me/api/?results=50')
      setAllUsers(data.results)
      setCurrentUsers(data.results)
      setSlicedUsers(data.results.slice(0, 10))
    }
    fetchData()
  }, [])

  // this effect will track temporary data and will create an array which will save a record of how many pagination button will create
  useEffect(() => {
    const initialArr = []
    for (let i = 1; i <= Math.ceil(currentUsers.length / 10); i++) {
      initialArr.push(i)
    }
    setPageArray(initialArr)
    // checking if temporary data is less than 10 or not
    if (currentUsers.length < 10) {
      setSlicedUsers(currentUsers.slice(0, currentUsers.length))
    }
    else {
      setSlicedUsers(currentUsers.slice(0, 10))
    }
    // setting default button number
    setBtnIndex(1)
  }, [currentUsers])

  // this effect will keep track the 3 filteroptions, if filter preference changes temporary data will also change
  useEffect(() => {
    // changing search status if it is already activated
    setIsSearching(false)
    if (filterOption === 'all') {
      // if all selected on filter alldata will set on temporary data
      setCurrentUsers(allUsers)
      // defualt button number
      setBtnIndex(1)
    }
    else if (filterOption === 'male') {
      setCurrentUsers(allUsers.filter(user => user.gender === 'male'))

    }
    else {
      setCurrentUsers(allUsers.filter(user => user.gender === 'female'))
    }
  }, [filterOption, allUsers])

  const handleSearchUser = () => {
    // changing status into true as user want to search
    setIsSearching(true)
    // taking the input by reference and triming
    const userInput = inputRef.current.value.trim()
    // if input is empty, giving a warning and returning form the function
    if (!userInput) {
      toast.error('Please fill the input field before searcging')
      return
    }
    // searchedUser varible will be a single user data which will be found by find method on alldata. This find method will depend on search type
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
    // clearing input value
    inputRef.current.value = ''
    // if searchedUser is found setting into visible and temporary data 
    if (searchedUser) {
      // default button index
      setBtnIndex(1)
      setCurrentUsers([searchedUser])
      setSlicedUsers([searchedUser])
    }
    else {
      // if searched user is undefined showing a warning to user and changing search status to false
      setIsSearching(false)
      toast.error('No user found with given keyword and category')
    }
  }

  // when user change the page button index will be change acording to this calculation
  const handleButtonChange = (index) => {
    const starting = (index - 1) * 10
    let ending = starting + 10
    // if ending is greater than the length of temporary data than setting the range to the last element of temporary data
    if (ending > currentUsers.length) {
      ending = currentUsers.length
    }

    setSlicedUsers(currentUsers.slice(starting, ending))
    setBtnIndex(index)
  }

  return (
    // giving all the states and dispatches on context provider value
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
