import React from 'react'
import InactiveIcon from '../../assets/icons/InactiveIcon.svg'
import ActiveIcon from '../../assets/icons/ActiveIcon.svg'
import { formatMoney } from '../../utils'
function TableRow({campaignData}) { 
  return (
        <tr className="border-b border-gray-200 dark:border-gray-700">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-700 hide-scrollbar max-w-[125px] overflow-x-auto">
                {campaignData.name}
            </td>
            <td className="px-6 py-4 hide-scrollbar max-w-[100px] overflow-x-auto">
                <div className='flex items-center'>
                    <img className='w-4 h-4 mr-2' src={`${campaignData.isActive ? ActiveIcon  : InactiveIcon}`} />
                    {campaignData.isActive ? "Active" : "Inactive"}
                </div>
            </td>
            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-700 hide-scrollbar max-w-[100px] overflow-x-auto">
                {campaignData.startDate}
            </td>
            <td className="px-6 py-4 truncate max-w-[100px]">
                {campaignData.endDate}
            </td>
            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-700 hide-scrollbar max-w-[100px] overflow-x-auto">
                {formatMoney(campaignData.budget)}
            </td>
        </tr>
  )
}

export default TableRow
