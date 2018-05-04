# Reaction Game

The game is built using html, css and javascript. The aim of the game is to last as long as possible without being hit by any of the falling comets.

For each comet you successfully avoid, your score will increase by 1, however the overall game difficulty increases as the score increases.

At the beginning of the game, comets fall at one row per 0.28 seconds, however the further along in the game you get the closer this value will tend towards one row per 0.18 seconds. Also, the chance of a comet spawning at the top of the screen begins at 10% and tends towards 30% as the game progresses also. This was done with an infinite geometric series approaching 0.18 and 0.3 respectively, meaning that no matter how high your score the game can always be at least a little harder.

# Structure

The game is structured fairly simply, there is a 10 by 10 table with each cell of the table containing the appropriate sprite image. The cell classes are edited on a regular cycle to move the sprites around.

![game screenshot](https://github.com/Sykander/sparta-global-Comets/blob/dev/images/game-screenshot.png?raw=true)
-------------------

All code is written by myself Sykander Gul, images and sprites were sourced from copyright free sites.

Music is credited to [SonicWave1000](https://www.youtube.com/user/Sonicwave1000).
