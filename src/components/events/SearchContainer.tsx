// 'use client';

// import { useState } from 'react';

// export default function SearchContainer() {
//   const [destination, setDestination] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   return (
//     <div className="rounded-2xl border border-neutral-300 bg-white shadow-sm">
//       <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3">
//         <label className="flex flex-1 flex-col">
//           <span className="text-sm text-neutral-500">Destination</span>
//           <input
//             type="text"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             placeholder="Current location"
//             className="bg-transparent text-lg outline-none placeholder:text-neutral-700"
//           />
//         </label>
//       </div>

//       <div className="grid grid-cols-2 divide-x divide-neutral-200">
//         <div className="flex items-center gap-3 px-4 py-3">
//           <label className="flex flex-1 flex-col">
//             <span className="text-sm text-neutral-500">Dates</span>
//             <div className="flex gap-1 text-base">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="bg-transparent outline-none"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="bg-transparent outline-none"
//               />
//             </div>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }
