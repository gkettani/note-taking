import { useState } from 'react';

// interface Props {
//   // Props go here
// }

const SearchBar: React.FC/*<Props>*/ = (/*props*/) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Perform search here using the search term
  // };

  return (
    <div className="relative">
      <input
        className="mt-3 pl-11 h-8 rounded-md my-1 w-full focus:border-purple-500 focus:outline-none shadow-sm border border-gray-200"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute m-auto top-2 bottom-0 left-3 h-5 w-5 pointer-events-none" 
        fill="none" viewBox="0 0 24 24" stroke="#999999">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  );
}

export default SearchBar;