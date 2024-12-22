import { Button } from '@/components/ui/button';
import { isPending } from '@reduxjs/toolkit';
import { useNavigate } from '@tanstack/react-router';
import ReactLoading from 'react-loading';

export const ButtonHistory = ({ status, transactionId, onPrint, isPending }) => {
  const navigate = useNavigate();

  if (status === 'SUCCESS') {
    return (
      <Button onClick={() => onPrint(transactionId)} className="bg-green-500 hover:bg-green-700">
        {isPending ? (
          <ReactLoading
            type={'spin'}
            color={'#FFFFFF'}
            height={'15%'}
            width={'15%'}
            className="flex justify-center items-center"
          />
        ) : (
          <p>Cetak Tiket</p>
        )}{' '}
      </Button>
    );
  } else if (status === 'PENDING') {
    return (
      <Button
        onClick={() => {
          navigate({ to: `/payment/${transactionId}` });
        }}
        className="bg-red-500 hover:bg-red-700"
      >
        Lanjut Bayar
      </Button>
    );
  } else if (status === 'FAILED') {
    return null;
  }
};
