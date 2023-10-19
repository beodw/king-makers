import { ReactElement } from "react";

type Campaign = {
  id:number,
  name: string,
  startDate:string,
  endDate:string,
  status?:string,
  isActive?:boolean,
  budget:number,
}

type CampaignsValidationObject = {
  success:boolean,
  newCampaignIdSet:Set<number> | null,
}

type ChosenDate = {
  startDate:string | null,
  endDate:string | null
}

declare global {
  interface Window {
    addCampaigns: (newCampaigns:Array<Campaign>) => void;
    AddCampaigns: (newCampaigns:Array<Campaign>) => void;
  }
}

interface DrawerProps {
    children: Array<ReactElement>;
    isVisible: boolean;
    setDrawerIsVisible: Function;
}

export {Campaign, CampaignsValidationObject, ChosenDate, DrawerProps}