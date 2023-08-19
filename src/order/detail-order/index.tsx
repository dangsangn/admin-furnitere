import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../common/utils/axios';

type Props = {};

const DetailOrder = (props: Props) => {
  const [detail, setDetail] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await axiosInstance.get(`/order/detail/${id}`);
        setDetail(data?.data);
      } catch (error) {}
    })();
  }, [id]);

  return <div>{JSON.stringify(detail)}</div>;
};

export default DetailOrder;
