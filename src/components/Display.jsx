import React, { useState } from 'react';

const Display = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Specialty</th>
              <th className="px-4 py-2 border-b">Gender</th>
              <th className="px-4 py-2 border-b">Address Line 1</th>
              <th className="px-4 py-2 border-b">Address Line 2</th>
              <th className="px-4 py-2 border-b">City</th>
              <th className="px-4 py-2 border-b">Postal Code</th>
              <th className="px-4 py-2 border-b">State</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Mobile</th>
              <th className="px-4 py-2 border-b">Phone</th>
            
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2 border-b">{item.Name}</td>
                <td className="px-4 py-2 border-b">{item.Specialty}</td>
                <td className="px-4 py-2 border-b">{item.Gender}</td>
                <td className="px-4 py-2 border-b">{item["Address: Address line 1"]}</td>
                <td className="px-4 py-2 border-b">{item["Address line 2"]}</td>
                <td className="px-4 py-2 border-b">{item.City}</td>
                <td className="px-4 py-2 border-b">{item["Postal Code"]}</td>
                <td className="px-4 py-2 border-b">{item.State}</td>
                <td className="px-4 py-2 border-b">{item.Status}</td>
                <td className="px-4 py-2 border-b">{item['Account: Email']}</td>
                <td className="px-4 py-2 border-b">{item['Account: Mobile']}</td>
                <td className="px-4 py-2 border-b">{item.Phone}</td>
        
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  
      <nav className="mt-4 flex justify-center">
        <ul className="flex items-center">
          {pageNumbers.map((number) => (
            <li key={number} className="mx-1">
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-300'}`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Display;