import { FC, PropsWithChildren, ReactElement, useState } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { InitializeSuperfluidSdk } from './InitializeSuperfluidSdk';
import { Framework } from '@superfluid-finance/sdk-core';
import { Loader } from './Loader';
import { SignerContext } from './SignerContext';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Streams } from './features/generic-entity-queries/Stream';

import { ethers, Signer } from 'ethers';
import { chains } from './wagmiAndRainbowKit';

function App() {
  const [superfluidSdk, setSuperfluidSdk] = useState<Framework | undefined>();
  const [signerAddress, setSignerAddress] = useState<string | undefined>();
  const [signer, setSigner] = useState<Signer>();
  const [chainId, setChainId] = useState<number | undefined>();

  const onSuperfluidSdkInitialized = async (
    superfluidSdk: Framework,
    provider: ethers.providers.Provider,
    signer: Signer
  ) => {
    setSuperfluidSdk(superfluidSdk);
    setSigner(signer);

    signer.getAddress().then((address) => setSignerAddress(address));
    provider.getNetwork().then((network) => setChainId(network.chainId));
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ my: 4 }}>
        <Typography>
          <p>BlockChain Disponibles (nombre, chainId):</p>
          <ul>
            {chains.map((chain) => (
              <li>
                {chain.name}: {chain.id}
              </li>
            ))}
          </ul>
        </Typography>
        <InitializeSuperfluidSdk
          onSuperfluidSdkInitialized={(sdk, provider, signer) =>
            onSuperfluidSdkInitialized(sdk, provider, signer)
          }
        />
        {!!superfluidSdk && (!chainId || !signerAddress || !signer) && (
          <Loader />
        )}
        {!!chainId && !!signerAddress && !!signer && (
          <SignerContext.Provider value={[chainId, signerAddress, signer]}>
            <Box maxWidth='sm'>
              <Typography sx={{ mb: 4 }}>
                Ya estas conectado. Estas en la red [{chainId}] e tu cartera es
                [{signerAddress}].
              </Typography>
            </Box>

            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
              }}
              component='nav'
              aria-labelledby='nested-list-subheader'
              subheader={
                <ListSubheader component='div' id='nested-list-subheader'>
                  Queries a Superfluid
                </ListSubheader>
              }
            >
              <Box title='Stream'>
                <Streams />
              </Box>
            </List>
          </SignerContext.Provider>
        )}
      </Box>
    </Container>
  );
}

export const SdkListItem: FC<PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}): ReactElement => {
  const [isOpen, setIsListEventsOpen] = useState(false);

  return (
    <Box mb={1}>
      <Paper variant='outlined'>
        <ListItemButton onClick={() => setIsListEventsOpen(!isOpen)}>
          <ListItemIcon>
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
        <Collapse in={isOpen} timeout='auto' unmountOnExit>
          <Box p={2}>{children}</Box>
        </Collapse>
      </Paper>
    </Box>
  );
};

export default App;
