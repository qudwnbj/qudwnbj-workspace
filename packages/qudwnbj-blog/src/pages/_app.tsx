import {
  createDOMRenderer,
  FluentProvider,
  GriffelRenderer,
  RendererProvider,
  SSRProvider as NoChildrenTypeSSRProvider,
  webLightTheme,
} from '@fluentui/react-components';
import { AppProps } from 'next/app';
import { FC, PropsWithChildren } from 'react';

// Type Definition
type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };
const SSRProvider = NoChildrenTypeSSRProvider as FC<PropsWithChildren>;

const App = ({ Component, pageProps, renderer }: EnhancedAppProps) => (
  <RendererProvider renderer={renderer || createDOMRenderer()}>
    <SSRProvider>
      <FluentProvider theme={webLightTheme}>
        <Component {...pageProps} />
      </FluentProvider>
    </SSRProvider>
  </RendererProvider>
);

export default App;
