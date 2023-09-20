import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import {
  Currency,
  CurrencyValue,
  useDeleteCurrencyValueMutation,
  useEditCurrencyValueMutation,
} from '../../store/api/currencyApi';

const columnHelper = createColumnHelper<CurrencyValue>();

const columns = [
  columnHelper.accessor('amount', {
    header: () => <span>Amount in USD</span>,
    cell: (info) => <div className="flex justify-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor('time', {
    header: () => <span>Time</span>,
    cell: (info) => <div className="flex justify-center">{info.getValue()}</div>,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span>Actions</span>,
    cell: (props) => (
      <div className="w-10 h-10 bg-red">
        <span>actions?</span>
      </div>
    ),
  }),
  // columnHelper.accessor((row) => row.lastName, {
  //   id: 'lastName',
  //   cell: (info) => <i>{info.getValue()}</i>,
  //   header: () => <span>Last Name</span>,
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor('age', {
  //   header: () => 'Age',
  //   cell: (info) => info.renderValue(),
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor('visits', {
  //   header: () => <span>Visits</span>,
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor('status', {
  //   header: 'Status',
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor('progress', {
  //   header: 'Profile Progress',
  //   footer: (info) => info.column.id,
  // }),
];

type Props = {
  currency: Currency;
};

export const Table: React.FC<Props> = ({ currency }) => {
  // const [data, setData] = React.useState(() => [...currency.values]);

  const table = useReactTable({
    data: currency.values,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [editValue] = useEditCurrencyValueMutation();
  const [deleteValue] = useDeleteCurrencyValueMutation();

  return (
    <div className="p-2 w-full">
      <table className="border border-black w-full">
        <thead className="border border-black">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border-b border-black">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot className="border-b border-black">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th className="border border-grey" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div className="h-4" />
    </div>
  );
};
