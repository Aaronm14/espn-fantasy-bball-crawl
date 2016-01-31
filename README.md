This app will crawl a given ESPN Fantasy Basketball team URL and alert if a player with a game on the current day is left on the bench.

To Use:
Run with "node app.js <URL for team>"
URL example: http://games.espn.go.com/fba/clubhouse?leagueId=xxxxxx&teamId=x&seasonId=2016

TODO:
-Separate frontend CSS/JS to separate files.. Use jQuery/angular/react.
-Add Team/League info at top of page
-If possible, include buttons on players to sub them into an empty spot.. ESPN doesn't provide an endpoint for this though.
-Text phone number/email if a player on the bench has a game that is after the current time.  Only send after a certain time, 4pm?  Use Mandrill/SendGrid for email, Twilio for SMS
-To do the above, need to include time check function that runs every ~1hr?
