npm run build
git add build
git commit build -m "deployment"
git subtree push --prefix build origin gh-pages
