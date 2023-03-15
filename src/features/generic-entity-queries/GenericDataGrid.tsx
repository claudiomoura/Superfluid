//Este Componente se podria cambiar de nombre
import { Loader } from '../../Loader';
import { Error } from '../../Error';

import { PagedResult } from '@superfluid-finance/sdk-core';

import { FC, ReactElement } from 'react';
import _ from 'lodash';
import { SerializedError } from '@reduxjs/toolkit';

export interface GenericDataGridProps {
  data?: PagedResult<any>;
  isLoading: boolean;
  error?: SerializedError;
  refetch?: () => void;
}

export const GenericDataGrid: FC<GenericDataGridProps> = ({
  data,
  isLoading,

  error,
  refetch,
}): ReactElement => {
  console.log('Current Flow Rate', data?.data[0].currentFlowRate);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} retry={refetch} />
      ) : (
        <> </>
      )}
      {data && (
        <div style={{ height: 640, width: '80%' }}>
          <>
            {data?.data[0].currentFlowRate
              ? 'Tienes un Flow activado'
              : 'No tienes Flow'}
            <></>
            <div>El flow es de: {data?.data[0].currentFlowRate}</div>
          </>
        </div>
      )}
    </>
  );
};
