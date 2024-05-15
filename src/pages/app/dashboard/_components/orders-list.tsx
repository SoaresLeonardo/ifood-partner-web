import { getOrders } from "@/api/get-orders";
import { useQuery } from "@tanstack/react-query";

export const OrdersList = () => {
  const { data } = useQuery({
    queryFn: getOrders,
    queryKey: ["order", "list", "dashboard"],
  });
  console.log(data);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                Order ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                Customer Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                Order Date
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                Order Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                #12345
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                John Doe
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                2023-05-11
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                $99.99
              </td>
             
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                #12346
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                Jane Smith
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                2023-05-10
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                $79.99
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                #12347
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                Bob Johnson
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                2023-05-09
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                $59.99
              </td>
            
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
