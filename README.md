# Site de bio de Daniel Martins

## Abrir no navegador

Abra a pasta do projeto e dê dois cliques em `index.html`. Para ver suas alterações, salve o arquivo editado e atualize o navegador.

## Adicionar as imagens

1. Copie a foto para a pasta `assets/images`.
2. Abra `js/config.js` e encontre a seção `images`.
3. Dentro das aspas ao lado de `profile`, escreva `assets/images/` seguido do nome exato da foto. Inclua a extensão do arquivo, como `.jpg` ou `.png`.
4. Salve e atualize a página. O círculo da foto mede 124 px. O site já inclui a foto Bio original.

## Cadastrar os links

Em `js/config.js`, na seção `links`, cole a URL completa dentro das aspas do campo correspondente. Mantenha as aspas e as vírgulas. Os seguintes endereços precisam ser preenchidos.

| Campo | Endereço |
| --- | --- |
| `instagram` | Seu perfil do Instagram |
| `youtube` | Seu canal no YouTube |
| `tiktok` | Seu perfil do TikTok |
| `planilha` | Página de vendas da planilha |
| `telegram` | Link da comunidade no Telegram |
| `kick` | Seu canal na Kick |
| `whatsapp` | Seu link de contato do WhatsApp |

Os botões ficam sem navegação até o cadastro de uma URL válida. Depois de salvar, abra cada botão para conferir o destino.

O indicador **AO VIVO** fica oculto por padrão. Para ativá-lo, é preciso fornecer em `kickStatusUrl` a URL HTTPS de um serviço que verifique seu canal e permita acesso pelo navegador (CORS). O serviço deve retornar JSON com `isLive` booleano e `checkedAt` no formato ISO 8601 com o horário da verificação. O site mantém o indicador visível enquanto a confirmação positiva tiver menos de 30 segundos. Qualquer credencial da Kick deve ficar no serviço, fora do site.

## Publicar gratuitamente no GitHub Pages

1. No GitHub, crie um repositório público, ou abra o repositório público que você já usa para este projeto.
2. Use **Add file > Upload files** para enviar o conteúdo da pasta. O arquivo `index.html` deve ficar na raiz do repositório, junto das pastas `css`, `js` e `assets`. Confirme em **Commit changes**.
3. Abra **Settings > Pages** no repositório.
4. Em **Source**, selecione **Deploy from a branch**.
5. Em **Branch**, selecione `main` (ou a branch dos arquivos) e `/(root)`. Clique em **Save**.
6. Após a publicação, volte a **Settings > Pages** e clique em **Visit site**.

Para atualizar a versão publicada, envie os arquivos alterados para a mesma branch. [Guia oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)


