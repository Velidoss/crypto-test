import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { formatDate, parseStringToDate } from '../../helpers/formatDate';
import {
  Currency,
  useDeleteCurrencyValueMutation,
  useEditCurrencyValueMutation,
} from '../../store/api/currencyApi';

type Props = {
  currency: Currency;
};

export const Table: React.FC<Props> = ({ currency }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedAmount, setEditedAmount] = useState<number>(0);
  const [editedTime, setEditedTime] = useState<Date | null>(null);

  const [editValue] = useEditCurrencyValueMutation();
  const [deleteValue] = useDeleteCurrencyValueMutation();

  const handleEditValue = (valueId: string, amount: number, time: Date) => {
    editValue({ id: currency._id, valueId, amount, time: formatDate(time) });
  };

  const handleDeleteValue = (valueId: string) => {
    deleteValue({ id: currency._id, valueId });
  };

  const handleEditClick = (id: string, amount: number, time: string) => {
    setEditingId(id);
    setEditedAmount(amount);
    setEditedTime(parseStringToDate(time));
  };

  const handleSaveClick = (id: string) => {
    if (typeof editedAmount === 'number' && editedTime) {
      handleEditValue(id, editedAmount, editedTime);
      setEditingId(null);
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const renderActions = (id: string, amount: number, time: string) => {
    if (editingId === id) {
      return (
        <div className="space-x-2 flex justify-center">
          <button
            className=" pt-1 pl-3 pr-3 pb-1 rounded-lg btn-save bg-lime-500"
            onClick={() => handleSaveClick(id)}
          >
            Save
          </button>
          <button
            className=" pt-1 pl-3 pr-3 pb-1 rounded-lg btn-cancel bg-black text-white"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      );
    } else {
      return (
        <div className="space-x-2 flex justify-center">
          <button
            className=" pt-1 pl-3 pr-3 pb-1 rounded-lg btn-edit bg-lime bg-orange-300"
            onClick={() => handleEditClick(id, amount, time)}
          >
            Edit
          </button>
          <button
            className=" pt-1 pl-3 pr-3 pb-1 rounded-lg btn-delete bg-red-500"
            onClick={() => handleDeleteValue(id)}
          >
            Delete
          </button>
        </div>
      );
    }
  };

  return (
    <div className="p-2 w-full">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currency.values.length === 0 ? (
            <tr key="empty">
              <td colSpan={3} className="w-full block">
                No content to display
              </td>
            </tr>
          ) : (
            currency.values.map((value) => (
              <tr key={value._id}>
                <td className="px-4 py-2 text-center border">
                  {editingId === value._id ? (
                    <ReactDatePicker
                      selected={editedTime}
                      onChange={(date) => setEditedTime(date)}
                      showTimeSelect
                      dateFormat="dd/MM/yyyy HH:mm"
                      className="w-full bg-gray-100 p-2 rounded-lg"
                    />
                  ) : (
                    value.time
                  )}
                </td>
                <td className="px-4 py-2 text-center border">
                  {editingId === value._id ? (
                    <input
                      type="number"
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(parseInt(e.target.value))}
                      className="w-full bg-gray-100 p-2 rounded-lg"
                    />
                  ) : (
                    value.amount
                  )}
                </td>
                <td className="px-0 py-0">
                  {renderActions(value._id, parseInt(value.amount), value.time)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
