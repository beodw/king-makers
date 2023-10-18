import './App.css';
import { useEffect, useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker"; 
import TableRow from './components/table/TableRow';
import FilterIcon from './assets/icons/filterIcon.svg'
import Drawer from './components/drawer/Drawer';


function App() {
  let [campaigns, setCampaigns] = useState(
    [
      {"id":1,"name":"Sample Active","startDate":"9/19/2020","endDate":"3/9/2024","budget":88377},
      {"id":1,"name":"Sample Long Text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu ","startDate":"9/19/2020","endDate":"3/9/2024","budget":88377},
      {"id":1,"name":"Divavu","startDate":"9/19/2020","endDate":"3/9/2022","budget":88377},
      {"id":2,"name":"Jaxspan","startDate":"11/21/2017","endDate":"2/21/2018","budget":608715},
      {"id":3,"name":"Miboo","startDate":"11/1/2017","endDate":"6/20/2017","budget":239507},
      {"id":4,"name":"Trilith","startDate":"8/25/2017","endDate":"11/30/2017","budget":179838},
      {"id":5,"name":"Layo","startDate":"11/28/2017","endDate":"3/10/2018","budget":837850},
      {"id":6,"name":"Photojam","startDate":"7/25/2017","endDate":"6/23/2017","budget":858131},
      {"id":7,"name":"Blogtag","startDate":"6/27/2017","endDate":"1/15/2018","budget":109078},
      {"id":8,"name":"Rhyzio","startDate":"10/13/2017","endDate":"1/25/2018","budget":272552},
      {"id":9,"name":"Zoomcast","startDate":"9/6/2017","endDate":"11/10/2017","budget":301919},
      {"id":10,"name":"Realbridge","startDate":"3/5/2018","endDate":"10/2/2017","budget":505602},
          {"id":1,"name":"Divavu","startDate":"9/19/2017","endDate":"3/9/2018","budget":88377},
      {"id":2,"name":"Jaxspan","startDate":"11/21/2017","endDate":"2/21/2018","budget":608715},
      {"id":3,"name":"Miboo","startDate":"11/1/2017","endDate":"6/20/2017","budget":239507},
      {"id":4,"name":"Trilith","startDate":"8/25/2017","endDate":"11/30/2017","budget":179838},
      {"id":5,"name":"Layo","startDate":"11/28/2017","endDate":"3/10/2018","budget":837850},
      {"id":6,"name":"Photojam","startDate":"7/25/2017","endDate":"6/23/2017","budget":858131},
      {"id":7,"name":"Blogtag","startDate":"6/27/2017","endDate":"1/15/2018","budget":109078},
      {"id":8,"name":"Rhyzio","startDate":"10/13/2017","endDate":"1/25/2018","budget":272552},
      {"id":9,"name":"Zoomcast","startDate":"9/6/2017","endDate":"11/10/2017","budget":301919},
      {"id":10,"name":"Realbridge","startDate":"3/5/2018","endDate":"10/2/2017","budget":505602},
      {"id":11,"name":"Test","startDate":"3/5/2028","endDate":"10/2/2029","budget":505602}
    ]
  )
  const [selectedCampaignStartDate, setSelectedCampaignStartDate] = useState("")
  const [selectedCampaignEndDate, setSelectedCampaignEndDate] = useState("")
  const _addCampaigns = (newCampaigns) => {
    // for(let campaign of newCampaigns){
      // if (new Date(campaign.sartDate))
    // }
    setCampaigns([...campaigns, ...newCampaigns]);
  }
  const [searchValue, setSearchValue] = useState("")
  const [pageStartPointer, setPageStartPointer] = useState(0)
  const moveToNextTablePage = () => {
    if (pageStartPointer + 10 < campaigns.length)
      setPageStartPointer(pageStartPointer+10)
    
  }
  const moveToPreviousTablePage = () =>{
    if (pageStartPointer - 10 >= 0) setPageStartPointer(pageStartPointer-10)
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
  const filterCampaigns =  () => {
    const today = new Date();
    // create date object from string in format month/day/year
    const createDateObject = (dateString) => {
      let [month, day, year] = dateString.split('/');
      return new Date(year, month - 1, day);
    }

    campaigns.forEach(campaign => {
      campaign.isActive = today >= createDateObject(campaign.startDate) && today <= createDateObject(campaign.endDate)
    });

    // Filter campaigns by name
    if(searchValue.length != 0){
      campaigns = campaigns.filter((campaign) => campaign.name.toLocaleLowerCase().includes(searchValue))
    }

    // filter campaigns by selected start and end dates.
    if (selectedCampaignStartDate.length > 0 || selectedCampaignEndDate.length > 0){
      campaigns = campaigns.filter((campaign) => {
        if( selectedCampaignStartDate.length > 0 && !selectedCampaignEndDate.length > 0){
          if (!(createDateObject(campaign.startDate) <= new Date(selectedCampaignStartDate)
           && !(createDateObject(campaign.startDate) >= new Date(selectedCampaignStartDate))
          )) return campaign
        }
        else if( !selectedCampaignStartDate.length > 0 && selectedCampaignEndDate.length > 0){
          if(!createDateObject(campaign.endDate) > new Date(selectedCampaignEndDate)
          && !(createDateObject(campaign.endDate) <= new Date(selectedCampaignEndDate))
          ) return campaign
        }
        else if( selectedCampaignStartDate.length > 0 && selectedCampaignEndDate.length > 0){
          if(
            !(
              (createDateObject(campaign.startDate) < new Date(selectedCampaignStartDate) && 
            createDateObject(campaign.endDate) < new Date(selectedCampaignEndDate))
            ||
            (createDateObject(campaign.startDate) > new Date (selectedCampaignStartDate) && 
            createDateObject(campaign.endDate) > new Date(selectedCampaignEndDate))
            ) 
          ){
            return campaign;
          }
        }

      })
    }
    

    return campaigns.slice(pageStartPointer, pageStartPointer+10);
  }
  const filterdCampaigns = filterCampaigns()
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
      <div className='sticky top-0 z-10 font-bold text-2xl py-4 px-2 flex flex-col justify-center w-full text-black dark:text-gray-500 dark:bg-gray-800 bg-blue-800'>
        <img onClick={()=>window.location.reload()} className='w-24 2xl:w-48 hover:cursor-pointer' src='https://www.betking.com/images/Brand-logo/brand-logo.svg'/>
      </div>
      <div class="py-4 sm:px-2 flex items-center justify-start">
          <label htmlFor="table-search" class="sr-only">Search</label>
          <div class="relative mt-1 pl-2 sm:px-2 w-full sm:w-1/2 max-w-[350px]">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="ml-[5px] w-[12px] h-[12px] sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input value={searchValue} onChange={search} type="text" id="table-search" class="block py-2 pl-[30px] sm:pl-10 text-[12px] sm:text-sm text-gray-900 border border-gray-300 rounded-md w-full sm:w-80 bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700" placeholder="Search for campaigns" />
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
              <table class="w-full text-left text-[10px] sm:text-sm md:text-md 2xl:text-xl  text-gray-500 dark:text-gray-400">
                <thead class="top-0 sticky text-gray-700 uppercase dark:text-gray-400">
                  <tr class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                      <th scope="col" class="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Start Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                          End Date
                      </th>
                      <th scope="col" class="px-6 py-3">
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
                    <tr class="border-gray-200 dark:border-gray-700 font-bold text-md">
                      <td colSpan={5} className='px-4 text-center'>
                        No Results!
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
        </div>
      </div>

      <div class="flex flex-col items-end mt-2 px-2 mb-20 md:mb-16">
        
        <span class="text-sm text-gray-700 dark:text-gray-400">
            Showing <span class="font-semibold text-gray-900 dark:text-gray-700">{filterdCampaigns.length == 0 ? 0 : pageStartPointer+1}</span> to <span class="font-semibold text-gray-900 dark:text-gray-700">{pageStartPointer+10 < campaigns.length ? pageStartPointer+10 : campaigns.length}</span> of <span class="font-semibold text-gray-900 dark:text-gray-700">{campaigns.length}</span> Results
        </span>
        
        <div class="inline-flex mt-2 xs:mt-0">
            <button onClick={moveToPreviousTablePage} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-700 rounded-l hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Prev
            </button>
            <button onClick={moveToNextTablePage} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-700 border-0 border-l border-white rounded-r hover:bg-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
            </button>
        </div>
      </div>

      <footer className='w-full mt-2 p-4 2xl:py-8 absolute bottom-0 flex flex-col items-center bg-blue-800 dark:bg-gray-800'>
        <img className='w-24 2xl:w-48' src='https://www.betking.com/images/footer/brand-logo-red.svg'/>
      </footer>
      
    </div>
    </>
      
  )
}

export default App;
