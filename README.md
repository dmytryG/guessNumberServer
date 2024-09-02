# How to run:
1. Go to server repository and download it [LINK](https://github.com/dmytryG/guessNumberServer)
2. Navigate to server root and execute ```yarn install```
3. Rename ```.env.example``` to ```.env```
4. Provide ```BOT_TOKEN=``` in ```.env``` file
5. Execute ```yarn dev``` to run the server
6. Open the bot in telegram [BOT](https://t.me/gtenumber_bot)
7. Write anything to the bot
8. Press "PLAY" button
9. Enter API URL in the provided field (the URL will be displayed at server's logs, usually ```http://localhost:8009```)
10. Play the game

## Code for frontend part of the application can be found [here](https://github.com/dmytryG/guessNumberClient)
You do not need to deploy the client side manually, I've already deployed it to netlify.