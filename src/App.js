import './App.css';
import { useEffect, useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker"; 
import TableRow from './components/table/TableRow';
import FilterIcon from './assets/icons/FilterIcon.svg'
import Drawer from './components/drawer/Drawer';
import Footer from './components/layout/Footer'
import NavBar from './components/layout/NavBar'
import { filterCampaigns, newCampaignsIsValid, sampleData } from './utils';


function App() {
  let [campaigns, setCampaigns] = useState(sampleData)
  let [campaignIdSet, setCampaignIdSet] = useState(new Set())
  useEffect(
    () => {
      for(let campaign of campaigns){
        campaignIdSet.add(campaign.id)
      }
      setCampaignIdSet(new Set(campaignIdSet))
    }, []
  )
  const [selectedCampaignStartDate, setSelectedCampaignStartDate] = useState("")
  const [selectedCampaignEndDate, setSelectedCampaignEndDate] = useState("")
  const _addCampaigns = (newCampaigns) => {
    // add new campaigns only if array of values are valid.
    const campaignsValidationObject = newCampaignsIsValid(newCampaigns, campaignIdSet)
    if(campaignsValidationObject.success) {
      setCampaigns([...campaigns, ...newCampaigns])
      setCampaignIdSet(new Set([...campaignIdSet,...campaignsValidationObject.newCampaignIdSet]))
    }
  }
  const [searchValue, setSearchValue] = useState("")
  const [pageStartPointer, setPageStartPointer] = useState(0)
  const pageSize = 10
  const moveToNextTablePage = () => {
    if (pageStartPointer + pageSize < filterdCampaigns.length)
      setPageStartPointer(pageStartPointer + pageSize)
  }
  const moveToPreviousTablePage = () =>{
    if (pageStartPointer - pageSize >= 0) setPageStartPointer(pageStartPointer - pageSize)
  }
  const resetFilters =  () => {
    setSearchValue("")
    setSelectedCampaignEndDate("")
    setSelectedCampaignStartDate("")
    setPageStartPointer(0)
  }
  const updateSelectedCampaignStartDate = (chosenDate) => {
    setSelectedCampaignStartDate(chosenDate.startDate ?? "")
  }
  const updateSelectedCampaignEndDate = (chosenDate) => {
    setSelectedCampaignEndDate(chosenDate.endDate ?? "")
  }
  window.addCampaigns = _addCampaigns
  window.AddCampaigns = _addCampaigns
  const search = (e) => {
    const {value} = e.target;
    setSearchValue(value.toLocaleLowerCase());
    setPageStartPointer(0)
  }
  
  const filterdCampaigns = filterCampaigns(searchValue,pageStartPointer,10,campaigns,selectedCampaignStartDate, selectedCampaignEndDate)
  const startDatePicker = (
     <Datepicker
              displayFormat='MM/DD/YYYY'
              popoverDirection="down" 
              placeholder='Start Date'
              useRange={false}
              asSingle={true}
              maxDate={selectedCampaignEndDate.length == 0 ? new Date("3000-01-01") : new Date(selectedCampaignEndDate) }
              value={{startDate:selectedCampaignStartDate.length == 0 ? null: selectedCampaignStartDate, endDate: selectedCampaignStartDate.length == 0 ? null: selectedCampaignStartDate}} 
              onChange={(chosenDate)=>{updateSelectedCampaignStartDate(chosenDate) }} 
            /> 
  )

  const endDatePicker = (
    <Datepicker
              displayFormat='MM/DD/YYYY'
              popoverDirection="down"
              placeholder='End Date' 
              useRange={false} 
              asSingle={true}
              minDate={selectedCampaignStartDate.length == 0 ? new Date("1900-01-01") : new Date(selectedCampaignStartDate)}
              value={{startDate:selectedCampaignEndDate.length == 0 ? null: selectedCampaignEndDate, endDate: selectedCampaignEndDate.length == 0 ? null: selectedCampaignEndDate}} 
              onChange={(chosenDate)=>{updateSelectedCampaignEndDate(chosenDate) }} 
            />
  )

  const [drawerIsVisible, setDrawerIsVisible] = useState(false);
  return(
    <>
    <Drawer isVisible={drawerIsVisible} setDrawerIsVisible={setDrawerIsVisible}>
            <h1 className='text-white dark:text-black font-bold'>Filter Campaigns</h1>
            {startDatePicker}
            {endDatePicker}

            {
              <div className='h-full flex items-center'>
                <button type='button' className='block bg-blue-700 hover:bg-blue-900 hover:dark:bg-gray-700 hover:dark:text-white dark:bg-gray-800 w-28 h-8 rounded-2xl text-xs text-white dark:text-gray-400' onClick={()=>resetFilters()}>Reset Filters</button>
              </div>
            }
    </Drawer>
    <div className='w-screen h-screen flex flex-col'>
      <NavBar/>
      <div className="py-4 sm:px-2 flex items-center justify-start">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative mt-1 pl-2 sm:px-2 w-full sm:w-1/2 max-w-[350px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="ml-[5px] w-[12px] h-[12px] sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input value={searchValue} onChange={search} type="text" id="table-search" className="block py-2 pl-[30px] sm:pl-10 text-[12px] sm:text-sm text-gray-900 border border-gray-300 rounded-md w-full sm:w-80 bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700" placeholder="Search for campaigns" />
          </div>

          <div className='w-48 mr-2 hidden sm:flex items-end h-full'>
             {startDatePicker}
          </div>


          <div className='w-48 mr-2 hidden sm:flex items-end h-full'>
             {endDatePicker}
          </div>

          <div className='sm:hidden w-1/2 flex justify-end'>
            <button onClick={() => setDrawerIsVisible(!drawerIsVisible)} className='flex'>
              <img className='w-[32px] h-[32px]' src={FilterIcon}/>
            </button>
          </div>
         
          

      </div>
      <div className='mx-2 w-sm md:w-md md:max-w-none overflow-y-scroll overflow-x-scroll hide-scrollbar shadow-md'>
        <div className='grow shadow-md'>
              <table className="w-full text-left text-[10px] sm:text-sm md:text-md 2xl:text-xl  text-gray-500 dark:text-gray-400">
                <thead className="top-0 sticky text-gray-700 uppercase dark:text-gray-400">
                  <tr className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Start Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                          End Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Budget
                      </th>
                  </tr>
                </thead>
                <tbody className=''>
                  { 
                    filterdCampaigns.length > 0 ? filterdCampaigns.map(
                      (campaign, index) =>
                          <TableRow key={index} campaignData={campaign}/>
                    )
                    :    
                    <tr className="border-gray-200 dark:border-gray-700 font-bold text-md">
                      <td colSpan={5} className='px-4 text-center'>
                        No Results!
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
        </div>
      </div>

      <div className="flex flex-col items-end mt-2 px-2 mb-20 md:mb-16">
        
        <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-gray-700">{filterdCampaigns.length == 0 ? 0 : pageStartPointer+1}</span> to <span className="font-semibold text-gray-900 dark:text-gray-700">{pageStartPointer+pageSize < filterdCampaigns.length ? pageStartPointer+pageSize : filterdCampaigns.length}</span> of <span className="font-semibold text-gray-900 dark:text-gray-700">{filterdCampaigns.length}</span> Results
        </span>
        
        <div className="inline-flex mt-2 xs:mt-0">
            <button onClick={moveToPreviousTablePage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-700 rounded-l hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Prev
            </button>
            <button onClick={moveToNextTablePage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-700 border-0 border-l border-white rounded-r hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
            </button>
        </div>
      </div>

      <Footer />
    </div>
    </>
      
  )
}

export default App;
