import { createDOMRenderer, renderToStyleElements } from '@fluentui/react-components';
import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const renderer = createDOMRenderer();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          const enhancedProps = {
            ...props,
            renderer,
          };

          return <App {...enhancedProps} />;
        },
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [initialProps.styles, renderToStyleElements(renderer)],
    };
  }

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
