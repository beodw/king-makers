import React from 'react'

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
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-700">
                {campaignData.name}
            </td>
            <td class="px-6 py-4">
                {campaignData.isActive ? "Active" : "Inactive"}
            </td>
            <td class="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                {campaignData.startDate}
            </td>
            <td class="px-6 py-4">
                {campaignData.endDate}
            </td>
            <td class="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                {formatMoney(campaignData.budget)}
            </td>
        </tr>
  )
}

export default TableRow
