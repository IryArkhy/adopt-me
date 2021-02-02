adopt-me

#Migrate to TS:

1) npm i -D typescript
2) start a typescript project: npx tsc --init (you might need to restart a ts server - cmd+shft+p --> restart ts server)
3) enaple jsx in the TS config
4) install types: npm install -D @types/react @types/react-dom @types/reach__router
5) uninstall stuff for tslint: npm uninstall eslint babel-eslint eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
6) configure tslint: npm install -D tslint tslint-react tslint-config-prettier
7) delete eslintrc.json
8) change lint script in package.json
9) create tslint.json
10) you have to have tslint extention
11) convert everything to tsx/ts
12) update index.html --> in script tag import App.tsx