import './App.css';
import { useState } from 'react';
import TableRow from './components/table/TableRow';

function App() {
  let [campaigns, setCampaigns] = useState(
    [
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
          {"id":1,"name":"Divavu","startDate":"9/19/2017","endDate":"3/9/2018","budget":88377},
      {"id":2,"name":"Jaxspan","startDate":"11/21/2017","endDate":"2/21/2018","budget":608715},
      {"id":3,"name":"Miboo","startDate":"11/1/2017","endDate":"6/20/2017","budget":239507},
      {"id":4,"name":"Trilith","startDate":"8/25/2017","endDate":"11/30/2017","budget":179838},
      {"id":5,"name":"Layo","startDate":"11/28/2017","endDate":"3/10/2018","budget":837850},
      {"id":6,"name":"Photojam","startDate":"7/25/2017","endDate":"6/23/2017","budget":858131},
      {"id":7,"name":"Blogtag","startDate":"6/27/2017","endDate":"1/15/2018","budget":109078},
      {"id":8,"name":"Rhyzio","startDate":"10/13/2017","endDate":"1/25/2018","budget":272552},
      {"id":9,"name":"Zoomcast","startDate":"9/6/2017","endDate":"11/10/2017","budget":301919},
      {"id":10,"name":"Realbridge","startDate":"3/5/2018","endDate":"10/2/2017","budget":505602}
    ]
  )
  const [selectedCampaignStartDate, setSelectedCampaignStartDate] = useState("")
  const [selectedCampaignEndDate, setSelectedCampaignEndDate] = useState("")
  const _addCampaigns = (newCampaigns) => setCampaigns([...campaigns, ...newCampaigns]);
  const [searchValue, setSearchValue] = useState("")
  const resetFilters =  () => {
    setSearchValue("")
    setSelectedCampaignEndDate("")
    setSelectedCampaignStartDate("")
  }
  const updateSelectedCampaignStartDate = (e) => {
    const {value} = e.target
    setSelectedCampaignStartDate(value)
  }
  const updateSelectedCampaignEndDate = (e) => {
    const {value} = e.target
    setSelectedCampaignEndDate(value)
  }
  window.addCampaigns = _addCampaigns
  window.AddCampaigns = _addCampaigns
  const search = (e) => {
    const {value} = e.target;
    setSearchValue(value.toLocaleLowerCase());
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
          if(!createDateObject(campaign.endDate) > new Date(selectedCampaignEndDate)) return campaign
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
    

    return campaigns;
  }
  campaigns = filterCampaigns()
  return(
    <div className='w-screen h-screen flex flex-col'>
      <div className='sticky top-0 z-20 font-bold text-2xl py-4 px-2 flex flex-col justify-center w-full text-black dark:text-gray-500 dark:bg-gray-800 bg-blue-800'>
        <img className='w-24' src='https://www.betking.com/images/Brand-logo/brand-logo.svg'/>
      </div>
      <div class="py-4 sm:px-2 flex items-center">
          <label for="table-search" class="sr-only">Search</label>
          <div class="relative mt-1 px-2">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="ml-[5px] w-[12px] h-[12px] sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input value={searchValue} onChange={search} type="text" id="table-search" class="block py-2 pl-[30px] sm:pl-10 text-[12px] sm:text-sm text-gray-900 border border-gray-300 rounded-md w-full sm:w-80 bg-gray-50 outline-none dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search for campaigns" />
          </div>

          <input className='' value={selectedCampaignStartDate} type='date' onChange={updateSelectedCampaignStartDate}/>
          <input className='' value={selectedCampaignEndDate} type='date' onChange={updateSelectedCampaignEndDate}/>
          <button type='button' className='bg-blue-500 dark:bg-gray-800 w-28 h-8 rounded-2xl text-xs text-white dark:text-gray-400' onClick={()=>resetFilters()}>Reset Filters</button>
      </div>
      <div className='px-2 w-full h-full overflow-y-scroll overflow-x-clip hide-scrollbar shadow-md'>
        <div className='grow shadow-md'>
              <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="top-0 sticky text-xs text-gray-700 uppercase dark:text-gray-400">
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
                    campaigns.length > 0 ? campaigns.map(
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

      <footer className='w-full mt-2 p-4 flex flex-col items-center bg-blue-800 dark:bg-gray-800'>
        <img className='w-24' src='https://www.betking.com/images/footer/brand-logo-red.svg'/>
      </footer>
      
    </div>
      
  )
}

export default App;
