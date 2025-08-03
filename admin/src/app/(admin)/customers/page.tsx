// "use client";

// import { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Toaster } from "@/components/ui/sonner";
// import { toast } from "sonner";
// import axiosInstance from "@/lib/axiosInstance";

// interface Customer {
//   user_id: string;
//   user_fullname: string;
//   user_email: string;
//   status: boolean;
//   tstamp: string;
// }

// export default function CustomersPage() {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchCustomers = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get("all-user-details/");
//       setCustomers(response.data);
//     } catch {
//       toast.error("An error occurred while fetching customers");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const filteredCustomers = customers.filter(
//     (customer) =>
//       customer.user_fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer.user_email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col gap-4">
//       <Toaster />
//       <div className="flex items-center justify-between">
//         <h1 className="text-xl font-semibold">Customers Management</h1>
//       </div>

//       <div className="flex items-center gap-2">
//         <div className="relative flex-1">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search customers..."
//             className="pl-8"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             disabled={isLoading}
//           />
//         </div>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Status</TableHead>
//               {/* <TableHead>Created At</TableHead> */}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               <TableRow>
//                 <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
//                   Loading...
//                 </TableCell>
//               </TableRow>
//             ) : filteredCustomers.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
//                   No customers found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredCustomers.map((customer) => (
//                 <TableRow key={customer.user_id}>
//                   <TableCell className="font-medium">{customer.user_fullname}</TableCell>
//                   <TableCell>{customer.user_email}</TableCell>
//                   <TableCell>{customer.status ? "Inactive" : "Active"}</TableCell>
//                   {/* <TableCell>{new Date(customer.tstamp).toLocaleDateString()}</TableCell> */}
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Search, Eye, EyeOff, CreditCard } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

interface BankInfo {
  bank_account_number: string;
  ifsc_code: string;
}

interface Customer {
  user_id: string;
  user_fullname: string;
  user_email: string;
  tasker: boolean;
  task_manager: boolean;
  status: boolean;
  verification_status: number;
  bank_info: BankInfo | null;
}

// Import axiosInstance if using separate file, or define it here
// import axiosInstance from "@/lib/axiosInstance";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleBankDetails, setVisibleBankDetails] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string>("");

   const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("all-user-details/");
      setCustomers(response.data);
    } catch {
      toast.error("An error occurred while fetching customers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.user_fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.user_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleBankDetails = (userId: string) => {
    const newVisibleBankDetails = new Set(visibleBankDetails);
    if (newVisibleBankDetails.has(userId)) {
      newVisibleBankDetails.delete(userId);
    } else {
      newVisibleBankDetails.add(userId);
    }
    setVisibleBankDetails(newVisibleBankDetails);
  };

  const getVerificationStatus = (status: number) => {
    const statusConfig: Record<number, { text: string; color: string }> = {
      0: { text: "Pending Verification", color: "bg-yellow-100 text-yellow-800" },
      2: { text: "Pending Bank Verification", color: "bg-orange-100 text-orange-800" },
      3: { text: "Verified", color: "bg-green-100 text-green-800" }
    };
    
    const config = statusConfig[status] || { text: "Unknown", color: "bg-gray-100 text-gray-800" };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const renderBankDetails = (customer: Customer) => {
    const isVisible = visibleBankDetails.has(customer.user_id);
    
    if (!customer.bank_info) {
      return (
        <div className="flex items-center gap-2 text-gray-500">
          <CreditCard className="h-4 w-4" />
          <span className="text-sm">No bank info</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleBankDetails(customer.user_id)}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          title={isVisible ? "Hide bank details" : "Show bank details"}
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4 text-gray-600" />
          ) : (
            <Eye className="h-4 w-4 text-gray-600" />
          )}
        </button>
        
        <div className="flex flex-col gap-1">
          {isVisible ? (
            <>
              <div className="text-sm font-medium text-gray-900">
                A/C: {customer.bank_info.bank_account_number}
              </div>
              <div className="text-xs text-gray-600">
                IFSC: {customer.bank_info.ifsc_code}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">Click to view</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getUserRoles = (customer: Customer) => {
    const roles = [];
    if (customer.tasker) roles.push("Tasker");
    if (customer.task_manager) roles.push("Task Manager");
    return roles.length > 0 ? roles.join(", ") : "Customer";
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Customers Management</h1>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
          Total: {filteredCustomers.length} customers
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search customers by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bank Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      Loading customers...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-red-600">
                      {error}
                    </div>
                    <button 
                      onClick={fetchCustomers}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? "No customers found matching your search" : "No customers found"}
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, index) => (
                  <tr key={customer.user_id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.user_fullname}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {customer.user_email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getUserRoles(customer)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getVerificationStatus(customer.verification_status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap min-w-[200px]">
                      {renderBankDetails(customer)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.status 
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800" 
                          
                      }`}>
                        {customer.status ? "Inactive" : "Active"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}