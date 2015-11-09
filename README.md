## Quick Start

~~~sh
# getting the code
git clone git@github.com:nko5/hatch.git && cd ./hatch/

# developing
npm install
npm start

# setup your modulus account
npm install -g modulus
modulus login

# deploying to Modulus (to http://hatch.2015.nodeknockout.com/)
modulus deploy

# view the most recent logs from modulus
modulus project logs
~~~

Read more about this setup [on our blog][deploying-nko].

[deploying-nko]: http://www.nodeknockout.com/deploying

### Vote KO Widget

![Vote KO widget](http://f.cl.ly/items/1n3g0W0F0G3V0i0d0321/Screen%20Shot%202012-11-04%20at%2010.01.36%20AM.png)

Use our "Vote KO" widget to let from your app directly. Here's the code for
including it in your site:

~~~html
<iframe src="http://nodeknockout.com/iframe/hatch" frameborder=0 scrolling=no allowtransparency=true width=115 height=25>
</iframe>
~~~

## Have fun!

If you have any issues, we're on IRC in #nodeknockout on freenode, email us at
<help@nodeknockout.com>, or tweet [@nodeknockout](https://twitter.com/nodeknockout).

## Tests

Tests will be run after navigating to http://localhost:8080/tests.

## Documentation

To generate documentation just run `npm run doc` and look into `docs/index.html`.
Or open a browser and navigate to http://localhost:8080/docs/index.html :-)
