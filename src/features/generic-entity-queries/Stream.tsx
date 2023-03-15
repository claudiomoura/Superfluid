import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

import { SignerContext } from '../../SignerContext';
import { sfSubgraph } from '../../redux/store';

import { GenericDataGrid } from './GenericDataGrid';

export const Streams: FC = (): ReactElement => {
  const [chainId, signerAddress] = useContext(SignerContext);
  const [page, setPage] = useState<number>(1);

  const [queryChainId, setQueryChainId] = useState<number>(chainId);

  useEffect(() => {
    setPage(1);
  }, [queryChainId]);

  //Aqui hay que cambiar la cartera de la plataforma que va a recibir el stream
  const plataforma = '0x80a89d8a80414b3673ca66f1b8e793d380b5bd05';

  const queryResult = sfSubgraph.useStreamsQuery({
    chainId: queryChainId,

    filter: {
      //Aqui hay que cambiar el orden platafroma va a ser el reeiver y signerAddress el sender
      sender: plataforma,
      receiver: signerAddress,
      currentFlowRate_gt: '0',
    },
  });

  return (
    <>
      <div>Red id: {queryChainId}</div>
      <GenericDataGrid {...queryResult} />
    </>
  );
};
