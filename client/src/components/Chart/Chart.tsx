import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';

import { formatDate, parseStringToDate } from '../../helpers/formatDate';
import { CurrencyValue } from '../../store/api/currencyApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Currency values',
    },
  },
};

const getBackgroundColor = (values: { _id: string; amount: string; time: Date }[]) => {
  const backgroundColors = ['rgba(255, 99, 132, 0.5)'];
  for (let i = 1; i < values.length; i++) {
    const currentAmount = parseFloat(values[i].amount);
    const prevAmount = parseFloat(values[i - 1].amount);
    if (currentAmount < prevAmount) {
      backgroundColors.push('rgba(75, 192, 192, 0.5)');
    } else {
      backgroundColors.push('rgba(255, 99, 132, 0.5)');
    }
  }
  return backgroundColors;
};

export const getData = (values: { _id: string; amount: string; time: Date }[]) => ({
  labels: values.map((value) => formatDate(value.time)),
  datasets: [
    {
      label: 'values',
      data: values.map((value) => value.amount),
      backgroundColor: getBackgroundColor(values),
    },
  ],
});

type Props = {
  values: CurrencyValue[];
};

export const Chart: FC<Props> = ({ values }) => {
  const barValues = values
    .map((value) => ({ ...value, time: parseStringToDate(value.time) }))
    .sort((a, b) => a.time.getTime() - b.time.getTime());

  return (
    <div className="h-96 flex justify-center ">
      {barValues.length ? (
        <Bar options={options} data={getData(barValues)} />
      ) : (
        <div className="flex justify-center items-center text-lg font-bold">
          Add values to see stats!
        </div>
      )}
    </div>
  );
};
