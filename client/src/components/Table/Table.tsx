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
        <div className="space-x-2">
          <button className="btn-save" onClick={() => handleSaveClick(id)}>
            Save
          </button>
          <button className="btn-cancel" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      );
    } else {
      return (
        <div className="space-x-2">
          <button className="btn-edit" onClick={() => handleEditClick(id, amount, time)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => handleDeleteValue(id)}>
            Delete
          </button>
        </div>
      );
    }
  };

  return (
    <div className="p-2 w-full">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currency.values.map((value) => (
            <tr key={value._id}>
              <td className="px-4 py-2">
                {editingId === value._id ? (
                  <ReactDatePicker
                    selected={editedTime}
                    onChange={(date) => setEditedTime(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    className="w-full"
                  />
                ) : (
                  value.time
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === value._id ? (
                  <input
                    type="number"
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(parseInt(e.target.value))}
                    className="w-full"
                  />
                ) : (
                  value.amount
                )}
              </td>
              <td className="px-4 py-2">
                {renderActions(value._id, parseInt(value.amount), value.time)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
