adopt-me

SSR in package.json, scripts

 // build code for production & I'm going to serve everything from the dist foulder
    "build": "parcel build --public-url ./dist/ src/index.html",
    //babel-node is not recommended for production. We do this for the time sparing. Typically what you would do is you'd precompile your React code in such a way that NODE could read it, and then use that code so that it doesn't have any JSX
    "start": "npm run build && babel-node server/index.js",