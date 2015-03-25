# JQuery_Snake

A reproduction of the classic and timeless game of Snake.  Currently, the repo must be downloaded and then the index html file used to access the game, but a Heroku link is forthcoming.

## Controls

Use the arrow keys to move the Snake.
<br>
Pause the game using the spacebar.

## High Scores

As this project is still entirely in the repository, there is no mechanism for storing high-scores across sessions, but without refreshes, high-scores will appear and sort themselves dynamically across lives.

## The Code

This rendition of Snake is supported by a minimal Rails backend with a Javascript frontend, which is serviced by JQuery.  It has a model to keep track of all of the scores that are generated through normal play.  In order for the HUD to accurately "keep track" of the top scores, an AJAX post request is fired off to create new score on Game Over.  Similarly, an AJAX request is fired on page load to initially populate the list of scores.  Only the top 11 scores are ever displayed, functionally to decrease the length of time required for the AJAX request and aesthetically as to not overcomplicate the HUD. 

## Enjoy!
