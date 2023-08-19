import { Container } from '@mui/material';
import Page from '../common/components/Page';
import useSettings from '../common/hooks/useSettings';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGetTopProduct } from './hooks/useGetTopProduct';
import { useState } from 'react';

const defaultOptions = {
  chart: {
    type: 'column',
  },
  title: {
    text: 'Top số sản phẩm có số lượng cao nhất',
  },

  xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif',
      },
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Số lượng sản phẩm',
    },
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    pointFormat: 'Số lượng: <b>{point.y} cái</b>',
  },
  series: [
    {
      name: 'Population',
      colors: [
        '#9b20d9',
        '#9215ac',
        '#861ec9',
        '#7a17e6',
        '#7010f9',
        '#691af3',
        '#6225ed',
        '#5b30e7',
        '#533be1',
        '#4c46db',
        '#4551d5',
        '#3e5ccf',
        '#3667c9',
        '#2f72c3',
        '#277dbd',
        '#1f88b7',
        '#1693b1',
        '#0a9eaa',
        '#03c69b',
        '#00f194',
      ],
      colorByPoint: true,
      groupPadding: 0,
      data: [],
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
  ],
};

const StatisticContainer = () => {
  const { themeStretch } = useSettings();
  const [options, setOptions] = useState(defaultOptions);

  const onSuccess = (data: any) => {
    setOptions((pre) => ({
      ...pre,
      series: { ...pre.series, data: data.map((item: any) => [item?.name, item?.qty]) },
    }));
  };

  useGetTopProduct({ onSuccess });
  return (
    <Page title={'Danh Sách đặt hàng'}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Container>
    </Page>
  );
};

export default StatisticContainer;
