import React from 'react'
import InactiveIcon from '../../assets/icons/InactiveIcon.svg'
import ActiveIcon from '../../assets/icons/ActiveIcon.svg'

function TableRow({campaignData}) {
    function formatMoney(amount, decimalPlaces = 2, currencySymbol = '$') {
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

  return (
        <tr class="border-b border-gray-200 dark:border-gray-700">
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-700 hide-scrollbar max-w-[125px] overflow-x-auto">
                {campaignData.name}
            </td>
            <td class="px-6 py-4 hide-scrollbar max-w-[100px] overflow-x-auto">
                <div className='flex items-center'>
                    <img className='w-4 h-4 mr-2' src={`${campaignData.isActive ? ActiveIcon  : InactiveIcon}`} />
                    {campaignData.isActive ? "Active" : "Inactive"}
                </div>
            </td>
            <td class="px-6 py-4 bg-gray-50 dark:bg-gray-700 hide-scrollbar max-w-[100px] overflow-x-auto">
                {campaignData.startDate}
            </td>
            <td class="px-6 py-4 truncate max-w-[100px]">
                {campaignData.endDate}
            </td>
            <td class="px-6 py-4 bg-gray-50 dark:bg-gray-700 hide-scrollbar max-w-[100px] overflow-x-auto">
                {formatMoney(campaignData.budget)}
            </td>
        </tr>
  )
}

export default TableRow
