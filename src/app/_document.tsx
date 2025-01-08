import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        {/* Link para o favicon */}
        <link rel="icon" href="/logo.jpg" />
        {/* Outras configurações de cabeçalho que você deseja */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
