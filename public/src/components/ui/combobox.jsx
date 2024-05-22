// "use client";

// import React, { useState } from "react";
// import {
//   ArrowUpCircle,
//   CheckCircle2,
//   Circle,
//   HelpCircle,
//   XCircle,
// } from "lucide-react";

// import { cn } from "../../lib/utils";
// import { Button } from "./button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "./command";
// import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// const statuses = [
//   {
//     value: "ucs",
//     label: "UCS",
//     // icon: HelpCircle,
//   },
//   {
//     value: "ucc",
//     label: "UCC",
//     // icon: Circle,
//   },
//   {
//     value: "ume",
//     label: "UME",
//     // icon: Circle,
//   },
//   {
//     value: "uec",
//     label: "UEC",
//     // icon: Circle,
//   },
// ];

// export function ComboboxDemo() {
//   const [open, setOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState(null);

//   return (
//     <div className="flex items-center space-x-4">
//       <p className="text-sm text-muted-foreground">Search By</p>
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             size="sm"
//             className="w-[150px] justify-start"
//           >
//             {selectedStatus ? (
//               <>
//                 {/* <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" /> */}
//                 {selectedStatus.label}
//               </>
//             ) : (
//               <>+Set Search</>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="p-0" side="right" align="start">
//           <Command>
//             <CommandInput placeholder="Change status..." />
//             <CommandList>
//               <CommandEmpty>No results found.</CommandEmpty>
//               <CommandGroup>
//                 {statuses.map((status) => (
//                   <CommandItem
//                     key={status.value}
//                     value={status.value}
//                     onSelect={() => {
//                       setSelectedStatus(
//                         statuses.find(
//                           (priority) => priority.value === status.value
//                         ) || null
//                       );
//                       setOpen(false);
//                     }}
//                   >
//                     {/* <status.icon
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         status.value === selectedStatus?.value
//                           ? "opacity-100"
//                           : "opacity-40"
//                       )}
//                     /> */}
//                     <span>{status.label}</span>
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Command, CommandInput, CommandList, CommandItem } from "./command";

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleChange = (event) => {
    setSelectedBranch(event.target.value);
    setOpen(false);
  };

  const branches = [
    {
      value: "ucs",
      label: "UCS",
    },
    {
      value: "ucc",
      label: "UCC",
    },
    {
      value: "ume",
      label: "UME",
    },
    {
      value: "uec",
      label: "UEC",
    },
  ];

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Search By</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedBranch ? selectedBranch.label : "+ Set Branch"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change Branch..." />
            <CommandList>
              {branches.map((branch) => (
                <CommandItem
                  key={branch.value}
                  onSelect={() => {
                    setSelectedBranch(branch);
                    setOpen(false);
                  }}
                >
                  <label>
                    <input
                      type="radio"
                      name="branch"
                      value={branch.value}
                      checked={
                        selectedBranch && selectedBranch.value === branch.value
                      }
                      onChange={handleChange}
                    />
                    {branch.label}
                  </label>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
