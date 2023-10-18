const newCampaignsIsValid = (newCampaigns, campaignIdSet) => {
  let newCampaignIdSet = new Set()
  for(let campaign of newCampaigns){
      const {id, name, startDate, endDate, budget} = campaign
      if(typeof startDate != "string"){
        console.table([{error: `Invalid campaign ${name}`, message:"Start date must be at string e.g. 1/1/2023"}])
        return {success:false, newCampaignIdSet:null}
      }
      if(startDate.length < 8){
        console.table([{error: `Invalid campaign ${name}`, message:"Start date must be at least 8 characters long e.g. 1/1/2023"}])
        return {success:false, newCampaignIdSet:null}
      }
      if(typeof endDate != "string"){
        console.table([{error: `Invalid campaign ${name}`, message:"End date must be a string e.g. 1/1/2023"}])
        return {success:false, newCampaignIdSet:null}
      }
      if(endDate.length < 8){
        console.table([{error: `Invalid campaign ${name}`, message:"End date must be at least 8 characters long e.g. 1/1/2023"}])
        return {success:false, newCampaignIdSet:null}
      }
      // if (new Date(startDate) > new Date(endDate)){
      //   console.table([{error:`Invalid campaign ${name}`, message:"Start date must be come before end date"}])
      //   return
      // }
      if(typeof budget != 'number'){
        console.table([{error: `Invalid campaign ${name}`, message:"Budget must be a number"}])
        return {success:false, newCampaignIdSet:null}
      }
      if(typeof id != 'number'){
        console.table([{error: `Invalid campaign ${name}`, message:"Id must be a number"}])
        return {success:false, newCampaignIdSet:null}
      }
      // Check for duplicate id in new campaigns and also against old campaigns
      console.log(id, newCampaignIdSet,campaignIdSet)
      if(newCampaignIdSet.has(id) || campaignIdSet.has(id)){
        console.table([{error:`Duplicate campaign '${name}'`, message:`One or more campaigns already have this campaigns id ${id}`}])
        return {success:false, newCampaignIdSet:null}
      }
      newCampaignIdSet.add(id)
      return {success:true, newCampaignIdSet}
    }
}
const formatMoney = (amount, decimalPlaces = 2, currencySymbol = '$') => {
    // Ensure the input is a valid number
    if (isNaN(amount)) {
        throw new Error('Invalid input: amount must be a valid number.');
    }

    // Format the number with the specified decimal places
    const formattedAmount = amount.toFixed(decimalPlaces);

    // Add thousand separators (comma) to the formatted amount
    const parts = formattedAmount.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Concatenate the parts and add the currency symbol
    const result = currencySymbol + parts.join('.');

    return result;
}

const filterCampaigns =  (searchValue, pageStartPointer, pageSize = 10,campaigns,selectedCampaignStartDate, selectedCampaignEndDate) => {
    const today = new Date();
    // create date object from string in format month/day/year
    const createDateObject = (dateString) => {
      let [month, day, year] = dateString.split('/');
      return new Date(year, month - 1, day);
    }

    campaigns.forEach(campaign => {
      campaign.isActive = today >= createDateObject(campaign.startDate) && today <= createDateObject(campaign.endDate)
    });
   // Remove campiagns with end date before start
    campaigns = campaigns.filter((campaign)=>{
      if(!(createDateObject(campaign.startDate) > createDateObject(campaign.endDate))) return campaign
    })

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
    

    return campaigns.slice(pageStartPointer, pageStartPointer+pageSize);
  }

const sampleData = [
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
]

export {filterCampaigns, formatMoney, newCampaignsIsValid, sampleData}