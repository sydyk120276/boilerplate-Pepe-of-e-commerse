import React from 'react'

import TableRow from './tab-row'

const Table = ({ data }) => {
  return (
    <table className="container bg-gray-200 h-2/4 rounded shadow-2xl flex sm:flex-row md:flex-col sm:overflow-auto mobile:overflow-auto mobile2:overflow-auto galaxy_fold:overflow-auto">
      <thead className="flex sm:flex-row md:flex-col">
        <tr className="flex flex-col sm:flex-col md:flex-row sm:h-screen md:h-full sm:p-2 md:p-0">
          <th className="flex basis-1/6 md:justify-center">№</th>
          <th className="flex basis-1/6 md:justify-center">Title</th>
          <th className="flex basis-1/6 md:justify-center">Image</th>
          <th className="flex basis-1/6 md:justify-center">Price</th>
          <th className="flex basis-1/6 md:justify-center">Amount</th>
          <th className="flex basis-1/6 md:justify-center">Total</th>
          <th className="flex basis-1/6 md:justify-center">Currency</th>
          <th className="flex basis-1/6 md:justify-center">Remove</th>
        </tr>
      </thead>
      <tbody className="flex sm:flex-row md:flex-col">
        {data.map((id, index) => (
          <TableRow key={id} id={id} n={index + 1} />
        ))}
      </tbody>
    </table>
  )
}

export default Table
